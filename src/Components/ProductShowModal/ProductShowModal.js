import React, { useEffect, useState } from 'react'
import './ProductShowModal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import LoadingBar from '../LoadingBar/LoadingBar';
const ProductShowModal = ({ setShow, id }) => {
  const [productData, setProductData] = useState(null)
  const [loading, setLoading] = useState(false)
  // const base_url = "https://farmey-server.herokuapp.com/"
  // const base_url = "http://localhost:8080/"
  const base_url = "https://lapis-dusty-eel.glitch.me/"

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get(base_url + `api/product/fetch/${id}`)
        setProductData(data)
        console.log(data)
      }
      catch (e) {
        console.log(e)
      }
      setLoading(false)
    }
    getProduct()
  }, [id])


  const getDate = (date) => {
    const splits = date.split('-')
    const date_string = splits[2].substring(0, 2) + '/' + splits[1] + '/' + splits[0]
    // console.log(date_string)
    return date_string
  }
  return (
    <>
      {loading && <div className="loading-container">
        <LoadingBar />
      </div>}
      {productData && <div className='product-show-modal-container'>
        <div className="close-button" onClick={() => { setShow(null) }}><FontAwesomeIcon icon={faX} /></div>
        <div className="product-show-image-input">
          <div className="product-show-image-container">
            <img src={base_url + `api/imageupload/${productData.image_link}`} alt="" />
          </div>
        </div>
        <div className="product-show-input-container">
          <div className="product-details">
            <div className="producer-name input-area">
              <h3 htmlFor="producer-name">Seller Name</h3>
              <p>{productData.producer_name}</p>
            </div>
            <div className="producer-number input-area">
              <h3 htmlFor="producer-number">Phone number</h3>
              <p>{productData.phone_number}</p>
            </div>

            <div className="product-show-name input-area">
              <h3 htmlFor="product-show-name">Product Name</h3>
              <p>{productData.product_name}</p>
            </div>

            <div className="product-show-location input-area">
              <h3 htmlFor="product-show-location">Location</h3>
              <p>{productData.location}</p>
            </div>

            <div className="product-show-date input-area">
              <h3 htmlFor="date-picker">Available Till</h3>
              <p>{getDate(productData.available_till)}</p>
            </div>
          </div>
        </div>
        <div className="bottom-bar"></div>
      </div>}
    </>
  )
}

export default ProductShowModal