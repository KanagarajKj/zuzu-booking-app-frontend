import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';
import { setToken } from '@component/slices/Auth';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const router = useRouter();
  const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const BACKEND_URL = 'http://localhost:3003';

  const logInUser = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(BACKEND_URL + '/log-in', data);
        if (response.status === 200) {
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = async (data) => await logInUser(data);

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
                Log In
              </h3>
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
                placeholder="Email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
              {errors.email && (
                <small className="absolute text-xs text-red-500 left-0 md:-bottom-1 -bottom-4 md:top-20">
                  {errors.email.message}
                </small>
              )}
            </div>
            <div className="mb-6">
              <label
                for="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                {...register('password', { required: 'Enter Your Password' })}
                placeholder="Password *** "
                id="password"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
              {errors?.password && (
                <small className="absolute text-xs text-red-500 left-0 md:-bottom-1 -bottom-4 md:top-20">
                  {errors?.password?.message}
                </small>
              )}
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="text-white bg-orange-700 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Log In
              </button>
            </div>
            <div className="mt-4 text-center flex flex-row justify-center gap-2">
              <p className="font-semibold">You don't have an account ?</p>
              <p
                className="text-orange-300 hover:underline cursor-pointer font-semibold"
                onClick={() => router.push('/signin')}
              >
                Sign In
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
