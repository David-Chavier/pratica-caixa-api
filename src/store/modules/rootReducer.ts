import { combineReducers } from '@reduxjs/toolkit';

import { TransactionsSlice } from './transactions/TransactionsSlice';
import PeopleSlice from './PeopleSlice';

export default combineReducers({
  transactions: TransactionsSlice,
  people: PeopleSlice
});
