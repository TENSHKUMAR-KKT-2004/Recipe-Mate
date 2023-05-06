import { firestoreDB } from '../../firebase/config'

import './Home.css'
import RecipesList from '../../components/RecipesList'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

const Home = () => {
    const [data, setData] = useState(null)
    const [isPending, setPending] = useState(false)
    const [error, setError] = useState(null)
    const {user} = useAuthContext()

    useEffect(() => {
        setPending(true)
        const unsub = firestoreDB.collection('recipes').where('uid','==',user.uid).onSnapshot((snapshot) => {
            if (snapshot.empty) {
                setError('No recipes to load')
                setPending(false)
                setData(null)
            } else {
                let result = []
                snapshot.docs.forEach(doc => {
                    result.push({ id: doc.id, ...doc.data() })
                })
                setError(null)
                setData(result)
                setPending(false)
            }
        }, (err => {
            setPending(false)
            setError(err.message)
            setData(null)
        }))

        return () => unsub()
    }, [user.uid])

    return (<div className='home'>
        {isPending && <p className='loading'>Loading...</p>}
        {error && <p className='error'>{error}</p>}
        {data && <RecipesList recipes={data} />}
    </div>);
}

export default Home;