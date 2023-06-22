import React from 'react';
import { useRouter } from 'next/router';
import Navbar from '@component/components/Navbar';
import { AiTwotoneStar } from 'react-icons/ai';
import { useForm } from 'react-hook-form';

const SingleRestaurant = () => {
  const router = useRouter();
  console.log(router.query.id, '11111111');
  const phoneRegExp = /^(?:(?:\+)91(\s*[\ -]\s*)?|[0]?)?[6-9]\d{9}$/;
  const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      dateFrom: '',
      dateTo: '',
      noOfPeoples: '',
      specialRequest: '',
    },
  });

  const password = watch('password');
  const onSubmit = (data) => console.log(data, 'data');
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="flex md:flex-row md:mt-40 mt-8 flex-col">
        <div className="w-full rounded-lg  mb-10 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <a href="#!">
            <img
              className="rounded-t-lg w-full md:h-72 h-52"
              src=""
              alt="image"
            />
          </a>
          <div className="p-6">
            <div className="flex felx-row justify-between items-center">
              <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                {/* {restaurant?.name} */} name
              </h5>
              <p className="flex felx-row justify-between items-center gap-2 text-lg text-orange-600 font-semibold">
                {/* {restaurant?.rating}{' '} */}
                <span className="text-orange-600">
                  <AiTwotoneStar />
                </span>
              </p>
            </div>
            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <button
              onClick={() => router.push('/')}
              type="button"
              className="inline-block rounded bg-orange-600 hover:bg-orange-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Back
            </button>
          </div>
        </div>

        <div className="w-full">
          <form
            // onSubmit={handleSubmit(onSubmit)}
            className="md:w-4/6 w-5/6 md:h-full md:p-8 px-2 py-4 m-auto bg-white shadow rounded-sm bg-neutral-100"
          >
            <div className="title text-center ">
              <h3 className="mb-8 text-yellow-400 font-semibold text-3xl tracking-wide italic">
                Booking Form
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
                placeholder="Email"
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
                {...register('phoneNumber', {
                  required: 'Enter your Phone Number',
                  pattern: {
                    value: phoneRegExp,
                    message: 'Enter Valid Phone Number',
                  },
                })}
                placeholder="Enter Your Name"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
              {errors.phoneNumber && (
                <small className="absolute text-xs text-red-500 left-0 md:-bottom-1 -bottom-4 md:top-20">
                  {errors.phoneNumber.message}
                </small>
              )}
            </div>
            <div className="mb-6 relative">
              <label
                for="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Do you have any special request?
              </label>
              <input
                type="text"
                {...register('request')}
                placeholder="...."
                id="confirmPassword"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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

export default SingleRestaurant;
