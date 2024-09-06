import {FaGoogle, FaTwitter, FaYoutube, FaInstagram} from 'react-icons/fa'

import './index.css'

const ContactUs = () => (
  <div className="contact-container">
    <div className="contacts">
      <div className="social">
        <FaGoogle className="social-icon" />
        <FaTwitter className="social-icon" />
        <FaInstagram className="social-icon" />
        <FaYoutube className="social-icon" />
      </div>
      <p>Contact Us</p>
    </div>
  </div>
)

export default ContactUs
