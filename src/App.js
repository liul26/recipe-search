import React, {useState} from 'react';
import './App.css';
import { Input } from 'antd';
import { Spin } from 'antd';
import Sandwich from './Sandwich.PNG';

const { Search } = Input;

function App() {
  const [searchterm, setSearchterm] = useState('')
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  
  async function getRecipes(){
    setLoading(true)
    const appid = '3a01060f'
    const key='f79f9e9d2be96257577b0db96561c181'
    const from = 0
    const to = 5
    let url = 'https://api.edamam.com/search?'
    url += 'q=' + searchterm
    url += '&app_id=' + appid
    url += '&app_key='+ key
    url += '&from=' + from
    url += '&to=' + to
    // https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free
    console.log(url)
    const r = await fetch(url)
    const body = await r.json()
    setRecipes(body.data)
    setSearchterm('')
    setLoading(false)
    console.log(recipes)
  }



    return (
      <div className="App">
        <header className="App-header">
          <div className="title-wrap">Recipe Search</div>
          <div className="input-wrap">
            <Search
              placeholder="Add your ingredients here..."
              enterButton="Search"
              size="large"
              value={searchterm} /*IMPORTANT*/
              onChange={e=> setSearchterm(e.target.value)} /*IMPORTANT*/
              onKeyPress={e=> {if(e.key==='Enter') getRecipes()}}
              onSearch={value => console.log(value)}
            />
          </div>
        </header>

        <div className="recipesResults">
          {recipes.map((recipe, i)=> <Recipe key={i} {...recipe} />)}
          <div className="loading-wrap">
            { <Spin /> } 
            {/* loading &&  */}
          </div>
          <img src={Sandwich} alt="a sandwich" className="image-wrap"/> {/*if data showing, hide sandwich. no data. show sandwich*/}
        </div>
      </div>
    );
}

function Recipe(props){
  const imageurl = props.hits.recipe.image
  const label = props.hits.recipe.label
  return (
    <div className="recipe" onClick={()=>window.open(imageurl, '_blank')}>
     {/* images.fixed_height. <-- also ok to take out below */}
    <img src={imageurl} alt="recipe" />
    <div className="recipe-title">{label}</div>
  </div>)
}

export default App;
