
import { useState } from 'react';
import './Create.css'

const Create = () => {
    const [title,setTitle] = useState("")
    const [method,setMethod] = useState("")
    const [cookTime,setCookTime] = useState("")

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(title,method,cookTime)
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
            onChange={e=>setTitle(e.target.value)}
            value={title}
            required
            />
            <label>
                <span>Recipe Method:</span>
            </label>
            <textarea 
            type="text" 
            onChange={e=>setMethod(e.target.value)}
            value={method}
            required 
            />
            <label>
                <span>Cooking Time (minutes):</span>
            </label>
            <input 
            type="number" 
            onChange={e=>setCookTime(e.target.value)}
            value={cookTime}
            required 
            />
            <button className="btn">Submit</button>
        </form>

    </div> );
}
 
export default Create;