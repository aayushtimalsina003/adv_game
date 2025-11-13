import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for cookie-based session management
  headers: {
    'Content-Type': 'application/json',
  },
});

export const storyAPI = {
  // Create a new story with a theme
  createStory: async (theme) => {
    const response = await api.post('/stories/create', { theme });
    return response.data;
  },

  // Get job status by job_id
  getJobStatus: async (jobId) => {
    const response = await api.get(`/jobs/${jobId}`);
    return response.data;
  },

  // Get complete story by story_id
  getCompleteStory: async (storyId) => {
    const response = await api.get(`/stories/${storyId}/complete`);
    return response.data;
  },
};

export default api;
