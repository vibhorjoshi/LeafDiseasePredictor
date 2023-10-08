import React from 'react'
import './LoadingBar.css'
const LoadingBar = () => {
    return (
            <div className='loading-bar-container'>
                <div className="loader">
                    <svg viewBox="0 0 80 80">
                        <circle id="test" cx="40" cy="40" r="32"></circle>
                    </svg>
                </div>
                <h3 className="loader-text">PLEASE WAIT..</h3>
            </div>
    )
}

export default LoadingBar