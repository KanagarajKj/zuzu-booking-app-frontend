import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import { BiAlignJustify } from 'react-icons/bi';
import { BsArrowRightCircle } from 'react-icons/bs';
import LogoutModal from './LogoutModal';
import { useSelector } from 'react-redux';
import { removeToken } from '@component/slices/Auth';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { checkUser } from '@component/slices/Auth';
import { AiOutlineMail, AiTwotonePhone, AiOutlineUser } from 'react-icons/ai';

const Navbar = () => {
  const [openUserDetail, setOpenUserDetail] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [openMobNavMenu, setOpenMobNavMenu] = useState(false);
  const [modalOpen, setmodalOpen] = useState(false);
  const overLayRef = useRef(null);
  const router = useRouter();
  const user = useSelector((state) => state.auth);
  const BACKEND_URL = 'http://localhost:3003';

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        openUserDetail &&
        overLayRef.current &&
        !overLayRef.current.contains(e.target)
      ) {
        setOpenUserDetail(false);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [openUserDetail]);

  const signOut = async () => {
    const token = checkUser();
    if (token) {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(BACKEND_URL + '/log-out', config);
      if (response.status === 200) {
        removeToken();
        setmodalOpen(false);
        toast.success('Logout Successfully');
        router.push('/login');
      }
    } else {
      toast.error('Unable to logout');
    }
  };

  return (
    <>
      {modalOpen && (
        <LogoutModal
          modalOpen={modalOpen}
          signOut={signOut}
          setmodalOpen={setmodalOpen}
        />
      )}
      <Toaster />
      {isMobileView && (
        <nav className="flex flex-row justify-between items-center py-6 px-8 w-full shadow-md bg-orange-400">
          <h3 className="text-white font-bold text-3xl tracking-wide italic">
            ZUZU
          </h3>
          <span
            className="text-4xl text-white"
            onClick={() => setOpenMobNavMenu(!openMobNavMenu)}
          >
            <BiAlignJustify />
          </span>
          {openMobNavMenu && (
            <div className="z-50 duration-500 delay-200 flex flex-col justify-center items-center mt-0 gap-10 absolute w-screen h-screen top-0 left-0 bg-white">
              <div className="relative">
                <div
                  className="absolute top-0 -left-4 text-yellow-400 font-semibold text-4xl"
                  onClick={() => setOpenMobNavMenu(false)}
                >
                  <BsArrowRightCircle />
                </div>
              </div>
              <div>
                <ul className="flex flex-col justify-center items-center mt-0 gap-5 text-lg font-bold opacity-80">
                  <li
                    onClick={() => {
                      router.push('/');
                      setOpenMobNavMenu(false);
                    }}
                    className="cursor-pointer"
                  >
                    Home
                  </li>
                  <li
                    className="cursor-pointer"
                    onClick={() => {
                      router.push('/settings');
                      setOpenMobNavMenu(false);
                    }}
                  >
                    Update Password
                  </li>
                  <li
                    className="cursor-pointer"
                    onClick={() => {
                      router.push('/history');
                      setOpenMobNavMenu(false);
                    }}
                  >
                    History
                  </li>
                  <li
                    className="cursor-pointer"
                    onClick={() => {
                      setmodalOpen(!modalOpen);
                      setOpenMobNavMenu(false);
                    }}
                  >
                    Log Out
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <img
                  className="w-20 cursor-pointer m-auto"
                  src="data:image/jpeg;base64,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"
                  alt="avatar"
                  onClick={() => setOpenUserDetail(!openUserDetail)}
                />
                <div className="mt-4">
                  <ul className="flex flex-col gap-2">
                    <li className="flex flex-row gap-3 items-center font-semibold">
                      {' '}
                      <span className="text-orange-300 text-4xl">
                        <AiOutlineUser />
                      </span>
                      {user?.fullName}
                    </li>
                    <li className="flex flex-row gap-3 items-center font-semibold">
                      <span className="text-orange-300 text-4xl">
                        <AiOutlineMail />
                      </span>
                      {user?.email}
                    </li>
                    <li className="flex flex-row gap-3 items-center font-semibold">
                      <span className="text-orange-300 text-4xl">
                        <AiTwotonePhone />
                      </span>
                      {user?.phone}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </nav>
      )}

      {!isMobileView && (
        <nav
          className="bg-orange-400 flex flex-row justify-between items-center py-6 px-8 w-full shadow-md fixed top-0 w-full z-50"
          ref={overLayRef}
        >
          <div>
            <h3 className="text-white font-semibold text-3xl tracking-wide italic">
              ZUZU
            </h3>
          </div>
          <div className="flex flex-row justify-between items-center gap-10">
            <div>
              <ul className="flex flex-row justify-between items-center gap-10 text-lg font-bold opacity-80">
                <li
                  onClick={() => router.push('/')}
                  className="cursor-pointer text-white "
                >
                  Home
                </li>
                <li
                  className="cursor-pointer text-white"
                  onClick={() => {
                    router.push('/history');
                  }}
                >
                  History
                </li>
                <li
                  className="cursor-pointer text-white"
                  onClick={() => {
                    router.push('/settings');
                  }}
                >
                  Update Password
                </li>
                <li
                  className="cursor-pointer text-white"
                  onClick={() => setmodalOpen(!modalOpen)}
                >
                  Log Out
                </li>
              </ul>
            </div>
            <div className="relative">
              <img
                className="w-10 cursor-pointer rounded-full"
                src="data:image/jpeg;base64,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"
                alt="avatar"
                onClick={() => setOpenUserDetail(!openUserDetail)}
              />
              {openUserDetail && (
                <div className="absolute top-100 right-0 bg-white py-4 px-8 w-max mt-4 shadow-2xl bg-gray-50 shadow-gray-50 rounded">
                  <ul className="flex flex-col gap-4">
                    <li className="flex flex-row gap-3 items-center font-semibold">
                      <span className="text-orange-300 text-4xl">
                        <AiOutlineUser />
                      </span>
                      {user?.fullName}
                    </li>
                    <li className="flex flex-row gap-3 items-center font-semibold">
                      <span className="text-orange-300 text-4xl">
                        <AiOutlineMail />
                      </span>
                      {user?.email}
                    </li>
                    <li className="flex flex-row gap-3 items-center font-semibold">
                      <span className="text-orange-300 text-4xl">
                        <AiTwotonePhone />
                      </span>
                      {user?.phone}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
