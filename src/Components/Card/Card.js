import React from 'react'
import './Card.css'
const Card = ({ product, setShowOutput }) => {
    const { product_name, location, available_till, _id, image_link } = product
    // const base_url = "https://farmey-server.herokuapp.com/"
    // const base_url = "http://localhost:8080/"
    const base_url = "https://lapis-dusty-eel.glitch.me/"
    const getDate = (date) => {
        const splits = date.split('-')
        const date_string = splits[2].substring(0, 2) + '/' + splits[1] + '/' + splits[0]
        // console.log(date_string)
        return date_string
    }
    return (
        <div className='card-container'>
            <div className="image-container">
                <img src={base_url + "api/imageupload/" + image_link} alt="" loading='lazy'/>
            </div>
            <div className="details-container">
                <div className="sub-detail">
                    <h3 className="sub-heading">Product Name:</h3>
                    <span className='sub-content'>{product_name}</span>
                </div>
                <div className="sub-detail">
                    <h3 className="sub-heading">Available Till:</h3>
                    <span className='sub-content'>{getDate(available_till)}</span>
                </div>
                <div className="sub-detail">
                    <h3 className="sub-heading">Location:</h3>
                    <span className='sub-content'>{location}</span>
                </div>
                <button className='details-btn' onClick={() => { setShowOutput(_id) }}>View Details</button>
            </div>
        </div>
    )
}

export default Card