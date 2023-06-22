import React, { useEffect } from 'react';
import Navbar from '@component/components/Navbar';
import HomeData from '@component/components/HomeData';
import { useRouter } from 'next/router';
import { getAuth, checkUser, getLogDetails } from '@component/slices/Auth';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';


const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = checkUser();
    if (token) {
      dispatch(getAuth());
      dispatch(getLogDetails());
    } else {
      router.push('/signin');
    }
  }, []);

  return (
    <>
      <Toaster />
      <div>
        <Navbar />
      </div>
      <div className="h-5/6 z-0 w-full m-auto">
        <HomeData />
      </div>
    </>
  );
};

export default index;
