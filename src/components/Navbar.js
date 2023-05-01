import {Link} from 'react-router-dom'

import './Navbar.css'
import SearchBar from './SearchBar.js';
import { useTheme } from '../hooks/useTheme';

const Navbar = () => {
    const {color} = useTheme()
    return ( 
        <div className="navbar" style={{background:color}}>
            <nav>
                <Link to='/' className='brand'><h1>Recipe-Mate</h1></Link>
                <SearchBar />
                <Link to='/create'>Create Recipe</Link>
                {/* <Link to='/login'>Login</Link>
                <Link to='/signup'>Signup</Link> */}
            </nav>
        </div>
     );
}
 
export default Navbar;