import React, { useEffect, useState } from 'react'
import './CargoShowModal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import LoadingBar from '../LoadingBar/LoadingBar';
const CargoShowModal = ({ setShow, id }) => {
  const [cargoData, setCargoData] = useState(null)
  const [loading, setLoading] = useState(false)
  // const base_url = "https://farmey-server.herokuapp.com/"
  // const base_url = "http://localhost:8080/"
  const base_url = "https://lapis-dusty-eel.glitch.me/"


  useEffect(() => {
    const getCargo = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get(base_url + `api/cargo/fetch/${id}`)
        setCargoData(data)
        console.log(data)
      }
      catch (e) {
        console.log(e)
      }
      setLoading(false)
    }
    getCargo()
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
      {cargoData && <div className='cargo-show-modal-container'>
        <div className="close-button" onClick={() => { setShow(null) }}><FontAwesomeIcon icon={faX} /></div>
        <div className="product-show-input-container">
          <div className="cargo-details">
            <div className="producer-name input-area">
              <h3>Transporter Name</h3>
              <p>{cargoData.transporter_name}</p>
            </div>
            <div className="producer-number input-area">
              <h3 htmlFor="producer-number">Phone number</h3>
              <p>{cargoData.phone_number}</p>
            </div>

            <div className="product-show-name input-area">
              <h3 htmlFor="product-show-name">Available Space</h3>
              <p>{cargoData.available_space}</p>
            </div>

            <div className="product-show-location input-area">
              <h3 htmlFor="product-show-location">From</h3>
              <p>{cargoData.from}</p>
            </div>
            <div className="product-show-location input-area">
              <h3 htmlFor="product-show-location">To</h3>
              <p>{cargoData.to}</p>
            </div>
            <div className="product-show-date input-area">
              <h3 htmlFor="date-picker">Contact Before</h3>
              <p>{getDate(cargoData.expiry_date)}</p>
            </div>
          </div>
        </div>
        <div className="bottom-bar"></div>
      </div>}
    </>
  )
}

export default CargoShowModal