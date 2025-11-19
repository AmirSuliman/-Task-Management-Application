// Task status constants
export const TASK_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
};

// Status display configuration
export const STATUS_CONFIG = {
  [TASK_STATUS.PENDING]: {
    label: "Pending",
    color:
      "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-400/10 dark:text-yellow-200 dark:border-yellow-500/40",
    badgeColor: "bg-yellow-500",
    nextStatus: TASK_STATUS.IN_PROGRESS,
    nextLabel: "Start",
  },
  [TASK_STATUS.IN_PROGRESS]: {
    label: "In Progress",
    color:
      "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-400/10 dark:text-blue-200 dark:border-blue-500/40",
    badgeColor: "bg-blue-500",
    nextStatus: TASK_STATUS.COMPLETED,
    nextLabel: "Complete",
  },
  [TASK_STATUS.COMPLETED]: {
    label: "Completed",
    color:
      "bg-green-100 text-green-800 border-green-300 dark:bg-green-400/10 dark:text-green-200 dark:border-green-500/40",
    badgeColor: "bg-green-500",
    nextStatus: null,
    nextLabel: null,
  },
};

// Filter tabs configuration
export const FILTER_TABS = [
  { id: "all", label: "All Tasks" },
  { id: TASK_STATUS.PENDING, label: "Pending" },
  { id: TASK_STATUS.IN_PROGRESS, label: "In Progress" },
  { id: TASK_STATUS.COMPLETED, label: "Completed" },
];

// Form validation
export const VALIDATION = {
  TITLE_MAX_LENGTH: 100,
  TITLE_MIN_LENGTH: 1,
};
