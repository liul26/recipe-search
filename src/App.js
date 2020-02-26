import React, {useState} from 'react';
import './App.css';
import Sandwich from './Sandwich.PNG';
import { Input } from 'antd';
import { Spin } from 'antd';
import { Card } from 'antd';

const { Meta } = Card;
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
    setRecipes(body.hits)
    console.log(body)
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
          {/* <div className="text-wrap">Recipes with </div> */}
        </header>

        <div className="body">
          <div className="results">
            {/* {recipes.map((recipe, i)=> <Recipe key={i} {...recipe} />)} */}
            {recipes.map((recipe, i)=> <Recipe key={i} {...recipe} />)}
            {/* <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src= {Sandwich} />}
            >
              <Meta title="Recipe name here" description="From WebsiteName *Test card*" />
            </Card> */}
          </div>
          <div className="loading-wrap">
            { loading && <Spin /> } 
          </div>
          <div className="image-wrap">
            <img src={Sandwich} alt="a sandwich"/> {/*if data showing, hide sandwich. no data. show sandwich*/}
          </div>
        </div>
      </div>
    );
}

function Recipe(props){
  const imageurl = props.recipe.image //props accounts for recipe.hits already
  const source = props.recipe.url
  const label = props.recipe.label
  return (
    <div className="recipe" onClick={()=>window.open(source, '_blank')}>
     {/* images.fixed_height. <-- also ok to take out below */}
      <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="recipe photo" src= {imageurl} />}
        >
          <Meta title={label} description="From WebsiteName *Test card*" />
      </Card>
    {/* <img src={imageurl} alt="recipe" /> */}
    {/* <div className="recipe-title">{label}</div> */}
  </div>)
}

export default App;
