import { useState } from 'react'
import './App.css'
import axios from 'axios';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY



function App() {

  const [cat, setCat] = useState({id: 'sfol', name:'Scottish Fold', origin: 'United Kingdom'});
  const [catImage, setCatImage] = useState('https://cdn2.thecatapi.com/images/f8FUsjdUw.jpg');
  const [banList, setBanList] = useState([]);
  const [response, setResponse] = useState(null);

  const catId = cat.id;
  const catName = cat.name;
  const catOrigin = cat.origin;
  
  
  const catCSS = {
    width: '500px',
    height: '500px',  
  }


  
  const handleOnClickID = () => {
    const newBanList = [...banList];
    newBanList.push(cat.id);
    setBanList(newBanList);
  };

  const handleOnClickName = () => {
    const newBanList = [...banList];
    newBanList.push(cat.name);
    setBanList(newBanList);
  };

  const handleOnClickOrigin = () => {
    const newBanList = [...banList];
    newBanList.push(cat.origin);
    setBanList(newBanList);
  };


  

  const handleOnDiscoverClick = () => {
    axios.get(`https://api.thecatapi.com/v1/images/search?has_breeds=1&api_key=${ACCESS_KEY}`)
      .then((response) => {setResponse(response);})
      .then(() => setCatImage(response.data[0].url))
      .then(() => setCat(response.data[0].breeds[0]));
 
  };
  

  return (
    <div>
      <h1>Veni Vici!</h1>
      <h3>Discover cats from your wildest dreams!</h3>
      
      <div>
        <button onClick={handleOnClickID}>ID: {catId}</button>  
        <button onClick={handleOnClickName}>Name: {catName}</button>
        <button onClick={handleOnClickOrigin}>Origin: {catOrigin}</button>
      </div>
      <div>
        <img style={catCSS} src= {catImage}/>
      </div>
      
        
      
      <button onClick={handleOnDiscoverClick}>Discover</button>
      <div className='ban-list'>{banList.toString()}</div>

    </div>
  )
}

export default App


