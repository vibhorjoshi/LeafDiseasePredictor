import React, { useEffect, useState } from 'react'
import './MarketPage.css'
import Navbar from './../../Components/Navbar/Navbar';
import Card from './../../Components/Card/Card';
import ProductInputModal from './../../Components/ProductInputModal/ProductInputModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import axios from 'axios';
import ProductShowModal from './../../Components/ProductShowModal/ProductShowModal';
const MarketPage = ({ variants, transition }) => {
    // const options = [
    //     { value: 'manure', label: 'manure' },
    //     { value: 'crops', label: 'crops' }
    // ]
    // const dropdownStyles = {
    //     background: "white",
    //     letterSpacing: "2px",
    //     width: "400px",
    //     border: "2px solid #314e2e"
    // }
    const [showInput, setShowInput] = useState(false)
    const [showOutput, setShowOutput] = useState(null)
    const [products, setProducts] = useState([])
    // const base_url = "https://farmey-server.herokuapp.com/"
    // const base_url = "http://localhost:8080/"
    const base_url = "https://lapis-dusty-eel.glitch.me/"

    useEffect(() => {
        const getProducts = async () => {
            try {
                const { data } = await axios.get(base_url + 'api/product/fetch')
                setProducts(data)
            }
            catch (e) {
                console.log(e)
            }
        }
        getProducts()
    }, [])

    return (
        <>
            {showOutput && <ProductShowModal id={showOutput} setShow={setShowOutput} />}
            <div className="productInputToggle" onClick={() => { setShowInput(!showInput) }}>
                {showInput ? <FontAwesomeIcon icon={faXmarkCircle} /> : <FontAwesomeIcon icon={faPlusCircle} />}
            </div>
            <div className='market-mega-container'>
                <Navbar />
                {showInput && <ProductInputModal setShow={setShowInput} setProducts={setProducts} products={products} />}
                <motion.div className="market-container"
                    initial="out"
                    animate="in"
                    exit="exit"
                    variants={variants}
                    transition={transition}>
                    <h2 className='market-heading'>Manure Market</h2>

                    <div className="cards-container">
                        {
                            products.map((product, index) => {
                                return (<Card product={product} key={product._id} setShowOutput={setShowOutput} />)
                            })
                        }
                    </div>
                </motion.div>
            </div>
        </>
    )
}

export default MarketPage