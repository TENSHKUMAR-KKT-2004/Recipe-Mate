import {Link} from 'react-router-dom'

import './Navbar.css'
import SearchBar from './SearchBar.js';

const Navbar = () => {
    return ( 
        <div className="navbar">
            <nav>
                <Link to='/' className='brand'><h1>Recipe-Mate</h1></Link>
                <SearchBar />
                <Link to='/create'>Create Recipe</Link>
            </nav>
        </div>
     );
}
 
export default Navbar;