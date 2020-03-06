import React, {useState} from 'react';
import './App.css';
import Sandwich from './Sandwich.PNG';
import { Input } from 'antd';
import { Spin } from 'antd';
import { Card } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
const { Meta } = Card;
const { Search } = Input;

function App() {
  const [searchterm, setSearchterm] = useState('')
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [prevsearch, setprevSearch] = useState('')
  const [init, setInit] = useState(false)

  async function getRecipes(){
    setLoading(true)
    const appid = '3a01060f'
    const key='f79f9e9d2be96257577b0db96561c181'
    const from = 0
    const to = 10
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
    setprevSearch(searchterm)
    console.log(prevsearch)
    setSearchterm('')
    setLoading(false)
    console.log(recipes)
    setInit(true)

  }

    return (
      <div className="App">
        <header className="App-header">
          <div className="title-wrap">Recipe Search</div>
          <Tooltip title="search">
            <Button type="primary" shape="circle" icon={<StarOutlined />} />
          </Tooltip>
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

        <div className="body">
          <div className="loading-wrap">
            { loading && <Spin /> } 
          </div>
          {init && <div className="text-wrap">
            You searched for: <div style={{fontWeight: 'bold'}}>{prevsearch}</div>
            {console.log(prevsearch)}
          </div>}
          {!init && <div className="text-wrap">Start searching!</div>}
          <div className="results">
            {recipes.map((recipe, i)=> <Recipe key={i} {...recipe} />)}
          </div>
          {recipes.length===0 && init && <div className="text-wrap">Couldn't find any recipes...check your spelling and try again.</div>}
          <div className="image-wrap">
            <img src={Sandwich} alt="a sandwich"/> {/*if data showing, hide sandwich. no data. show sandwich*/}
          </div>
          <div className="text-wrap">
            Made with love by Leanne Liu in React | Copyright 2020
          </div>
        </div>
      </div>
    );
}

function Recipe(props){
  const imageurl = props.recipe.image //props accounts for recipe.hits already
  const source = props.recipe.url
  const label = props.recipe.label
  const webname = props.recipe.source
  return (
    <div className="recipe" onClick={()=>window.open(source, '_blank')}>
     {/* images.fixed_height. <-- also ok to take out below */}
      <Card
          hoverable
          style={{ width: 300 }}
          cover={<img alt="recipe photo" src= {imageurl} />}
        >
          <Meta title={label} description={webname} />
      </Card>
  </div>)
}

export default App;
