import React, { useState } from "react";
import planetsData from "./data/planets.json";
import "./SpaceTourismBooking.css";

function SpaceTourismBooking() {
  const [bookingType, setBookingType] = useState("Round Trip");
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [travelby, setTravelby] = useState("");


  const generateTicket = () => {
    const ticketData = `
      <h1>Booking Confirmed</h1> 
      <p>${bookingType} booking from: ${fromCity} to ${toCity} has been confirmed.</p>
      <p>Travel by: ${travelby}<p>
      <p>Departure Date: ${departureDate}<p>
      ${bookingType === 'Round Trip' ? `<p>Return Date: ${returnDate}<p>` : ''}
    `;

    const blob = new Blob([ticketData], { type: 'text/plain;charset=utf-8' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = 'ticket.html';
    
    // Append the link to the DOM
    document.body.appendChild(link);

    // Trigger a click event on the link
    link.click();

    // Delay the removal of the link for browser compatibility
    setTimeout(() => {
        document.body.removeChild(link);
        // Release the blob URL
        URL.revokeObjectURL(href);
    }, 100);
};


  const handleSearchClick = () => {
    if (fromCity && toCity && departureDate) {
      generateTicket();  // Call the generateTicket function when conditions are met
      alert('ticket booked and downloaded to your device !');
    } else {
      alert('Please complete the form before ticket booking.');
    }
  };

  return (
    <div className="box-1">
      <h2 className="white-text">Book the rocket to explorer</h2>
    <div className="box">
      
      <div className="type-oneway-round-trip">
        <label>
          <input className="white-text"
            type="radio"
            value="One Way"
            checked={bookingType === "One Way"}
            onChange={() => setBookingType("One Way")}
          />
          <p className="white-text">One Way</p>
        </label>
        <label>
          <input
            type="radio"
            value="Round Trip"
            checked={bookingType === "Round Trip"}
            onChange={() => setBookingType("Round Trip")}
          /><p className="white-text">Round Trip</p>
          
        </label>
      </div>
      <label>
        <select value={fromCity} onChange={(e) => setFromCity(e.target.value)}>
          <option value="">From</option>
          {Object.entries(planetsData).map(([key, planet]) => (
            <option key={key} value={key}>
              {planet.title}
            </option>
          ))}
        </select>
      </label>
      <br />

      <label>
        
        <select value={toCity} onChange={(e) => setToCity(e.target.value)}>
          <option value="">Journey to</option>
          {Object.entries(planetsData)
            .filter(([key]) => key !== fromCity)
            .map(([key, planet]) => (
              <option key={key} value={key}>
                {planet.title}
              </option>
            ))}
        </select>
      </label>
      <br />

      <label>
        <select value={travelby} onChange={(e) => setTravelby(e.target.value)}>
          <option value="">select the rocket</option>
          {fromCity &&
            Object.values(planetsData[fromCity].travel_methods).map(
              (method, index) => (
                <option key={index} value={method}>
                  {method}
                </option>
              )
            )}
        </select>
      </label>
      <br />
      <label>
      <p className="white-text">Departure date:</p>
        <input
          type="date"
          className="date-picker"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
        />
      </label>
      <br />
      
      {bookingType === "Round Trip" && (
        <label>
          <p>Return date:</p>
          <input
            type="date"
            className="date-picker"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
        </label>
      )}
        <br />

      <button onClick={handleSearchClick}>Confirm booking </button>
    </div>
    </div>
  );
}

export default SpaceTourismBooking;
