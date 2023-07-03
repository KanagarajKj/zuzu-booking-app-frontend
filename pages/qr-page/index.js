import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { setToken } from '@component/slices/Auth';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const index = () => {
  const router = useRouter();
  const userEmail = router?.query?.userEmail;
  const userPassword = router?.query?.userPassword;
  const typeOfPerson = router?.query?.typeOfPerson;

  const BACKEND_URL = 'http://localhost:3003';

  const data = {
    email: userEmail,
    password: userPassword,
    typeOfPerson: typeOfPerson,
  };

  const logInUser = (data) => {
    return new Promise(async (resolve, reject) => {
      console.log("running", data)
      try {
        const response = await axios.post(BACKEND_URL + '/log-in', data);
        if (response.status === 200 && typeOfPerson === 'admin') {
          const { token } = response.data;
          toast.success('Login Successfully');
          setToken(token);
          resolve({ token });
          router.push('/admin-page');
        } else if (response.status === 200 && typeOfPerson === 'user') {
          const { token } = response.data;
          toast.success('Login Successfully');
          setToken(token);
          resolve({ token });
          router.push('/');
        } else {
          toast.error('Try Again Later');
        }
      } catch (error) {
        toast.error(error?.response?.data?.errors?.body[0]);
      }
    });
  };

  useEffect(() => {
    if (
      data?.email?.length > 0 &&
      data?.password?.length > 0 &&
      data?.typeOfPerson?.length > 0
    ){
      logInUser(data);
    }
      
  }, [data?.email, data?.password, data?.typeOfPerson]);

  return <div>
    <Toaster/>
    Loading...</div>;
};

export default index;
