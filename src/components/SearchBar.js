import { useState } from 'react';
import {useNavigate} from 'react-router-dom'

import './Searchbar.css'

const SearchBar = () => {
    const [term, setTerm] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e)=>{
        e.preventDefault()
        navigate(
            {pathname:'/search',
            search:`?q=${term}`})
            setTerm('')
    }

    return (
        <div className="searchbar">
            <form onSubmit={handleSubmit}>
                <label htmlFor="search">Search:</label>
                <input
                    type="text"
                    id='search'
                    onChange={(e) => setTerm(e.target.value)}
                    value={term}
                    required
                />
            </form>
        </div>
    );
}

export default SearchBar;