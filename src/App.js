import { BrowserRouter, Routes, Route } from 'react-router-dom'

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

import { useTheme } from './hooks/useTheme';

function App() {
  const {mode} = useTheme()
  return (
      <div className={`App ${mode}`}>
        <BrowserRouter>
          <Navbar />
          <ThemeSelector />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/search" element={<Search />} />
            <Route path="/recipe/:id" element={<Recipe />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
