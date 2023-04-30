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
        firestoreDB.collection('recipes').get()
            .then((snapshot) => {
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
            })
                .catch(err=>{
                    setError(err.message)
                    setPending(false)
                })
    }, [])

    return (<div className='home'>
        {isPending && <p className='loading'>Loading...</p>}
        {error && <p className='error'>{error}</p>}
        {data && <RecipesList recipes={data} />}
    </div>);
}

export default Home;