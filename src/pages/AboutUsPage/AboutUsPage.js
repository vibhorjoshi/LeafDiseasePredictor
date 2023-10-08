import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { motion } from 'framer-motion';
import './AboutUsPage.css'
import ProfileCard from './../../Components/ProfileCard/ProfileCard';
const AboutUsPage = ({ variants, transition }) => {
    const team = [{
            name: "Vibhor Joshi",
            email: "vibhorjoshi40@gmail.com",
            role: "Web Developer/ ML Developer",
            github: "http://github.com/vibhorjoshi",
            linkedin: "/"
        }

    ]
    return ( <
        div className = "about-mega-container" >
        <
        Navbar / >
        <
        motion.div className = 'about-container'
        initial = "out"
        animate = "in"
        exit = "exit"
        variants = { variants }
        transition = { transition } >
        <
        h2 className = "profile-heading" > End to End Machine Learning project < /h2> <
        div className = "profile-cards" > {
            team.map((member, index) => {
                return ( <
                    ProfileCard data = { member }
                    key = { index }
                    index = { index }
                    />
                )

            })
        } <
        /div> < /
        motion.div > <
        /div>
    )
}

export default AboutUsPage