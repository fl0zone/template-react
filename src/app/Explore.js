import React from 'react';

function Explore() {
  return (
    <div>
      <h1 className='text-center mt-4'>Solar System</h1>
      {/* Embed NASA Eyes Solar System */}
      <iframe
        src="https://eyes.nasa.gov/apps/solar-system/"
        title="NASA Eyes Solar System"
        width="100%"
        height="600"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default Explore;
