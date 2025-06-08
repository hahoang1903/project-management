import { weakMapMemoize } from "@reduxjs/toolkit";
import { createAppSelector } from "./store";

// ui selectors
export const selectIsDarkMode = createAppSelector(
  [(state) => state.ui],
  (ui) => ui.isDarkMode,
);
export const selectIsSidebarCollapsed = createAppSelector(
  [(state) => state.ui],
  (ui) => ui.isSidebarCollapsed,
);
export const selectActiveTab = createAppSelector(
  [(state) => state.ui],
  (ui) => ui.activeTab,
);

// project selectors
export const selectProjectById = createAppSelector(
  [(state) => state.project.items, (_, id: string) => id],
  (items, id) => items.find((project) => project.id === id),
  {
    memoize: weakMapMemoize,
    argsMemoize: weakMapMemoize,
  },
);

export const selectProjectsStatus = createAppSelector(
  [(state) => state.project],
  (project) => project.status,
);
