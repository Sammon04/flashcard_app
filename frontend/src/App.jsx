import { Routes, Route } from 'react-router-dom';

import RequireAuth from './components/RequireAuth'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Play from './pages/Play'
import AdminDashboard from './pages/AdminDashboard'
import CreateUser from './pages/CreateUser';

import './App.css'
import './styles/header.css'
import './styles/login.css'
import './styles/dashboard.css'
import './styles/play.css'
import './styles/adminDashboard.css'
import EditUser from './pages/EditUser';

function App() {
  return (
    <Routes>
      {/*Home page/landing page*/}
      <Route path='/' element={<Login />} />

      {/*(Reg user) dashboard page*/}
      <Route path='/dashboard' element={
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
      } />

      {/*(Reg user) Play screen*/}
      <Route path='/play' element={
        <RequireAuth>
          <Play />
        </RequireAuth>
      } />

      {/*(Admin/HR) dashboard page*/}
      <Route path='/admin_dashboard' element={
        <RequireAuth adminOnly>
          <AdminDashboard />
        </RequireAuth>
      } />

      {/*(Admin/HR) create user page*/}
      <Route path='/create_user' element={
        <RequireAuth adminOnly>
          <CreateUser />
        </RequireAuth>
      } />

      {/*(Admin/HR) edit user page*/}
      <Route path='/edit_user/:id' element={
        <RequireAuth adminOnly>
          <EditUser />
        </RequireAuth>
      } />
    </Routes>
  )
}

export default App
