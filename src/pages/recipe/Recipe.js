import './Recipe.css'
import { useParams } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { useEffect,useState } from 'react';

import {firestoreDB} from '../../firebase/config'

const Recipe = () => {
    const {id} = useParams()
    const {mode} = useTheme()

    const [recipe, setRecipe] = useState(null)
    const [isPending, setPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect(()=>{
        setPending(true)
        firestoreDB.collection('recipes').doc(id).get()
            .then((doc)=>{
                if(doc.exists){
                    setPending(false)
                setRecipe(doc.data())
                }else{
                    setPending(false)
                    setError('Could not find the recipe')
                }
            })
                .catch(err=>{
                    setPending(false)
                    setError(err.message)
                })
    },[id])

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