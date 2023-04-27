import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ThemeContextProvider } from './context/ThemeContext';

// styles
import './App.css';

// comp
import Navbar from './components/Navbar'

// pages
import Home from './pages/home/Home'
import Create from './pages/create/Create'
import Search from './pages/search/Search'
import Recipe from './pages/recipe/Recipe'
import ThemeSelector from './components/ThemeSelector';

function App() {
  return (
    <ThemeContextProvider>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <ThemeSelector />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/search" element={<Search />} />
            <Route path="/recipe/:id" element={<Recipe />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeContextProvider>
  );
}

export default App;
