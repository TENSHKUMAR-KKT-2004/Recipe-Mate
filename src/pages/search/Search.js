import {useSearchParams} from 'react-router-dom'
import {useFetch} from '../../hooks/useFetch'

import RecipesList from '../../components/RecipesList'

import './Search.css'

const Search = () => {
    const [queryString] = useSearchParams()
    const query = queryString.get('q')

    const url = 'http://localhost:3004/recipes?q='+query
    const {data:result,error,isPending} = useFetch(url)

    return ( <div>
        <h2 className="page-title">
            Recipes including "{query}"
        </h2>
        {error && <p className="error">{error}</p> }
        {isPending && <p className="loading">Loading...</p> }
        {result && <RecipesList recipes={result} /> }
    </div> );
}
 
export default Search;