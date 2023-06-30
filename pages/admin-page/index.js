import React, { useEffect } from 'react';
import Navbar from '@component/components/Navbar';
import HomeData from '@component/components/HomeData';
import { useRouter } from 'next/router';
import { getAuth, checkUser, getLogDetails } from '@component/slices/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    const token = checkUser();
    if (token) {
      dispatch(getAuth());
    } else {
      router.push('/signin');
    }
  }, []);

  useEffect(() => {
    const token = checkUser();

    if (token && user?.typeOfPerson === 'user' && user?.isPhoneNumberVerified) {
      router.push('/');
    } else if (
      token &&
      user?.typeOfPerson === 'user' &&
      !user?.isPhoneNumberVerified
    ) {
      router.push('/verification-page');
    } else {
      router.push('/admin-page');
    }
  }, [user?.typeOfPerson, user?.isPhoneNumberVerified]);

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
