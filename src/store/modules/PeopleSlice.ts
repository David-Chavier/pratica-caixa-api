import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { doGet } from '../../services/api';

export interface Person {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  films: any;
  species: any;
  url: string;
  edited: string;
}
const adapter = createEntityAdapter<Person>({
  selectId: item => item.name
});

export const getPeople = createAsyncThunk('people/get', async () => {
  const response = await doGet('/people');

  return response.results;
});
export const { selectAll, selectById } = adapter.getSelectors((state: any) => state.people);

const peopleSlice = createSlice({
  name: 'people',
  initialState: adapter.getInitialState(),
  reducers: {
    addOne: adapter.addOne,
    addMany: adapter.addMany,
    updateOne: adapter.updateOne
  },
  extraReducers: builder => {
    builder.addCase(getPeople.fulfilled, (state, action) => {
      adapter.setAll(state, action.payload);
    });
  }
});

export const { addOne, addMany, updateOne } = peopleSlice.actions;
export default peopleSlice.reducer;
