import {useFetch} from '../../hooks/useFetch'

import './Home.css'
import RecipesList from '../../components/RecipesList'

const Home = () => {
    const {data,error,isPending} = useFetch("http://localhost:3004/recipes")
    return ( <div className='home'>
        { isPending && <p className='loading'>Loading...</p> }
        { error && <p className='error'>{error}</p>  }
        { data && <RecipesList recipes={data} /> }
    </div> );
}
 
export default Home;