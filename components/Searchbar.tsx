"use client"
import {FormEvent, useState} from 'react'
const isValidLink=(url:string)=>{
 try{
    const  parsedUrl=new URL(url);
    const hostname=parsedUrl.hostname;
    if(hostname.includes('amazon') || hostname.includes('flipkart') 
    ){
return true;}

}
catch(error){
return false;
}
return false;}
const Searchbar = () => {
    const [SearchPrompt,setSearchPrompt]=useState('');
   const [isLoading,setIsLoading]=useState(false);
    const handleSubmit=(event:FormEvent<HTMLFormElement>)=>{
     event.preventDefault();
     const isValidUrl=isValidLink(SearchPrompt);
       if(!isValidLink) return alert('Please provide a valid Amazon or Flipkart Link')
        try{
    setIsLoading(true);
    
    }
    catch(error)
    {
      console.log(error);
    }
    finally{
        setIsLoading(false);
    }
    }
  return (
     <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter Product Link" 
        value={SearchPrompt}
        onChange={(e)=>setSearchPrompt(e.target.value)}
        className='searchbar-input'/>
        <button type="submit" className='searchbar-btn' disabled={SearchPrompt===''}>{isLoading ? 'Searching...':'Search'}</button>
     </form>
  )
}

export default Searchbar
