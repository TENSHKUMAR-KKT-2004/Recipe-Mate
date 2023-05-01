import { Link } from 'react-router-dom'

import './Navbar.css'
import SearchBar from './SearchBar.js';
import { useTheme } from '../hooks/useTheme';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
    const { color } = useTheme()
    const { logout } = useLogout()
    const { user } = useAuthContext()
    return (
        <div className="navbar" style={{ background: color }}>
            <nav>
                <Link to='/' className='brand'><h1>Recipe-Mate</h1></Link>
                {!user && <><Link to='/login'>Login</Link>
                <Link to='/signup'>Signup</Link></>}

                {user && <>
                    <SearchBar />
                    <Link to='/create'>Create Recipe</Link>
                    <Link onClick={() => {logout()}} to='/login'>Logout</Link>
                </>}

            </nav>
        </div>
    );
}

export default Navbar;