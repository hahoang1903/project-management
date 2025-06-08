import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Tab = "board" | "gantt" | "table";

export type UIState = {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
  activeTab: Tab;
};

const initialState: UIState = {
  isSidebarCollapsed: false,
  isDarkMode: false,
  activeTab: "board",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<Tab>) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setIsDarkMode, setIsSidebarCollapsed, setActiveTab } =
  uiSlice.actions;
export default uiSlice.reducer;
