import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getLogDetails } from '@component/slices/Auth';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const LogHistory = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const logDetails = useSelector((state) => state.registration.logDetails);

  useEffect(() => {
    dispatch(getLogDetails());
  }, []);

  return (
    <div className="lg:mt-24 mt-8">
      <div className="text-4xl font-semibold italic text-orange-600 text-center my-6">
        <h1>Log History</h1>
      </div>
      <div className="relative overflow-x-auto lg:w-9/12 m-auto">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-lg text-gray-700 bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                S_No.
              </th>
              <th scope="col" className="px-6 py-3">
                Log In or Out
              </th>
              <th scope="col" className="px-6 py-3">
                Date & Time
              </th>
            </tr>
          </thead>
          <tbody>
            {logDetails?.map((detail, index) => {
              const { logType, createdAt, _id } = detail;
              const date = new Date(createdAt);
              const readableTime = date.toLocaleString();
              return (
                <tr className="bg-white border-b " key={_id}>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td scope="row">
                    {logType === 'Sign Up' && (
                      <span className="px-6 py-4 font-bold text-lg text-orange-600 whitespace-nowrap">
                        {' '}
                        {logType}
                      </span>
                    )}
                    {logType === 'Log In' && (
                      <span className="px-6 py-4 font-bold text-lg text-lime-900 whitespace-nowrap">
                        {' '}
                        {logType}
                      </span>
                    )}
                    {logType === 'Log Out' && (
                      <span className="px-6 py-4 font-bold text-lg text-rose-400 whitespace-nowrap">
                        {' '}
                        {logType}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">{readableTime}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="text-center my-8">
        <button
          onClick={() => router.back()}
          type="submit"
          className="text-white bg-orange-700 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default LogHistory;
