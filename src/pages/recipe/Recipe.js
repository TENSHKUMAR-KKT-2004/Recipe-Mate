import './Recipe.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { useEffect, useState, useRef } from 'react';

import { firestoreDB } from '../../firebase/config'

const Recipe = () => {
    const { id } = useParams()
    const { mode } = useTheme()

    const navigate = useNavigate()

    const ingredientInput = useRef(null)

    const [recipe, setRecipe] = useState(null)
    const [isPending, setPending] = useState(false)
    const [error, setError] = useState(null)
    const [isEditable, setEditable] = useState(false)
    const [isUpdatePending, setUpdatePending] = useState(false)
    const [title, setTitle] = useState("")
    const [method, setMethod] = useState("")
    const [cookTime, setCookTime] = useState("")
    const [newIngredient, setNewIngredient] = useState("")
    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        setPending(true)
        const unsub = firestoreDB.collection('recipes').doc(id).onSnapshot((doc) => {
            if (doc.exists) {
                setPending(false)
                setRecipe(doc.data())
            } else {
                setPending(false)
                setError('Could not find the recipe')
            }
        }, (err) => {
            setPending(false)
            setError(err.message)
        })
        return () => unsub()
    }, [id])

    const handleClick = () => {
        setEditable(!isEditable)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newDoc = { title, method, cookingTime: cookTime + ' minutes', ingredients }
        try {
            setUpdatePending(true)
            await firestoreDB.collection('recipes').doc(id).update(newDoc)
            navigate({ pathname: `/recipe/${id}` })
            setUpdatePending(false)
            setTitle('')
            setMethod('')
            setCookTime('')
            setNewIngredient('')
            setIngredients([])
            setEditable(false)
        } catch (err) {
            console.log(err.message)
        }
    }

    const handleIng = (e) => {
        e.preventDefault()
        const ing = newIngredient.trim()

        if (ing && !ingredients.includes(ing)) {
            setIngredients(prevIngs => [...prevIngs, ing])
        }
        setNewIngredient('')
        ingredientInput.current.focus()
    }

    return (<div className={`recipe ${mode}`}>
        {isPending && <p className='loading'>Loading...</p>}
        {error && <p className='error'>{error}</p>}
        {recipe && (
            <>
                <h2 className="page-title">{recipe.title}</h2>
                <p>Takes {recipe.cookingTime} to cook.</p>
                <ul>
                    {recipe.ingredients.map((ingredient) => (<li key={ingredient}>{ingredient}</li>))}
                </ul>
                <p className="method">{recipe.method}</p>
                <button className={`edit-button`} onClick={handleClick}>Edit Your Recipe</button>
            </>
        )}
        {isEditable && (
            <div className="update">
                <h2 className="page-title">Update Your Recipe</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        <span>Recipe Title:</span>
                    </label>
                    <input
                        type="text"
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                    <label>
                        <span>Recipe Method:</span>
                    </label>
                    <textarea
                        type="text"
                        onChange={e => setMethod(e.target.value)}
                        value={method}
                        required
                    />
                    <label>
                        <span>Recipe Ingredients:</span>
                    </label>
                    <div className="ingredients">
                        <input
                            type="text"
                            onChange={e => setNewIngredient(e.target.value)}
                            value={newIngredient}
                            ref={ingredientInput}
                        />
                        <button
                            className='btn'
                            onClick={handleIng}
                        >add</button>
                    </div>
                    <p>Current Ingredients: {ingredients.map(i => <em key={i}>{i}, </em>)}</p>
                    <label>
                        <span>Cooking Time (minutes):</span>
                    </label>
                    <input
                        type="number"
                        onChange={e => setCookTime(e.target.value)}
                        value={cookTime}
                        required
                    />
                    {isUpdatePending ? <button className="btn" disabled>Loading...</button> : <button className="btn">Submit</button>}
                </form>
            </div>
        )}
    </div>);
}

export default Recipe;