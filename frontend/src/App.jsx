import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import './App.css'

function App() {
  return (
    <Routes>
      {/*Home page/landing page*/}
      <Route path="/" element={<Login />} />

      {/*Other pages (routes)
      Sample route for simple links like getting to the flashcard game screen or something:
      <Route path="/game_page" element={<Game />} />
      and Game is another file inside /pages similar to Login.jsx
      and to actually get to that new page through the website,
      import {Link} from 'react-router-dom' and do <Link to="/game_page">Play Game</Link> 
      (instead of <a href=...>) wherever you add a simple link to a new page
      */}

      {/*For more complicated routes (like logging in which has to go through the backend first):
      We would first make the <Route path="/admin_dashboard" element={<AdminDashboard />} /> right here like my example above.
      Then, in the component (like login page component), we'd do 'const nav = useNavigate()' then connect to php backend and then
      'nav('/admin_dashboard')' after seeing a success. useNavigate() is provided by react-router-dom.
      We 
      */}

    </Routes>
  )
}

export default App
