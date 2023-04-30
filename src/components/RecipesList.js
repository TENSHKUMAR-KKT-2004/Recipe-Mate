import { Link } from 'react-router-dom';
import './RecipesList.css'
import { useTheme } from '../hooks/useTheme';
import {firestoreDB} from '../firebase/config'

import Trashcan from '../assets/delete_icon.svg'

const RecipesList = ({ recipes }) => {
    const {mode} = useTheme()
    
    if (recipes.length === 0){
        return <div className='error'>No Recipes to Load...</div>
    }

    const handleClick = (id)=>{
        firestoreDB.collection('recipes').doc(id).delete()
    }

    return (
        <div className="recipe-list">
            {
                recipes.map((recipe) => (
                    <div key={recipe.id} className={`card ${mode}`}>
                        <h3>{recipe.title}</h3>
                        <p>{recipe.cookingTime} to make.</p>
                        <div>{recipe.method.substring(0,100)}...</div>
                        <Link to={`/recipe/${recipe.id}`}>Cook this</Link>
                        <img 
                        className='delete'
                        src={Trashcan} 
                        alt="delete-icon" 
                        onClick={()=>{handleClick(recipe.id)}}
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default RecipesList;