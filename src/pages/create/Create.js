import { firestoreDB } from '../../firebase/config';
import { useRef, useState } from 'react';
import './Create.css'
import { useNavigate } from 'react-router-dom';
import {useAuthContext} from '../../hooks/useAuthContext'

const Create = () => {
    const [title, setTitle] = useState("")
    const [method, setMethod] = useState("")
    const [cookTime, setCookTime] = useState("")
    const [newIngredient, setNewIngredient] = useState("")
    const [ingredients, setIngredients] = useState([])
    const [isPending, setPending] = useState(false)

    const {user} = useAuthContext()

    const navigate = useNavigate()

    const ingredientInput = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newDoc = { title, method, cookingTime: cookTime + ' minutes', ingredients,uid : user.uid }
        try {
            setPending(true)
            await firestoreDB.collection('recipes').add(newDoc)
            navigate({ pathname: '/' })
        } catch (err) {
            console.log(err.message)
        }
    }

    const handleClick = (e) => {
        e.preventDefault()
        const ing = newIngredient.trim()

        if (ing && !ingredients.includes(ing)) {
            setIngredients(prevIngs => [...prevIngs, ing])
        }
        setNewIngredient('')
        ingredientInput.current.focus()
    }

    return (
        <div className='create'>
            <h2 className="page-title">Add a new Recipe</h2>
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
                        onClick={handleClick}
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
                {isPending ? <button className="btn" disabled>Loading...</button> : <button className="btn">Submit</button>}
            </form>

        </div>);
}

export default Create;