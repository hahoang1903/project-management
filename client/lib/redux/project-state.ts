import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Project } from "../trpc/server-utils";
import type { QueryStatus } from "@tanstack/react-query";

export type ProjectState = {
  items: Project[];
  status: QueryStatus;
};

const initialState: ProjectState = {
  items: [],
  status: "pending",
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.items = action.payload;
    },
    setProjectsStatus: (state, action: PayloadAction<QueryStatus>) => {
      state.status = action.payload;
    },
  },
});

export const { setProjects, setProjectsStatus } = projectSlice.actions;
export default projectSlice.reducer;
