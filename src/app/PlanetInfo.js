import React from 'react';
import './PlanetInfo.css';
import planetsData from './data/planets.json';
import Itinerary from './Itinerary';  // Import the Itinerary component
import { useParams } from 'react-router-dom';

function PlanetInfo() {
  const { planetName } = useParams();
  const planet = planetsData[planetName];

  if (!planet) return <p>Planet not found!</p>;
  

  return (
    <div className="planet-info-container white-text">
      <h1 className="planet-title">{planet.title}</h1>
      <div className="planet-image-container">
        <iframe 
          src={planet.image}
          title="NASA Solar System Visualization" 
          width="100%" 
          height="300" 
          frameBorder="0" 
          allowFullScreen
        ></iframe>
      </div>
      <p className="planet-desc">{planet.desc}</p>

      {planet.distance && (
        <div className="planet-distance">
          <span>Distance: </span>
          {planet.distance.value} {planet.distance.unit}
        </div>
      )}

      <div className="planet-tips">
        <h2>Travel Tips:</h2>
        <p>{planet.tips}</p>
      </div>

      {planet.travel_methods && (
        <div className="travel-methods">
          <h2>Available Travel Methods:</h2>
          <ul>
            {Object.values(planet.travel_methods).map((method, index) => (
              <li key={index}>{method}</li>
            ))}
          </ul>
        </div>
      )}

      {planet.points_of_interest && (
        <div className="points-of-interest">
          <h2>Points of Interest:</h2>
          <ul>
            {planet.points_of_interest.map((poi, index) => (
              <li key={index} className="poi-item">
                <img src={poi.image} alt={poi.name} className="poi-image" />
                <div>
                  <h3>{poi.name}</h3>
                  <p>{poi.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Itinerary planet={planet} />  {/* Use the Itinerary component and pass the planet data */}
    </div>
  );
}

export default PlanetInfo;
