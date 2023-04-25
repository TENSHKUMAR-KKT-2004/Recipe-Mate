import { useState } from 'react'
import {useFetch} from '../../hooks/useFetch'

import './Home.css'
import RecipesList from '../../components/RecipesList'

const Home = () => {
    const [url, setUrl] = useState('http://localhost:3004/recipes')
    const {data,error,isPending} = useFetch(url)
    return ( <div className='home'>
        {isPending && <p className='loading'>Loading...</p>}
        {error && <p className='error'>{error}</p> }
        { data && <RecipesList recipes={data} /> }
    </div> );
}
 
export default Home;