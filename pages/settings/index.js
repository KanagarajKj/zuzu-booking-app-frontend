import React from 'react';
import EditUserDetails from '@component/components/EditUserDetails';
import Navbar from '@component/components/Navbar';

const index = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <EditUserDetails />
      </div>
    </>
  );
};

export default index;
