import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import Footer from './Footer';
{/* <div>
<h1>hello </h1>
<br/>
<h2>welcome to the home page</h2>
</div>

 */}



 const HomePage = () => {
    return(
        <>
        <Navbar/>
        {/* <div>
            <h2>welcome to the home page</h2>
        </div> */}
        <HeroSection/>
        <Footer/>
        </>
    )
 }

 export default HomePage;
