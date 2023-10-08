import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp, faLeaf, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import './PredictPage.css'
import { class_names, class_mappings } from './ClassNames';
import Fixes from './Fixes'
import * as tf from '@tensorflow/tfjs'

import Navbar from './../../Components/Navbar/Navbar';
import LoadingBar from './../../Components/LoadingBar/LoadingBar';
import { motion } from 'framer-motion';
import { Select } from 'react-dropdown-select'
const PredictPage = ({ variants, transition }) => {
    const [image, setImage] = useState(null)
    const [model, setModel] = useState(null)
    const [prediction, setPrediction] = useState(null)
    const [fixes, setFixes] = useState([])
    const [processing, setProcessing] = useState(false)
    const [plant, setPlant] = useState({ value: 'Apple', label: 'Apple' })

    const values = [
        { value: 'Apple', label: 'Apple' },
        { value: 'Cherry', label: 'Cherry' },
        { value: 'Corn', label: 'Corn' },
        { value: 'Grape', label: 'Grape' },
        { value: 'Peach', label: 'Peach' },
        { value: 'Pepper', label: 'Pepper' },
        { value: 'Potato', label: 'Potato' },
        { value: 'Orange', label: 'Orange' },
        { value: 'Strawberry', label: 'Strawberry' },
        { value: 'Tomato', label: 'Tomato' }
    ]
    const dropdownStyles = {
        background: "white",
        letterSpacing: "2px",
        width: "300px",
        border: "2px solid #314e2e"
    }

    useEffect(() => {
        const loadModel = async () => {
            if (!model) {
                const _model = await tf.loadLayersModel("/model/model.json")
                setModel(_model)
            }
        }
        loadModel()
    }, [model])


    const readImage = (file) => {
        return new Promise((rs, rj) => {
            const fileReader = new FileReader()
            fileReader.onload = () => rs(fileReader.result)
            fileReader.onerror = () => rj(fileReader.error)
            fileReader.readAsDataURL(file)
        })
    }

    const predict = async (e) => {
        e.preventDefault()
        if (!image || !model) return
        setProcessing(true)
        try {
            const read_image = await readImage(image)
            const imageElement = document.createElement('img')
            imageElement.src = read_image
            imageElement.onload = async () => {
                const image_tensor = tf.browser.fromPixels(imageElement).resizeNearestNeighbor([224, 224]).toFloat().expandDims()
                const normalized_tensor = tf.scalar(1.0).sub(image_tensor.div(tf.scalar(255.0)))
                let preds = await model.predict(normalized_tensor).data()
                let startingIndex = 0
                class_mappings.forEach((mapping) => {
                    if (mapping.name === plant['value']) {
                        preds = preds.slice(parseInt(mapping.startingIndex), parseInt(mapping.endingIndex) + 1)
                        startingIndex = parseInt(mapping.startingIndex)
                    }
                })
                const maxInd = await tf.argMax(preds, 0).data()
                const predictionIndex = startingIndex + maxInd[0]
                const my_prediction = class_names[predictionIndex]
                setPrediction(my_prediction)
                Fixes.forEach((fix) => {
                    if (fix.name === my_prediction) {
                        setFixes(fix.fixes)
                    }
                })
            }
        }
        catch (e) {
            console.log(e)
        }
        setProcessing(false)
    }

    return (
        <div
            className="predict-mega-container">
            <Navbar />

            {processing &&
                <div className="loading-container">
                    <LoadingBar />
                </div>}
            <motion.div className='predict-container'
                initial="out"
                animate="in"
                exit="exit"
                variants={variants}
                transition={transition}>
                <div className="file-upload-container">
                    <h2 className="file-form-heading">Upload Your Image!</h2>
                    <div className="dropdown-container">
                        Select Plant
                        <Select options={values} values={[plant]}
                            onChange={(value) => { setPlant(value[0]) }}
                            style={dropdownStyles} searchable={false} color="#314e2e" />
                    </div>
                    <form action="" className="file-form" onSubmit={(e) => { predict(e) }}>
                        <label htmlFor="fileInput">
                            <FontAwesomeIcon icon={faCloudArrowUp} />
                            <input id='fileInput' type="file" className='file-input'
                                accept="image/png, image/jpg, image/jpeg"
                                onChange={(e) => { setImage(e.target.files[0]) }}
                            />
                            <p>click here</p>
                        </label>
                        <p className='filename'>{(image) ? image.name : ""}</p>
                        <p>Upload picture of the leaf</p>
                        {image && <button type='submit' className='predict-btn'>Predict</button>}
                    </form>
                </div>
                {prediction ?
                    <div className="predictions-container">
                        <h2 className="prediction-heading">Predicted Disease : {prediction}</h2>
                        {(prediction.slice(prediction.length - 7) === "healthy") ?
                            <div className="prediction-healthy">
                                <p>According to this sample, the plant is healthy</p>
                                <div className="icons">
                                    <span><FontAwesomeIcon icon={faThumbsUp} /></span>
                                    <span><FontAwesomeIcon icon={faLeaf} /></span>
                                </div>
                            </div>
                            :
                            <div className="prediction-steps">
                                <p className='steps-heading'>Here are some fixes you can try:</p>
                                {fixes.length > 0 &&
                                    <ul className="steps-container">
                                        {
                                            fixes.map((fix) => {
                                                return (
                                                    <li className="steps-item">{fix}</li>
                                                )
                                            })
                                        }
                                    </ul>}
                            </div>
                        }
                    </div>
                    : <div className="instructions-container">
                        <h2 className="instructions-heading">Instructions</h2>
                        <div className="instructions-list">
                            <p className="instruction-item">1. PLUCK THE INFECTED LEAF FROM THE PLANT.</p>
                            <p className="instruction-item">2. PLACE IT ON A FLAT SURFACE (TABLE) AND CLICK A <strong>CLEAR</strong> PICTURE</p>
                            <div className="example">
                                <h3>Example</h3>
                                <img src="./images/example.jpg" alt="" />
                            </div>
                            <p className="instruction-item">3. SELECT THE NAME OF THE PLANT</p>
                            <p className="instruction-item">4. UPLOAD THE PICTURE</p>
                            <p className="instruction-item">5. CLICK ON "PREDICT".</p>
                        </div>
                    </div>

                }
            </motion.div>
        </div>
    )
}

export default PredictPage