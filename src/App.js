import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom'

// styles
import './App.css';

// comp
import Navbar from './components/Navbar'
import ThemeSelector from './components/ThemeSelector';

// pages
import Home from './pages/home/Home'
import Create from './pages/create/Create'
import Search from './pages/search/Search'
import Recipe from './pages/recipe/Recipe'
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import ForgotPassword from './pages/forgot-password/forgot-password';

import { useTheme } from './hooks/useTheme';
import { useAuthContext } from './hooks/useAuthContext';
import ResetPassword from './pages/reset-password/reset-password';

function App() {
  const {mode} = useTheme()
  const {user,authIsReady} = useAuthContext()
  return (
      <div className={`App ${mode}`}>
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          {user && <ThemeSelector />}
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to='/login' /> } />
            <Route path="/create" element={user ? <Create /> : <Navigate to='/login' /> } />
            <Route path="/search" element={user ? <Search /> : <Navigate to='/login' />} />
            <Route path="/recipe/:id" element={user ? <Recipe /> : <Navigate to='/login' />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to='/'/>} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to='/'/>} />
            <Route path='/forgot-password' element={!user ? <ForgotPassword/> : <Navigate to='/'/> }/>
            <Route path='/reset-password' element={!user ? <ResetPassword/> : <Navigate to='/'/> }/>

          </Routes>
        </BrowserRouter>
      )}
      </div>
  );
}

export default App;
