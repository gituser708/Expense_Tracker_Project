import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { useDarkMode } from '../../Theme/DarkTheme'; // custom hook
import Logo from '../../assets/logo.png';
import '../../style/Nav.css';


export default function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, setDarkMode } = useDarkMode();
  const location = useLocation();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/service" },
    { label: "Contact", href: "/contact" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={`navbar ${darkMode ? 'dark' : ''}`}>
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src={Logo} alt="logo" width={45} />
          <b>ExTracker</b>
        </Link>

        {/* Hamburger */}
        <button className="menu-toggle" onClick={toggleMenu}>
          {isOpen
            ? <GrClose size={25} color={darkMode ? '#fff' : '#333'} />
            : <GiHamburgerMenu size={25} color={darkMode ? '#fff' : '#333'} />}
        </button>

        {/* Nav Links */}
        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          {navLinks.map(link => (
            <Link
              key={link.href}
              to={link.href}
              onClick={closeMenu}
              className={location.pathname === link.href ? 'active' : ''}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Only Auth & Toggle */}
          <div className="mobile-only">

            <Link to="/register" onClick={closeMenu}
              className="register-btn">Register</Link>
            
            <Link to="/login" onClick={closeMenu}
              className="login-btn">Login</Link>
            
            <button className="dark-toggle"
              onClick={() => {
                setDarkMode(!darkMode);
                closeMenu();
              }}>
              {darkMode ? <MdLightMode size={28} /> : <MdDarkMode size={28} />}
            </button>
          </div>
        </div>

        {/* Desktop Auth & Toggle */}
        <div className="nav-actions">
          <Link  to="/register" className="register-btn">Register</Link>
          <Link  to="/login" className="login-btn">Login</Link>
          <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <MdLightMode size={28} /> : <MdDarkMode size={28} />}
          </button>
        </div>
      </div>
    </nav>
  );
};
