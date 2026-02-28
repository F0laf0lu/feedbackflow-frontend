import axiosInstance from './axiosInstance'

export const getSessionFeedback = (sessionId) =>
  axiosInstance.get(`/sessions/${sessionId}/feedback`)

export const submitFeedback = (sessionId, data) =>
  axiosInstance.post(`/sessions/${sessionId}/feedback`, data)
