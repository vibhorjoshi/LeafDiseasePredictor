import React from 'react'
import './CargoCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons'
const CargoCard = ({ cargo, setShowOutput }) => {
    const { available_space, from, to, expiry_date, _id } = cargo
    // const base_url = "https://farmey-server.herokuapp.com/"
    // const base_url = "http://localhost:8080/"
    const base_url = "https://lapis-dusty-eel.glitch.me/"
    const maps = ['route1.png', 'route.png', 'route2.png']
    const mapIndex = parseInt(Math.random() * maps.length)
    console.log(mapIndex)
    const getDate = (date) => {
        const splits = date.split('-')
        const date_string = splits[2].substring(0, 2) + '/' + splits[1] + '/' + splits[0]
        // console.log(date_string)
        return date_string
    }
    return (
        <div className='cargo-card-container'>
            <div className="map-container">
                {
                    <img src={`./images/${maps[mapIndex]}`} alt="" />
                }
            </div>
            <div className="details-container">
                <div className="sub-detail">
                    <h3 className="sub-heading">Available Space:</h3>
                    <span className='sub-content'>{available_space}</span>
                </div>
                <div className="sub-detail">
                    <h3 className="sub-heading">Available Till:</h3>
                    <span className='sub-content'>{getDate(expiry_date)}</span>
                </div>
                <div className="sub-detail">
                    <h3 className="sub-heading">From:</h3>
                    <span className='sub-content'>{from}</span>
                </div>
                <div className="sub-detail">
                    <h3 className="sub-heading">To:</h3>
                    <span className='sub-content'>{to}</span>
                </div>
                <button className='details-btn' onClick={() => { setShowOutput(_id) }}>View Details</button>
            </div>
        </div>
    )
}

export default CargoCard