import axiosInstance from './axiosInstance'

export const getSessions = () =>
  axiosInstance.get('/sessions')

export const getRecentSessions = () =>
  axiosInstance.get('/feedback/recent-sessions/')

export const getSession = (id) =>
  axiosInstance.get(`/sessions/${id}`)

export const createSession = (data) =>
  axiosInstance.post('/feedback/sessions', data)

export const deleteSession = (id) =>
  axiosInstance.delete(`/sessions/${id}`)
