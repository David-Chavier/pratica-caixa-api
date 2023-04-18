import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../..';
import TransactionType from '../../../types/TransactionType';
import { doGet, doPost } from '../../../services/api';

const adapter = createEntityAdapter<TransactionType>({
  selectId: item => item.id
});

export const getTransactions = createAsyncThunk('transactions/get', async () => {
  const response = await doGet('/transactions');

  if (response.success) {
    return response.data.transactions;
  }
});

export const saveTransaction = createAsyncThunk('transactions/save', async (transaction: TransactionType) => {
  const response = await doPost('/transactions', transaction);

  if (response.success) {
    console.log(response.data.msg);
    return transaction;
  }
});

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: adapter.getInitialState(),
  reducers: {
    addTransaction: adapter.addOne,
    editTransaction: adapter.updateOne
  },
  extraReducers: builder => {
    builder.addCase(getTransactions.fulfilled, (state, action) => {
      adapter.setAll(state, action.payload);
    });
    builder.addCase(saveTransaction.fulfilled, (state, action) => {
      if (action.payload) {
        adapter.addOne(state, action.payload);
      }
    });
  }
});

export const { selectAll, selectById } = adapter.getSelectors((state: RootState) => state.transactions);

export const TransactionsSlice = transactionsSlice.reducer;
export const { editTransaction, addTransaction } = transactionsSlice.actions;
