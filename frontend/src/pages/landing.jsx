import { AnnouncementRounded, ArrowForward, AttachMoneyRounded, ContactSupportRounded, DirectionsCarRounded, MedicalServicesRounded, MicrowaveSharp, PaletteRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import React,{useState} from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const LandingPage = () => {

    const [landing, setLanding] = useState('')
    
    return ( 
            <div className="container" >
                <div className="nav">
                    <div className="left">
                        <div className="name">
                            <span><strong>Career</strong></span>
                            <span>Connect</span>
                        </div>
                        <div className="links">
                            <ul>
                                <li><a href="#">Home</a></li>
                                <li><a href="#">Blog</a></li>
                                <li><a href="#">Explore</a></li>
                                <li><a href="#">About</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="right">
                        <ul>
                            <li><a href="/login">Login</a></li>
                            <li><a className='register-link' href="/register">Register</a></li>
                        </ul>
                    </div>
                </div>
                <div className="landing-body">
                    <div>
                        <h2 className='welcome'>Millions of Jobs are waiting for you here at <span className='wel-title'>CareerConnect!</span></h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores 
                            reiciendis mollitia at ex, odit et a corrupti iure repellendus illum 
                            corporis eum. Ut doloremque dolorum quos! Fugiat architecto amet 
                            voluptas, laboriosam eligendi praesentium unde expedita reprehenderit 
                            obcaecati, deleniti esse suscipit voluptatem excepturi accusantium 
                            iste? Placeat rerum ipsa nobis eum provident?</p>
                        <Button 
                        size='large' variant='contained' className='get-started' endIcon={<ArrowForward/>}>
                            Get started
                        </Button>
                    </div>
                    <div className="body-image">
                        <img src={`${process.env.PUBLIC_URL}/assets/images/landing/manwithphone.png`} alt="Body" />
                    </div>
                </div>
                <div className="popular-section">
                    <h3 className='popular-head'>Popular categories</h3>
                    <div className="popular">
                        <div className="category">
                            <div className="icon"><AnnouncementRounded /></div>
                            <h4>Marketing</h4>
                            <p>109 positions</p>
                        </div>
                        <div className="category">
                            <div className="icon"><PaletteRounded /></div>
                            <h4>Design</h4>
                            <p>109 positions</p>
                        </div>
                        <div className="category">
                            <div className="icon"><ContactSupportRounded /></div>
                            <h4>Customer care</h4>
                            <p>109 positions</p>
                        </div>
                        <div className="category">
                            <div className="icon"><AttachMoneyRounded /></div>
                            <h4>Finance/Accounting</h4>
                            <p>109 positions</p>
                        </div>
                        <div className="category">
                            <div className="icon"><MedicalServicesRounded /></div>
                            <h4>Health and care</h4>
                            <p>109 positions</p>
                        </div>
                        <div className="category">
                            <div className="icon"><DirectionsCarRounded /></div>
                            <h4>Automative jobs</h4>
                            <p>109 positions</p>
                        </div>
                        </div>
                </div>
                <div className="footer">
                    <h3>How it works</h3>
                    <p>Explore the following steps to help you find a job easily</p>
                    <div className="guidelines">
                        <div className="card">
                            <div className='number'>
                                <h1>01</h1>
                            </div>
                            <div>
                                <h3 className='guide-title'>Register account</h3>
                                <span>First, you need to make an account</span>
                            </div>
                        </div>
                        <div className="card">
                            <div className='number'>
                                <h1>02</h1>
                            </div>
                            <div>
                                <h3>Find job</h3>
                                <span>Second, search for the job you want</span>
                            </div>
                        </div>
                        <div className="card">
                            <div className='number'>
                                <h1>03</h1>
                            </div>
                            <div>
                                <h3>Apply for job</h3>
                                <span>Third, apply to the company and wait</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

     );
}
 
export default LandingPage;