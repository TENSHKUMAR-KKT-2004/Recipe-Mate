import { useSearchParams } from 'react-router-dom'
import { firestoreDB } from '../../firebase/config'
import RecipesList from '../../components/RecipesList'

import './Search.css'
import { useEffect,useState } from 'react'

const Search = () => {
    const [queryString] = useSearchParams()
    const searchTerm = queryString.get('q')

    const [result, setResult] = useState([]);
    const [isPending, setPending] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setPending(true)

        let query = firestoreDB.collection('recipes')
        if (searchTerm) {
            // split the search term into individual words
            const searchTerms = searchTerm.split(' ');

            // construct a query for each individual word in the search term
            searchTerms.forEach(term => {
                query = query.where('title', '>=', term).where('title', '<=', term + '\uf8ff');
            })
        }
        query.get()
            .then((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
                setResult(data)
                setPending(false)
            })
            .catch((err) => {
                setError(err.message)
                setPending(false)
            })

    }, [searchTerm])

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