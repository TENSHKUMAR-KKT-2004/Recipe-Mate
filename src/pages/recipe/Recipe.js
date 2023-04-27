import './Recipe.css'
import { useFetch } from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

const Recipe = () => {
    const {id} = useParams()
    const {data:recipe,error,isPending} = useFetch("http://localhost:3004/recipes/"+id)
    const {mode} = useTheme()
    return ( <div className={`recipe ${mode}`}>
        { isPending && <p className='loading'>Loading...</p> }
        { error && <p className='error'>{error}</p>  }
        { recipe && (
            <>
                <h2 className="page-title">{recipe.title}</h2>
                <p>Takes {recipe.cookingTime} to cook.</p>
                <ul>
                    {recipe.ingredients.map((ingredient)=>(<li key={ingredient}>{ingredient}</li>))}
                </ul>
                <p className="method">{recipe.method}</p>
            </>
        )}
    </div> );
}
 
export default Recipe;