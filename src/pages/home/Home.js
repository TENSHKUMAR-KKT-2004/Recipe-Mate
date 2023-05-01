import { firestoreDB } from '../../firebase/config'

import './Home.css'
import RecipesList from '../../components/RecipesList'
import { useEffect, useState } from 'react'

const Home = () => {
    const [data, setData] = useState(null)
    const [isPending, setPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setPending(true)
        const unsub = firestoreDB.collection('recipes').onSnapshot((snapshot) => {
            if (snapshot.empty) {
                setError('No recipes to load')
                setPending(false)
            } else {
                let result = []
                snapshot.docs.forEach(doc => {
                    result.push({ id: doc.id, ...doc.data() })
                })
                setData(result)
                setPending(false)
            }
        }, (err => {
            setPending(false)
            setError(err.message)
        }))

        return () => unsub()
    }, [])

    return (<div className='home'>
        {isPending && <p className='loading'>Loading...</p>}
        {error && <p className='error'>{error}</p>}
        {data && <RecipesList recipes={data} />}
    </div>);
}

export default Home;