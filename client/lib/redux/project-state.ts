import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Project } from "../trpc/server-utils";

const initialState: { items: Project[] } = { items: [] };

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setProjects } = projectSlice.actions;
export default projectSlice.reducer;
