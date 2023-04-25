import { useState } from 'react'
import {useFetch} from '../../hooks/useFetch'

import './Home.css'

const Home = () => {
    const [url, setUrl] = useState('http://localhost:3004/recipes')
    const {data,error,isPending} = useFetch(url)
    return ( <div className='home'>
        {error && <p className='error'>{error}</p> }
        {isLoading && <p className='loading'>Loading...</p>}
        {data && data.map((recipe)=>(
            <h2 key={recipe.id}>{recipe.title}</h2>
        ))}
    </div> );
}
 
export default Home;