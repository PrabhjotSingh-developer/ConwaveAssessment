
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAgeData,
  fetchGenderData,
  fetchNationalityData,
} from "../api/Api.jsx";


export const fetchAge = createAsyncThunk("name/fetchAge", async (name) => {
  const response = await fetchAgeData(name);
  return response.data;
});

export const fetchGender = createAsyncThunk(
  "name/fetchGender",
  async (name) => {
    const response = await fetchGenderData(name);
    return response.data;
  }
);

export const fetchNationality = createAsyncThunk(
  "name/fetchNationality",
  async (name) => {
    const response = await fetchNationalityData(name);
    return response.data;
  }
);

const nameSlice = createSlice({
  name: "name",
  initialState: {
    age: null,
    gender: null,
    nationality: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAge.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAge.fulfilled, (state, action) => {
        state.loading = false;
        state.age = action.payload.age;
      })
      .addCase(fetchGender.fulfilled, (state, action) => {
        state.loading = false;
        state.gender = action.payload.gender;
      })
      .addCase(fetchNationality.fulfilled, (state, action) => {
        state.loading = false;
        state.nationality = action.payload.country[0]?.country_id;
      })
      .addCase(fetchAge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default nameSlice.reducer;
