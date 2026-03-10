import axiosInstance from './axiosInstance'

export const getSessions = () =>
  axiosInstance.get('/sessions')

export const getRecentSessions = () =>
  axiosInstance.get('/feedback/recent-sessions/')

export const getSession = (id) =>
  axiosInstance.get(`/feedback/sessions/${id}`)

export const createSession = (data) =>
  axiosInstance.post('/feedback/sessions', data)

export const deleteSession = (id) =>
  axiosInstance.delete(`/sessions/${id}`)

export const joinSession = (code) =>
  axiosInstance.get(`/feedback/sessions/join-session/${code}`)

export const endSession = (id) =>
  axiosInstance.patch(`/feedback/sessions/${id}/end-session`)
