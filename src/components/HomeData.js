import React from 'react';
import { AiTwotoneStar } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const HomeData = () => {
  const router = useRouter();
  const restaurantsData = useSelector(
    (state) => state.registration.restaurantData
  );

  return (
    <div className="p-8 md:mt-24 mt-0">
      <div className="text-4xl font-semibold italic text-orange-600 text-center my-6">
        <h1>Restaurants</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4 ">
        {restaurantsData?.length > 0 &&
          restaurantsData?.map((restaurant) => {
            return (
              <div
                key={restaurant?._id?.$oid}
                className=" rounded-lg  mb-10 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
              >
                <a href="#!">
                  <img
                    className="rounded-t-lg w-full md:h-72 h-52"
                    src={restaurant?.URL}
                    alt="image"
                  />
                </a>
                <div className="p-6">
                  <div className="flex felx-row justify-between items-center">
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                      {restaurant?.name}
                    </h5>
                    <p className="flex felx-row justify-between items-center gap-2 text-lg text-orange-600 font-semibold">
                      {restaurant?.rating}{' '}
                      <span className="text-orange-600">
                        <AiTwotoneStar />
                      </span>
                    </p>
                  </div>
                  <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <button
                    // onClick={() =>
                    //   router.push(`/singlerestaurant/${restaurant?._id?.$oid}`)
                    // }
                    disabled
                    type="button"
                    className="inline-block rounded bg-orange-600 hover:bg-orange-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default HomeData;
