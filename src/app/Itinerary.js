import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import planetsData from './data/planets.json';
import './Itinerary.css';

function Itinerary() {
    const { planetName } = useParams();
    const planet = planetsData[planetName];

    const [selectedPOIs, setSelectedPOIs] = useState([]);

    const handlePOISelection = (poi) => {
        if (selectedPOIs.some(selectedPOI => selectedPOI.name === poi.name)) {
            setSelectedPOIs(prev => prev.filter(p => p.name !== poi.name));
        } else {
            setSelectedPOIs(prev => [...prev, poi]);
        }
    };

    const downloadBucketListDoc = () => {
        let htmlContent = "<h1>Bucket List for " + planet.title + "</h1>";
        selectedPOIs.forEach(poi => {
            htmlContent += `<p>${poi.name} Visited: [ ]</p>`;
        });
    
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = planet.title + '_bucket_list.html';
        
        document.body.appendChild(link);
        link.click();

        setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        }, 100);
    };

    if (!planet) return <p>Select a planet to plan your itinerary.</p>;

    return (
        <div>
            <h3>Plan Your Itinerary for {planet.title}</h3>

            <h4 className="white-text">Select Places to Visit:</h4>
            {planet.points_of_interest && (
                <ul>
                    {planet.points_of_interest.map((poi) => (
                        <li key={poi.name}>
                            <button onClick={() => handlePOISelection(poi)}>
                                {selectedPOIs.some(p => p.name === poi.name) ? `Remove ${poi.name}` : poi.name}
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <h4 className="white-text">My Bucket list:</h4>
            <ul>
                {selectedPOIs.map((poi) => (
                    <li key={poi.name}>
                        <h5>{poi.name}</h5>
                        <p>{poi.desc}</p>
                    </li>
                ))}
            </ul>

            {selectedPOIs.length > 0 && (
                <button onClick={downloadBucketListDoc}>
                    Download Bucket List
                </button>
            )}
        </div>
    );
}

export default Itinerary;
