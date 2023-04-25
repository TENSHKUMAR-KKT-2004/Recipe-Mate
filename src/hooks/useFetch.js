import {useState,useEffect} from 'react'
import { RouterProvider } from 'react-router-dom'

export const useFetch = (url)=>{
    const [data,setData] = useState(null)
    const [isPending,setPending] = useState(null)
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
                setError(null)
                setData(data)
            }catch(error){
                if(error.name === 'AbordError'){
                    console.log('context fetch was aborted')
                }else{
                    setPending(false)
                    console.log('could not fetch the data ')
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