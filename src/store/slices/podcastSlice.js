import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  podcasts: null,
};

const podcastSlice = createSlice({
  name: "podcasts",
  initialState,
  reducers: {
    setPodcasts: (state, action) => {
      state.podcasts = action.payload;
    },
  },
});

export const { setPodcasts } = podcastSlice.actions;
export default podcastSlice.reducer;
