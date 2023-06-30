import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const index = () => {
  const router = useRouter();
  const qrQuery = router.query.token;
  const typeOfPerson = router.query.typeOfPerson;
  console.log(qrQuery, 'qrQuery');
  console.log(typeOfPerson, 'typeOfPerson');
  useEffect(() => {
    if (qrQuery && typeOfPerson === 'admin') {
      localStorage.setItem('token', qrQuery);
      router.push('/admin-page');
    } else {
      localStorage.setItem('token', qrQuery);
      router.push('/');
    }
  }, [qrQuery, typeOfPerson]);

  return <div></div>;
};

export default index;
