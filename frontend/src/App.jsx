import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import './App.css'

function App() {
  return (
    <Routes>
      {/*Home page/landing page*/}
      <Route path='/' element={<Login />} />

      {/*Regular user dashboard page*/}
      <Route path='/dashboard' element={<Dashboard />} />

      {/*Admin (hr) user dashboard page*/}
      <Route path='/admin_dashboard' element={<AdminDashboard />} />

    </Routes>
  )
}

export default App
