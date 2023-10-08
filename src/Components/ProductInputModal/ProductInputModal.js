import React, { useState } from 'react'
import './ProductInputModal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-date-picker'
import { faCloudArrowUp, faPhone, faX } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import LoadingBar from './../LoadingBar/LoadingBar';
const ProductInputModal = ({ setShow, setProducts, products }) => {
  const [imageFile, setImageFile] = useState(null)
  const [image, setImage] = useState(null)
  const [date, setDate] = useState(new Date())
  const [loading, setLoading] = useState(false)

  // const base_url = "https://farmey-server.herokuapp.com/"
  // const base_url = "http://localhost:8080/"
  const base_url = "https://lapis-dusty-eel.glitch.me/"


  const readImage = (file) => {
    return new Promise((rs, rj) => {
      const fileReader = new FileReader()
      fileReader.onload = () => rs(fileReader.result)
      fileReader.onerror = () => rj(fileReader.error)
      fileReader.readAsDataURL(file)
    })
  }


  const uploadImage = async () => {
    if (!imageFile) return
    try {
      const fd = new FormData()
      fd.append('image', imageFile, imageFile.name)
      const { data } = await axios.post(base_url + 'api/imageupload/upload', fd)
      return data
    } catch (e) {
      return null
    }
  }


  const processImage = async (img) => {
    if (!img) return
    setImageFile(img)
    const read_image = await readImage(img)
    setImage(read_image)
  }

  const uploadForm = async (e) => {
    // console.log(e)
    setLoading(true)
    const fields = ["producer_name", "phone_number", "product_name", "location", "available_till"]
    const dataToSend = {}
    fields.forEach((field, index) => {
      dataToSend[field] = e.target[index].value
    })
    try {
      const imageCode = await uploadImage()
      dataToSend["image_link"] = imageCode
    }
    catch (e) {
      console.log(e)
      setLoading(false)

    }
    setLoading(false)
    const { data } = await axios.post(base_url + "api/product/upload", dataToSend)
    setProducts([...products, data])
    setShow(false)
  }

  return (
    <div className='product-modal-container'>
      {loading && <div className="loading-container">
        <LoadingBar />
      </div>}
      <div className="close-button" onClick={() => { setShow(false) }}><FontAwesomeIcon icon={faX} /></div>
      <div className="product-image-input">
        <div className="product-image-container">
          {image ? <img src={image} alt="" /> :
            <div className='input-image-box'>
              <FontAwesomeIcon icon={faCloudArrowUp} style={{fontSize:40}}/>
              <p>Please Upload Image</p>
            </div>}
        </div>
        <label htmlFor="imageInput">
          <div className='image-upload-button'>Upload</div>
          <input id='imageInput' type="file" className='image-input'
            accept="image/png, image/jpg, image/jpeg"
            onChange={(e) => { processImage(e.target.files[0]) }}
          />
        </label>
      </div>
      <div className="product-input-container">
        <form action="" className="input-form" onSubmit={(e) => {
          e.preventDefault()
          uploadForm(e)
        }}>
          <div className="producer-name input-area">
            <label htmlFor="producer-name">Your Name</label>
            <input type="text" placeholder='your name..' id='producer-name' required />
          </div>
          <div className="producer-number input-area">
            <label htmlFor="producer-number">Phone number</label>
            <input type="number" placeholder='phone number..' id='producer-number' maxLength={10} required
              onInput={(e) => {
                if (e.target.value.length > 10) {
                  e.target.value = e.target.value.slice(0, 10)
                }
              }} />
          </div>

          <div className="product-name input-area">
            <label htmlFor="product-name">Product Name</label>
            <input type="text" placeholder='product name..' id='product-name' required />
          </div>

          <div className="product-location input-area">
            <label htmlFor="product-location">Location</label>
            <input type="text" placeholder='new delhi..' id='product-location' required />
          </div>

          <div className="product-date input-area">
            <label htmlFor="date-picker">Available Till</label>
            <div className="date-picker-container" id='date-picker' style={{ color: "white" }}>
              <DatePicker onChange={setDate} value={date} minDate={new Date()} />
            </div>
          </div>

          <button className='form-btn' type='submit'>Submit</button>
        </form>

      </div>
      <div className="bottom-bar"></div>
    </div>
  )
}

export default ProductInputModal