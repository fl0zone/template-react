import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import planetsData from './data/planets.json';
import './Navbar.css';

function CoolNavbar({ onSelectPlanet }) {
  const [rocketVisible, setRocketVisible] = useState(false);
  const [rocketPosition, setRocketPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    setRocketVisible(true);
  };

  const handleMouseLeave = () => {
    setRocketVisible(false);
  };

  const handleNavbarMouseMove = (e) => {
    if (rocketVisible) {
      const navbarRect = document.querySelector('.navbar').getBoundingClientRect();
      const x = Math.min(Math.max(e.clientX - navbarRect.left, 0), navbarRect.width);
      const y = Math.min(Math.max(e.clientY - navbarRect.top, 0), navbarRect.height);
      setRocketPosition({ x, y });
    }
  };

  // Event handlers for logo and buttons
  const handleLogoMouseEnter = () => {
    setRocketVisible(false);
  };

  const handleButtonMouseEnter = () => {
    setRocketVisible(false);
  };

  const handleLogoMouseLeave = () => {
    setRocketVisible(true);
  };

  const handleButtonMouseLeave = () => {
    setRocketVisible(true);
  };

  // Event handlers for dropdown
  const handleDropdownMouseEnter = () => {
    setRocketVisible(false);
  };

  const handleDropdownMouseLeave = () => {
    setRocketVisible(true);
  };

  return (
    <Navbar
      expand="lg"
      variant="dark"
      style={{
        height: '80px',
        position: 'relative',
        cursor: rocketVisible ? 'none' : 'auto',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleNavbarMouseMove}
    >
      <Container fluid>
        <Navbar.Brand
          as={Link}
          to="/"
          className="logo"
          onMouseEnter={handleLogoMouseEnter}
          onMouseLeave={handleLogoMouseLeave}
        >
          <Image src='/planets/logo.png' alt="Logo" style={{ height: '130px', width: '130px' }} />
        </Navbar.Brand>

        {/* Right-aligned links */}
        <Nav className="ms-auto" style={{ maxHeight: '100px' }} navbarScroll>
          <Nav.Link
            as={Link}
            to="/"
            className="white-text"
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
          >
            Home
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/booking"
            className="white-text"
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
          >
            Book
          </Nav.Link>
          <NavDropdown
            title="Planets"
            id="navbarScrollingDropdown"
            className='white-text'
            onMouseEnter={handleDropdownMouseEnter}
            onMouseLeave={handleDropdownMouseLeave}
          >
            {Object.keys(planetsData).map((planetKey) => (
              <NavDropdown.Item key={planetKey} as={Link} to={`/planet-info/${planetKey}`}>
                {planetsData[planetKey].title}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
          <Nav.Link
            as={Link}
            to="/about"
            className="white-text"
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
          >
            About
          </Nav.Link>

          {/* Centered "Team" link */}
          <button
            className="btn1"
            type="button1"
            style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
          >
            <strong>EXPLORE'N'CO</strong>
            <div id="container-stars">
              <div id="stars"></div>
            </div>

            <div id="glow">
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
          </button>

          <Nav.Link
            as={Link}
            to="/login"
            className="white-text"
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
          >
            Login
          </Nav.Link>
        </Nav>
      </Container>

      {rocketVisible && (
        <Image
          src="https://cdn.pixabay.com/animation/2022/07/31/06/27/06-27-17-124_512.gif"
          alt="Rocket"
          style={{
            position: 'absolute',
            width: '30px',
            height: 'auto',
            left: `${rocketPosition.x}px`,
            top: `${rocketPosition.y}px`,
            zIndex: -1,
          }}
          onMouseMove={handleRocketMouseMove}
        />
      )}
    </Navbar>
  );
}

export default CoolNavbar;
