import React from 'react'
import LogHistory from '@component/components/LogHistory';
import Navbar from '@component/components/Navbar';


const index = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <LogHistory />
      </div>
    </>
  );
}

export default index