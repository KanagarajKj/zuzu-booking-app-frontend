import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { setToken, setRefreshToken } from '@component/slices/Auth';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const SignIn = () => {
  const router = useRouter();
  const phoneRegExp = /^[0]?[6789]\d{9}$/;
  const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const BACKEND_URL = 'http://localhost:3003';
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Name is Required')
      .matches(/^[a-zA-Z ]*$/, 'Enter Valid Name'),
    email: yup
      .string()
      .required('Enter Email Id')
      .email('Enter a Valid Email Id'),
    phone: yup
      .string()
      .required('Phone Number is Required')
      .matches(phoneRegExp, 'Enter Valid Phone Number'),
    password: yup
      .string()
      .required('Enter Your Password')
      .min(6, 'Password Should Minimum 6 Characters')
      .max(32, 'Password Should Maximum 12 Characters'),
    confirmPassword: yup
      .string()
      .required('Enter Your Confirm Password')
      .min(6, 'Password Should Minimum 6 Characters')
      .max(32, 'Password Should Maximum 12 Characters'),
  });
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const password = watch('password');

  const signUpUser = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (data.password !== data.confirmPassword) {
          setError('confirmPassword', {
            message: 'Password is not Matching!',
            type: 'custom',
          });
          return reject('Password is not Matching!');
        } else {
          const response = await axios.post(BACKEND_URL + '/sign-up', data);
          if (response.status === 200) {
            const { token, refreshToken } = response.data;
            setToken(token);
            setRefreshToken(refreshToken);
            resolve({ token });
            router.push('/');
            toast.success('Registered Successfully');
            return;
          } else {
            toast.error('Try Again Later');
          }
        }
      } catch (error) {
        toast.error(error?.response?.data?.errors?.body[1]);
      }
    });
  };

  const onSubmit = async (data) => await signUpUser(data);

  return (
    <div className="h-full">
      <Toaster />
      <div className="flex md:flex-row md:justify-around md:items-center flex-col items-center justify-center h-4/6">
        <div className="w-full text-center h-96 md:block hidden">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt="Restaurant-image"
            className="object-cover h-96 w-4/6  m-auto rounded-md"
          />
          <div className="text-center">
            <h3 className="text-yellow-400 font-semibold text-4xl tracking-wide italic mt-8 hover:text-gray-500">
              ZUZU
            </h3>
          </div>
        </div>
        <div className="login-form w-full md:mt-10 mt-20">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="md:w-4/6 w-5/6 md:h-full md:p-8 px-2 py-4 m-auto bg-white shadow rounded-sm bg-neutral-100"
          >
            <div className="title text-center ">
              <h3 className="mb-8 text-yellow-400 font-semibold text-3xl tracking-wide italic">
                Registration Form
              </h3>
            </div>
            <div className="mb-6 relative">
              <label
                for="fullName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                {...register('fullName', {
                  required: 'Enter your Full Name',
                  pattern: {
                    value: /^[a-zA-Z ]*$/,
                    message: 'Enter Valid Name',
                  },
                })}
                placeholder="Enter Your Name"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
              {errors.fullName && (
                <small className="absolute text-xs text-red-500 left-0 md:-bottom-1 -bottom-4 md:top-20">
                  {errors.fullName.message}
                </small>
              )}
            </div>
            <div className="mb-6 relative">
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                {...register('email', {
                  required: 'Enter your EmailId',
                  pattern: {
                    value: emailRegExp,
                    message: 'Enter Valid Email ID',
                  },
                })}
                placeholder="Enter Your Email ID"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
              {errors.email && (
                <small className="absolute text-xs text-red-500 left-0 md:-bottom-1 -bottom-4 md:top-20">
                  {errors.email.message}
                </small>
              )}
            </div>
            <div className="mb-6 relative">
              <label
                for="phoneNumber"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone Number
              </label>
              <input
                type="number"
                id="phoneNumber"
                {...register('phone', {
                  required: 'Enter your Phone Number',
                  pattern: {
                    value: phoneRegExp,
                    message: 'Enter Valid Phone Number',
                  },
                })}
                placeholder="Enter Your Phone Number"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
              {errors.phone && (
                <small className="absolute text-xs text-red-500 left-0 md:-bottom-1 -bottom-4 md:top-20">
                  {errors.phone.message}
                </small>
              )}
            </div>
            <div className="mb-6 relative">
              <label
                for="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                {...register('password', { required: 'Enter Your Password' })}
                placeholder="Password *** "
                id="password"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
              {errors.password && (
                <small className="absolute text-xs text-red-500 left-0 md:-bottom-1 -bottom-4 md:top-20">
                  {errors.password.message}
                </small>
              )}
            </div>
            <div className="mb-6 relative">
              <label
                for="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                disabled={password === ''}
                {...register('confirmPassword', {
                  required: 'Enter Your Confirm Password',
                  validate: (val) => {
                    if (watch('password') != val) {
                      return 'Your passwords do no match';
                    }
                  },
                })}
                placeholder="Confirm Password *** "
                id="confirmPassword"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
              {errors.confirmPassword && (
                <small className="absolute text-xs text-red-500 left-0 md:-bottom-1 -bottom-4 md:top-20">
                  {errors.confirmPassword.message}
                </small>
              )}
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="text-white bg-orange-700 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </div>
            <div className="mt-4 text-center flex flex-row justify-center gap-2">
              <p className="font-semibold">You already have an account ?</p>
              <p
                className="text-orange-300 hover:underline cursor-pointer font-semibold"
                onClick={() => router.push('/login')}
              >
                Log In
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
