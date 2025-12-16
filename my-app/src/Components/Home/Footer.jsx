import React from "react";
import '../../style/Footer.css';
import { SiFacebook } from "react-icons/si";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";


export default function Footer() {
    return (
        <React.Fragment>
            <footer>
                <div className="footer-collum-1">
                    <span>Blogs</span>
                    <span>Sequirty</span>
                    <span>Services</span>
                    <span>Features</span>
                    <span>Help/Support</span>
                </div>

                <div className="footer-collum-2">
                    <span>Facebook</span>
                    <span>Twitter</span>
                    <span>Xclub</span>
                    <span>Press</span>
                    <span>Others</span>
                </div>

                <div className="footer-collum-3">
                    <span>Terms & Condition</span>
                    <span>Privacy Policy</span>
                    <span>Data Sequrity</span>
                    <span>Auth Policy</span>
                    <span>Carrers</span>
                </div>

                 <div className="footer-collum-4">
                    <i><SiFacebook color="white" size={25} /></i>
                    <i><FaTwitter color="white" size={25} /></i>
                    <i><BsTwitterX color="white" size={25} /></i>
                    <i><FaLinkedin color="white" size={25} /></i>
                    <i><FaInstagram color="white" size={25} /></i>
                </div>
                <p className="footer-end">
                    ExTracker 	&#169; Copyright {new Date().getFullYear()} || All Right Resevered
                </p>
            </footer>
        </React.Fragment>
    );
};