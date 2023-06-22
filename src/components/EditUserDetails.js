import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkUser } from '@component/slices/Auth';
import axios from 'axios';

const EditUserDetails = () => {
  const router = useRouter();
  const phoneRegExp = /^[0]?[6789]\d{9}$/;
  const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const BACKEND_URL = 'http://localhost:3003';
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    oldPassword: yup
      .string()
      .required('Enter Your Password')
      .min(6, 'Password Should Minimum 6 Characters')
      .max(32, 'Password Should Maximum 12 Characters'),
    newPassword: yup
      .string()
      .required('Enter Your New Password')
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
      oldPassword: '',
      newPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const oldPassword = watch('oldPassword');
  const newPassword = watch('newPassword');

  const updatePassword = (data) => {
    return async (dispatch) => {
      try {
        const token = checkUser();
        if (token) {
          const config = { headers: { Authorization: `Bearer ${token}` } };
          await axios
            .post(BACKEND_URL + '/update-password', data, config)
            .then((res) => {
              if (res.status === 200) {
                router.push('/');
              }
              return res;
            });
        } else {
          toast.error('Authorization Failed');
        }
      } catch (error) {
        toast.error(error?.response?.data?.errors?.body[0]);
        return;
      }
    };
  };

  const onSubmit = async (data) => {
    if (data?.oldPassword === data?.newPassword) {
      setError('newPassword', {
        message: "New Password's Should Not be Equal Old Password",
        type: 'custom',
      });
    } else {
      dispatch(updatePassword(data));
    }
  };

  return (
    <div className="h-full mt-24">
      <Toaster />
      <div className="flex md:flex-row md:justify-around md:items-center flex-col items-center justify-center h-4/6">
        <div className="w-full text-center h-96 md:block hidden">
          <img
            src="https://images.unsplash.com/photo-1554679665-f5537f187268?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
            alt="Restaurant-image"
            className="object-cover h-96 w-4/6  m-auto rounded-md"
          />
          <div className="text-center">
            <h3 className="text-yellow-400 font-semibold text-4xl tracking-wide italic mt-8 hover:text-gray-500">
              ZUZU
            </h3>
          </div>
        </div>
        <div className="login-form w-full ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="md:w-4/6 w-5/6 md:h-full md:p-8 px-2 py-4 m-auto bg-white shadow rounded-sm bg-neutral-100"
          >
            <div className="title text-center ">
              <h3 className="mb-8 text-yellow-400 font-semibold text-3xl tracking-wide italic">
                Update Password
              </h3>
            </div>
            <div className="mb-6 relative">
              <label
                for="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Old Password
              </label>
              <input
                type="password"
                {...register('oldPassword', {
                  required: 'Enter Your Old Password',
                })}
                placeholder="Old Password *** "
                id="password"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
              {errors?.oldPassword && (
                <small className="absolute text-xs text-red-500 left-0 md:-bottom-1 -bottom-4 md:top-20">
                  {errors?.oldPassword?.message}
                </small>
              )}
            </div>
            <div className="mb-6 relative">
              <label
                for="newPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                type="password"
                disabled={oldPassword === ''}
                {...register('newPassword', {
                  required: 'Enter Your New Password',
                })}
                placeholder="New Password *** "
                id="newPassword"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
              {errors?.newPassword && (
                <small className="absolute text-xs text-red-500 left-0 md:-bottom-1 -bottom-4 md:top-20">
                  {errors?.newPassword?.message}
                </small>
              )}
            </div>
            <div className="text-center flex flex-row justify-center items-center gap-3">
              <button
                onClick={() => router.back()}
                type="submit"
                className="text-white bg-orange-700 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Back
              </button>
              <button
                type="submit"
                className="text-white bg-orange-700 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                UPDATE
              </button>
            </div>{' '}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserDetails;
