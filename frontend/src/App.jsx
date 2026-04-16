import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Play from './pages/Play'
import AdminDashboard from './pages/AdminDashboard'
import RequireAuth from './components/RequireAuth'

import './App.css'
import './styles/header.css'
import './styles/login.css'
import './styles/dashboard.css'
import './styles/play.css'
import './styles/adminDashboard.css'

function App() {
  return (
    <Routes>
      {/*Home page/landing page*/}
      <Route path='/' element={<Login />} />

      {/*Regular user dashboard page*/}
      <Route path='/dashboard' element={
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
      } />

      {/*Play screen for regular users*/}
      <Route path='/play' element={
        <RequireAuth>
          <Play />
        </RequireAuth>
      } />

      {/*Admin (hr) dashboard page*/}
      <Route path='/admin_dashboard' element={
        <RequireAuth adminOnly>
          <AdminDashboard />
        </RequireAuth>
      } />

    </Routes>
  )
}

export default App
