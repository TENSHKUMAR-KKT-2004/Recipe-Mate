import { useSearchParams } from 'react-router-dom'
import { firestoreDB } from '../../firebase/config'
import RecipesList from '../../components/RecipesList'

import './Search.css'
import { useEffect,useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

const Search = () => {
    const [queryString] = useSearchParams()
    const searchTerm = queryString.get('q')

    const [result, setResult] = useState([]);
    const [isPending, setPending] = useState(false);
    const [error, setError] = useState(null);
    const {user} = useAuthContext()

    useEffect( () => {
        setPending(true)

        let query = firestoreDB.collection('recipes')
        if (searchTerm) {
            console.log(searchTerm)
            query = query.where('title', '>=', searchTerm).where('title', '<=', searchTerm + '\uf8ff')
        }
        query.onSnapshot((querySnapshot) => {
                let data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
                data = data.filter((recipe) => recipe.uid === user.uid)
                setResult(data)
                setPending(false)
            },(err)=>{
                setError(err.message)
                setPending(false)
            })
    }, [searchTerm, user.uid])

    return (<div>
        <h2 className="page-title">
            Recipes including "{searchTerm}"
        </h2>
        {error && <p className="error">{error}</p>}
        {isPending && <p className="loading">Loading...</p>}
        {result && <RecipesList recipes={result} />}
    </div>)
}

export default Search;