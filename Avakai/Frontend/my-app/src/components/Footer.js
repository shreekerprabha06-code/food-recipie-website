import React from 'react';


function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h1 className="logo-text">ఆవకాయ.</h1>
          <p>
           Avakai is platform where you can find variety of cusienes and dishes from all the telugu culture
          </p>
        </div>
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="/">Recipies</a></li>
            <li><a href="/about">Donate</a></li>
            <li><a href="/services">Login</a></li>
            <li><a href="/contact">Register</a></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <ul>
            <li>Email: Avakai@avakai.com</li>
            <li>Phone: +91 123456789</li>
            <li>Address: 123 Street, hyderbad</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 ఆవకాయ. | Designed by Avakai team
      </div>
    </footer>
  );
}

export default Footer;