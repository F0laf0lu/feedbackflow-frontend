import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage'
import AppLayout from './components/layout/Applayout'
import CreateSessionPage from './pages/NewSessionPage'
import SessionHistoryPage from './pages/SessionHistoryPage'
import SessionDetails from './pages/SessionDetailsPage'
import LiveFeedbackSession from './pages/FeedbackPage'
import FeedbackSubmissionForm from './pages/AudienceFeedbackPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import './App.css'

function App() {


  return (
      <Router>
        <Routes>
          <Route path='/' element={
            <AppLayout/>
          }>
            <Route path='/home' element={<HomePage/>}/>
            <Route path='/new-session' element={<CreateSessionPage/>}/>
            <Route path='/past-sessions' element={<SessionHistoryPage/>}/>
            <Route path='/session/:id' element={<SessionDetails/>}/> 
            <Route path='/session/:id/livefeedback' element={<LiveFeedbackSession/>}/> 
            <Route path="/" element={<Navigate to="/home" replace />} />
          </Route>
          <Route path='/session/:id/audience-feedback' element={<FeedbackSubmissionForm/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
        </Routes>
      </Router>
  )
}

export default App
