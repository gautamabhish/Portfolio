// import React from 'react'
import Navbar from './ui/Navbar'
import Hero from './ui/Hero'
import ContactPage from './ui/Contact'
import About from './ui/About'
const Home = () => {
  return (
    <div className=" text-white min-h-screen overflow-x-hidden scroll-smooth"  >
        <Navbar></Navbar>
        <Hero></Hero>
        <div id="about" >
        <About>

</About>
        </div>
        <div id="contact">
        <ContactPage></ContactPage>
        </div>
       
    </div>
  )
}

export default Home