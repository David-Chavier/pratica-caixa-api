import React, { useEffect } from 'react';

import ListTransactions from '../components/ListTransactions';
import { useAppDispatch } from '../store/hooks';
import { getPeople } from '../store/modules/PeopleSlice';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPeople());
  }, []);

  return (
    <>
      <ListTransactions />
    </>
  );
};

export default Home;
