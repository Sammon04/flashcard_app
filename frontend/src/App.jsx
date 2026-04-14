import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import RequireAuth from './components/RequireAuth'
import './App.css'

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
