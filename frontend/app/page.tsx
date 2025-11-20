"use client";

import CreateTaskButtonAndModal from "@/components/CreateTaskButtonAndModal";
import ErrorMessage from "@/components/ErrorMessage";
import FilterTabs from "@/components/FilterTabs";
import LoadingSpinner from "@/components/LoadingSpinner";
import TaskList from "@/components/TaskList";
import ThemeToggle from "@/components/ThemeToggle";
import { useTasks } from "@/hooks/useTasks";

export default function Home() {
  const {
    tasks,
    loading,
    error,
    sort,
    setSort,
    filter,
    setFilter,
    search,
    setSearch,
    updateTaskStatus,
    deleteTask,
    refreshTasks,
    taskCounts,
    createTask,
  } = useTasks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ThemeToggle />

        {/* Header */}
        <header className="mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Task Management
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Organize your work and life, finally.
            </p>
          </div>
        </header>
        <CreateTaskButtonAndModal createTask={createTask} />
        {/* Main Content */}
        <main>
          {/* Filter Tabs */}
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 mb-6">
            <FilterTabs
              activeFilter={filter}
              onFilterChange={setFilter}
              taskCounts={taskCounts}
            />
            <section className="flex items-center gap-3 flex-wrap justify-between px-4 py-3">

              {/* Search */}
              <label className="appearance-none bg-gradient-to-r from-indigo-500/10 to-blue-500/10 dark:from-indigo-400/10 dark:to-blue-400/10 border border-indigo-200 dark:border-indigo-500/40 text-indigo-600 dark:text-indigo-200 rounded-full px-4 py-2 pr-10 font-medium shadow-sm outline-none focus:ring-2 focus:ring-indigo-400/70 focus:border-indigo-400 transition-all cursor-pointer">
                Search:
                <input
                  type="text"
                  className="outline-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </label>

              {/* Sort by */}
              <label className="w-fit block text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-3 ">
                Sort by:
                <div className="relative">
                  <select
                    className="appearance-none bg-gradient-to-r from-indigo-500/10 to-blue-500/10 dark:from-indigo-400/10 dark:to-blue-400/10 border border-indigo-200 dark:border-indigo-500/40 text-indigo-600 dark:text-indigo-200 rounded-full px-4 py-2 pr-10 font-medium shadow-sm outline-none focus:ring-2 focus:ring-indigo-400/70 focus:border-indigo-400 transition-all cursor-pointer"
                    value={sort}
                    onChange={(e) => setSort(e.target.value as "createdAt" | "status")}
                  >
                    <option value="createdAt">Created At</option>
                    <option value="status">Status</option>
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-indigo-500 dark:text-indigo-200">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </div>
              </label>

            </section>

            {/* Error Message */}
            {error && (
              <div className="p-4">
                <ErrorMessage message={error} onRetry={refreshTasks} />
              </div>
            )}

            {/* Task List */}
            <div className="p-4">
              {loading ? (
                <LoadingSpinner text="Loading tasks..." />
              ) : (
                <TaskList
                  tasks={tasks}
                  onUpdateStatus={async (taskId, newStatus) => {
                    await updateTaskStatus(taskId, newStatus);
                  }}
                  onDelete={deleteTask}
                />
              )}
            </div>
          </div>
        </main>
      </div>

    </div>
  );
}
