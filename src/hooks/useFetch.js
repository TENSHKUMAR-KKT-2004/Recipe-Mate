import {useState,useEffect} from 'react'

export const useFetch = (url)=>{
    const [data,setData] = useState(null)
    const [isPending,setPending] = useState(false)
    const [error,setError] = useState(null)

    useEffect(()=>{
        const controller = new AbortController()
        
        const fetchData = async()=>{
            setPending(true)
            try{
                const res = await fetch(url,{signal : controller.signal})
                if(!res.ok){
                    throw new Error(res.statusText)
                }
                const data = await  res.json()
                
                setPending(false)
                setData(data)
                setError(null)
            }catch(err){
                if(err.name === 'AbortError'){
                    console.log('context fetch was aborted')
                }else{
                    setPending(false)
                    setError('could not fetch the data ')
                }
            }
        }
        fetchData()
        return ()=>{
            controller.abort()
        }
    },[url])
    return {data,error,isPending}
}