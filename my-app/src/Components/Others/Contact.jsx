import { FaEnvelope, FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";
import "./Other.css";

const Contact = () => {
  return (
    <section className="contact-section">
      <div className="container">
        <h1>Contact Us</h1>
        <p className="contact-subtitle">
          Need help managing your finances or have feedback about Extracker?
          We’d love to hear from you.
        </p>

        <div className="contact-grid">
          <div className="contact-card">
            <FaEnvelope size={32} className="contact-icon" />
            <h3>Email</h3>
            <a
              href="mailto:somenath.dev@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              extraker.official@gmail.com
            </a>
          </div>

          <div className="contact-card">
            <FaLinkedin size={32} className="contact-icon" />
            <h3>LinkedIn</h3>
            <a
              href="https://www.linkedin.com/in/extraker-profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on LinkedIn
            </a>
          </div>

          <div className="contact-card">
            <FaGithub size={32} className="contact-icon" />
            <h3>GitHub</h3>
            <a
              href="https://github.com/extraker-project"
              target="_blank"
              rel="noopener noreferrer"
            >
              View My Projects
            </a>
          </div>

          <div className="contact-card">
            <FaWhatsapp size={32} className="contact-icon" />
            <h3>WhatsApp</h3>
            <a
              href="https://wa.me/919XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <p className="contact-footer">
          We’re here to help you build smarter money habits.
        </p>
      </div>
    </section>
  );
};

export default Contact;
