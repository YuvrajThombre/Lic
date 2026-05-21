import React, { Component } from 'react'
import HeroSection from '../Component/HeroSection'
import AboutUs from '../Component/AboutUs'
import ImageGallery from '../Component/ImageGallery'
import PlansCarousel from '../Component/PlansCarousel'
import WhyChooseMe from '../Component/WhyChooseMe'
import Testimonials from '../Component/Testimonials'
import GetInTouch from '../Component/GetInTouch'
import Footer from '../Component/Footer'
import Header from '../Component/Header'

export default class Home extends Component {
    render() {
        return (
            <>

                <HeroSection />
                <AboutUs />
                <ImageGallery />
                <PlansCarousel />
                <WhyChooseMe />
                <Testimonials />
                <GetInTouch />
                
            </>
        )
    }
}
