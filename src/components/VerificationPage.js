import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { getAuth } from '@component/slices/Auth';
import { checkUser } from '@component/slices/Auth';

const VerificationPage = () => {
  const BACKEND_URL = 'http://localhost:3003';
  const [sentOTP, setSentOTP] = useState(false);
  const user = useSelector((state) => state.auth);
  const phoneRegExp = /^[0]?[6789]\d{9}$/;
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getAuth());
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: '',
      otp: '',
    },
  });

  const phone = watch('phone');
  const otp = watch('otp');

  const verifyOTP = (data) => {
    return new Promise(async (resolve, reject) => {
      const token = checkUser();
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (otp?.length === 4) {
        try {
          if (token) {
            const response = await axios.post(
              BACKEND_URL + '/verify-otp',
              data,
              config
            );
            if (response.status === 200) {
              toast.success('OTP Verified Successfully');
              if(user?.typeOfPerson === 'admin') {
                router.push('/admin-page');
              }else {
                router.push('/');
              }
              return resolve;
            } else {
              toast.error('Try Again Later');
            }
          }
        } catch (error) {
          toast.error(error?.response?.data?.errors?.body[0]);
          return reject;
        }
      } else {
        setError('otp', {
          message: 'Enter Valid OTP',
          type: 'custom',
        });
      }
    });
  };

  const sendOTP = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const token = checkUser();
        if (token) {
          const config = { headers: { Authorization: `Bearer ${token}` } };
          const response = await axios.post(
            BACKEND_URL + '/send-otp',
            { phone: data?.phone },
            config
          );
          if (response.status === 200) {
            setSentOTP(true);
            toast.success('OTP Sent Successfully');
            return resolve;
          } else {
            toast.error('OTP Send Failed');
            return reject;
          }
        }
      } catch (error) {
        toast.error(error?.response?.data?.errors?.body[0]);
        return reject;
      }
    });
  };

  const onSubmit = async (data) => {
    if (sentOTP) {
      verifyOTP(data);
    } else {
      sendOTP(data);
    }
  };

  return (
    <div className="h-full lg:mt-40 mt-8">
      <Toaster />
      <div className="flex md:flex-row md:justify-around md:items-center flex-col items-center justify-center h-4/6">
        <div className="w-full text-center h-96 md:block hidden">
          <img
            src="https://images.unsplash.com/photo-1554679665-f5537f187268?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
            alt="Restaurant-image"
            className="object-cover h-96 w-4/6  m-auto rounded-md"
          />
        </div>
        <div className="login-form w-full md:mt-0 mt-20">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="md:w-4/6 w-5/6 md:h-96 md:p-8 px-2 py-4 m-auto bg-white shadow rounded-sm bg-neutral-100"
          >
            <div className="title text-center ">
              <h3 className="mb-8 text-yellow-400 font-semibold text-3xl tracking-wide italic">
                Phone Number Verification
              </h3>
            </div>
            <div className="mb-6 relative">
              <label
                for="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone Number
              </label>
              <input
                type="number"
                id="phone"
                {...register('phone', {
                  required: 'Enter your Phone Number',
                  pattern: {
                    value: phoneRegExp,
                    message: 'Enter Valid Phone Number',
                  },
                })}
                placeholder="Enter your Phone Number"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
              {errors.email && (
                <small className="absolute text-xs text-red-500 left-0 md:-bottom-1 -bottom-4 md:top-20">
                  {errors.email.message}
                </small>
              )}
            </div>

            {sentOTP && (
              <div className="mb-6 relative">
                <label
                  for="otp"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter Your OTP
                </label>
                <input
                  type="number"
                  id="otp"
                  {...register('otp', {
                    onChange: () => clearErrors('otp'),
                  })}
                  placeholder="OTP"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
                {errors.otp && (
                  <small className="absolute text-xs text-red-500 left-0 md:-bottom-1 -bottom-4 md:top-20">
                    {errors.otp.message}
                  </small>
                )}
              </div>
            )}

            {sentOTP && (
              <div className="text-center mb-2">
                <p
                  className="text-xs hover:underline hover:text-orange-700 cursor-pointer"
                  onClick={() =>
                    verifyOTP({
                      phone: phone,
                      otp: otp,
                    })
                  }
                >
                  Resend OTP
                </p>
              </div>
            )}

            <div className="text-center">
              <button
                type="submit"
                className="text-white bg-orange-700 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {sentOTP ? 'Verify OTP' : 'Send OTP'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
