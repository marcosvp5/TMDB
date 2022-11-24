import { createAction, createReducer } from "@reduxjs/toolkit";

export const setSearch = createAction("SET_SEARCH");

const searchReducer = createReducer(
  [],
  {
    [setSearch]: (state, action) => action.payload,
  }
);

export default searchReducer;
