import React, { useState } from 'react'
import './CargoInputModal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-date-picker'
import { faX } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import LoadingBar from '../LoadingBar/LoadingBar';
const CargoInputModal = ({ setShow, setCargos, cargos }) => {
  const [date, setDate] = useState(new Date())
  const [loading, setLoading] = useState(false)
  // const base_url = "https://farmey-server.herokuapp.com/"
  // const base_url = "http://localhost:8080/"
  const base_url = "https://lapis-dusty-eel.glitch.me/"
  const uploadForm = async (e) => {
    // console.log(e)
    setLoading(true)
    const fields = ["transporter_name", "phone_number", "available_space", "from", 'to', "expiry_date"]
    const dataToSend = {}
    fields.forEach((field, index) => {
      dataToSend[field] = e.target[index].value
    })
    setLoading(false)
    const { data } = await axios.post(base_url + "api/cargo/upload", dataToSend)
    setCargos([...cargos, data])
    setShow(false)
  }

  return (
    <div className='cargo-modal-container'>
      {loading && <div className="loading-container">
        <LoadingBar />
      </div>}
      <div className="close-button" onClick={() => { setShow(false) }}><FontAwesomeIcon icon={faX} /></div>
      <div className="cargo-input-container">
        <form action="" className="input-form" onSubmit={(e) => {
          e.preventDefault()
          uploadForm(e)
        }}>

          <div className="transporter-name input-area">
            <label htmlFor="transporter-name">Your Name </label>
            <input type="text" placeholder='your name..' id='transporter-name' required />
          </div>
          <div className="transporter-number input-area">
            <label htmlFor="transporter-number">Phone number</label>
            <input type="number" placeholder='phone number..' id='transporter-number' maxLength={10} required
              onInput={(e) => {
                if (e.target.value.length > 10) {
                  e.target.value = e.target.value.slice(0, 10)
                }
              }} />
          </div>

          <div className="available-space input-area">
            <label htmlFor="available-space">Available Space</label>
            <input type="text" placeholder='product name..' id='available-space' required />
          </div>

          <div className="product-from-location input-area">
            <label htmlFor="product-from-location">Transporting From</label>
            <input type="text" placeholder='new delhi..' id='product-from-location' required />
          </div>
          <div className="product-to-location input-area">
            <label htmlFor="product-to-location">Transporting To</label>
            <input type="text" placeholder='jaipur..' id='product-to-location' required />
          </div>
          <div className="cargo-date">
            <label htmlFor="cargo-date-picker">Available Till</label>
            <DatePicker onChange={setDate} value={date} minDate={new Date()} format={"dd-MM-yyyy"} />
          </div>

          <button className='form-btn' type='submit'>Submit</button>
        </form>

      </div>
      <div className="bottom-bar"></div>
    </div>
  )
}

export default CargoInputModal