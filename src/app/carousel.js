import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Carousel.css';

function Carousel() {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    // Redirect to the desired page when the button is clicked
    navigate('/explore');
  };
  return (
    <div>
      <div id="carouselExampleAutoplaying" className="carousel slide mt-4" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <video className="d-block w-100" autoPlay loop muted style={{ borderRadius: '15px' }}>
              <source src="\videos\caro1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="carousel-item">
            <video className="d-block w-100" autoPlay loop muted style={{ borderRadius: '15px' }}>
              <source src="\videos\caro2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="carousel-item">
            <video className="d-block w-100" autoPlay loop muted style={{ borderRadius: '15px' }}>
              <source src="\videos\caro3.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="carousel-button-container">
        <button className="btn-donate" onClick={handleExploreClick}>
          Explore the Solar System
        </button>
      </div>
    </div>
  );
}

export default Carousel;