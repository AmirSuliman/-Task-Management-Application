import apiClient from "../utils/apiClient";

const SEARCH_DEBOUNCE_MS = 800;
let searchDebounceTimeout: ReturnType<typeof setTimeout> | null = null;

const taskService = {
  // Get all tasks with optional status filter
  async getTasks(
    status: string | null = null,
    sort: "createdAt" | "status" = "createdAt",
    search: string = ""
  ) {
    const shouldDebounce = Boolean(search.trim());

    if (searchDebounceTimeout) {
      clearTimeout(searchDebounceTimeout);
      searchDebounceTimeout = null;
    }

    return new Promise(async (resolve, reject) => {
      const runRequest = async () => {
        try {
          let url = status ? `/tasks?status=${status}&sort=${sort}` : `/tasks?sort=${sort}`;
          if (search) {
            url += `&search=${encodeURIComponent(search)}`;
          }
          const response = await apiClient.get(url);
          resolve(response.data.data);
        } catch (error) {
          reject(error);
        }
      };

      if (shouldDebounce) {
        searchDebounceTimeout = setTimeout(runRequest, SEARCH_DEBOUNCE_MS);
      } else {
        await runRequest();
      }
    });
  },

  // Create a new task
  async createTask(taskData: { title: string; description?: string }) {
    try {
      const response = await apiClient.post("/tasks", taskData);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // Update task status
  async updateTaskStatus(taskId: string, status: string) {
    try {
      const response = await apiClient.patch(`/tasks/${taskId}`, { status });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete a task
  async deleteTask(taskId: string) {
    try {
      const response = await apiClient.delete(`/tasks/${taskId}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
};

export default taskService;
