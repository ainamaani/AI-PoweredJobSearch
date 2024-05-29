import React from 'react';


const WelcomePage = () => 
    ( 
        <div className="welcome">
            <div id="top">
            <header>

                <div className="container">


                <div className="navbar-wrapper">

                    <button type='submit' className="navbar-menu-btn" data-navbar-toggle-btn>
                    <ion-icon name="menu-outline" />
                    </button>

                    <nav className="navbar" data-navbar style={{
                        position: "relative",
                        bottom: "10px"
                    }}>

                    <ul className="navbar-list">

                        <li className="nav-item">
                            <a href="#home" className="nav-link" style={{
                                fontSize: "20px",
                                color: "#ff4d4d",
                                textDecoration: "none", // Optionally remove underline on hover
                                transition: "color 0.3s ease", // Smooth transition for color change
                                ":hover": { // Apply styles on hover
                                    color: "#ff0000" // Change color on hover
                                }
                            }}>Home</a>
                        </li>

                        <li className="nav-item">
                            <a href="#about" className="nav-link" style={{
                                fontSize: "20px",
                                color: "#ff4d4d",
                                textDecoration: "none", // Optionally remove underline on hover
                                transition: "color 0.3s ease", // Smooth transition for color change
                                ":hover": { // Apply styles on hover
                                    color: "#ff0000" // Change color on hover
                                }
                            }}>What we do</a>
                        </li>

                        

                        <li className="nav-item">
                            <a href="#" className="nav-link" style={{
                                fontSize: "20px",
                                color: "#ff4d4d",
                                textDecoration: "none", // Optionally remove underline on hover
                                transition: "color 0.3s ease", // Smooth transition for color change
                                ":hover": { // Apply styles on hover
                                    color: "#ff0000" // Change color on hover
                                }
                            }}>Our work</a>
                        </li>

                        <li className="nav-item">
                            <a href="#contact" className="nav-link" style={{
                                fontSize: "20px",
                                color: "#ff4d4d",
                                textDecoration: "none", // Optionally remove underline on hover
                                transition: "color 0.3s ease", // Smooth transition for color change
                                ":hover": { // Apply styles on hover
                                    color: "#ff0000" // Change color on hover
                                }
                            }}>Contact</a>
                        </li>

                        <li className="nav-item">
                            <a href="#contact" className="nav-link" style={{
                                fontSize: "20px",
                                color: "#ff4d4d",
                                textDecoration: "none", // Optionally remove underline on hover
                                transition: "color 0.3s ease", // Smooth transition for color change
                                ":hover": { // Apply styles on hover
                                    color: "#ff0000" // Change color on hover
                                },
                                background: "#ffcccc",
                                padding: "6px",
                                borderRadius: "8px"
                            }}>Login</a>
                        </li>

                        <li className="nav-item">
                            <a href="#contact" className="nav-link" style={{
                                fontSize: "20px",
                                color: "#ff4d4d",
                                textDecoration: "none", // Optionally remove underline on hover
                                transition: "color 0.3s ease", // Smooth transition for color change
                                ":hover": { // Apply styles on hover
                                    color: "#ff0000" // Change color on hover
                                },
                                background: "#ffcccc",
                                padding: "6px",
                                borderRadius: "8px"
                            }}>Sign up</a>
                        </li>

                    </ul>


                    </nav>

                </div>

                </div>

            </header>

            <main>
            <article>
                <section className="hero" id="home">
                <div className="container">

                    <div className="hero-content">

                    <h1 className="h1 hero-title" style={{
                        position: "relative",
                        bottom: "220px"
                    }}>WELCOME TO CAREER CONNECT </h1>

                    <p className="hero-text" style={{
                        position: "relative",
                        bottom: "220px"
                    }}>
                        A place where you are going to land your dream job.
                    </p>

                    {/* <button type='submit' className="btn btn-primary">LOGIN</button> */}

                    </div>

                    <div className="hero-banner" />

                </div>


                <img src={`${process.env.PUBLIC_URL}/assets/images/landing/bg.png`} alt="shape" className="shape-content" />

                
                    
                </section>

                <section className="about" id="about" style={{
                    position: "relative",
                    bottom: "330px"
                    
                }}>
                <div className="container">

                    <div className="about-top">

                    <h2 className="h2 section-title">What we do</h2>

                    <ul className="about-list">

                        <li>
                        <div className="about-card">

                            <div className="card-icon">
                            <ion-icon name="briefcase-outline" />
                            </div>

                            <h3 className="h3 card-title">Schedule Apointments</h3>

                            
                        </div>
                        </li>

                        <li>
                        <div className="about-card">

                            <div className="card-icon">
                            <ion-icon name="chatbubbles-outline" />
                            </div>

                            <h3 className="h3 card-title">Interviews and Job Search</h3>

                            

                        </div>
                        </li>

                        <li>
                        <div className="about-card">

                            <div className="card-icon">
                            <ion-icon name="rocket-outline" />
                            </div>

                            <h3 className="h3 card-title">Post Jobs With Recommendations</h3>

                            

                        </div>
                        </li>

                    </ul>

                    </div>

                    <div className="about-bottom">

                    <figure className="about-bottom-banner">
                        <img src={`${process.env.PUBLIC_URL}/assets/images/landing/about-banner.png`} alt="about banner" className="about-banner" />

                    </figure>

                    <div className="about-bottom-content">

                        <h2 className="h2 section-title">Potential</h2>

                        <p className="section-text">
                        The Ai Powered Driven  Webapp Has The Ability To help You Find What You Want Today ,In Just Few Mins By Just Clicking The Button Below
                        </p>

                        {/* <button type='submit' className="btn btn-secondary">Sign Up For Free</button> */}

                    </div>

                    </div>

                </div>
                </section>

                <section className="contact" id="contact">
        <div className="container">

          <div className="contact-content">
            <h2 className="h2 contact-title">Lets Help you Today</h2>

            <figure className="contact-banner">
              <img src={`${process.env.PUBLIC_URL}/assets/images/landing/contact.png`} alt="contact banner" />
            </figure>
          </div>

          {/* <form action="" className="contact-form">

            <div className="input-wrapper">
              <label for="name" className="input-label">Name *</label>

              <input type="text" name="name" id="name" required placeholder="Type Name" className="input-field" />
            </div>

            <div className="input-wrapper">
              <label for="phone" className="input-label">Phone</label>

              <input type="tel" name="phone" id="phone" placeholder="Type Phone Number" className="input-field" />
            </div>

            <div className="input-wrapper">
              <label for="email" className="input-label">Email Address *</label>

              <input type="email" name="email" id="email" required placeholder="Type Email Address" className="input-field" />
            </div>

            <div className="input-wrapper">
              <label for="message" className="input-label">How can we help? *</label>

              <textarea name="message" id="message" placeholder="Type Description" required
                className="input-field"></textarea>
            </div>

            <button type="submit" className="btn btn-primary">Send Message</button>

          </form> */}

        </div>
      </section>

    </article>

            </main>

        </div>
        </div>
     );

 
export default WelcomePage;