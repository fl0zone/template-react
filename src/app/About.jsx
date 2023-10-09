import React, { useState, useEffect } from 'react';
import './About.css';

function About() {
  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
    // Load the team data from the JSON file
    import('./data/member.json').then(data => {
      setTeamData(data.default); // Use data.default to access the imported JSON data
    });
  }, []);

  if (!teamData) return <div>Loading...</div>;

  return (
    <div className="about-container">
      <h1>About Team {teamData.teamName}</h1>
      <p>{teamData.description}</p>

      <h2>Team Members</h2>
      <div className="team-members">
        {teamData.members.map((member, index) => ( // Add a unique "key" prop to each mapped element
          <div className="card" key={index}>
            <img className="img" src={member.image} alt={member.name} /> {/* Add "alt" prop for accessibility */}
            <div className="textBox">
              <p className="text head">{member.name}</p>
              <div className='black-text'>
                <span>{member.role}</span>
              </div>
              <p className="text price black-text">{member.description}</p>
            </div>
          </div>
        ))}
      </div>

      <h2>Our Challenge</h2>
      <p>{teamData.challenge}</p>
    </div>
  );
}

export default About;
