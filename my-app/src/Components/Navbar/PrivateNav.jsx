import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { useDarkMode } from '../../Theme/DarkTheme'; //! custom hook
import Logo from '../../assets/logo.png';
import { FaUserAlt } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { profileQuery } from '../../React_Query/userQuery/userQuery';
import '../../style/Nav.css';

export default function PrivateNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, setDarkMode } = useDarkMode();
  const location = useLocation();
  const userData = useSelector((state) => state?.auth?.user);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Add Category", href: "/add-category" },
    { label: "Add Transaction", href: "/add-transaction" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['profile'],
    queryFn: () => profileQuery(userData?.token)
  });

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
            <Link onClick={closeMenu}
              to="/profile" className="nav-profile">
                        My Profile
            </Link> 
            <span className="nav-username">&#x2714; {data?.user?.username}</span>

            <button className="dark-toggle"
              onClick={() => {
                setDarkMode(!darkMode);
                closeMenu();
              }}>
              {darkMode ? <MdLightMode size={27} /> : <MdDarkMode size={27} />}
            </button>
          </div>
        </div>

        {/* Desktop Auth & Toggle */}
              <div className="nav-actions">
                  <Link to="/profile" className="profile-pic">
            <img src={data?.user?.profilePic} />
                      </Link>
          <span className='nav-username'>&#x2714; {data?.user?.username}</span>
          
          <button className="dark-toggle"
            onClick={() => 
              setDarkMode(!darkMode)}>
            {darkMode ? <MdLightMode size={27} /> : <MdDarkMode size={27} />}
          </button>
        </div>
      </div>
    </nav>
  );
};
