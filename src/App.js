import React, {useState} from 'react';
import './App.css';
import Sandwich from './Sandwich.PNG';
import { Input } from 'antd';
import { Spin } from 'antd';
import { Card } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
const { Meta } = Card;
const { Search } = Input;
 
function App() {
  const [searchterm, setSearchterm] = useState('')
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [prevsearch, setprevSearch] = useState('')
  const [init, setInit] = useState(false)
  const [myfaves, setMyFaves] = useState([])
  const [showfaves, setShowFaves] = useState(false)
 
  function getFaved () {
    if (showfaves === false) {
      let faves = []
      if (localStorage && localStorage.getItem('faved')) {
        faves = JSON.parse(localStorage.getItem('faved'))
      }
      setMyFaves(faves)
      setShowFaves(true)
    } else {
      setShowFaves(false);
      setMyFaves([]);
    }
    //add show no show toggle here?
  }

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
          <div className="input-wrap">
            <Search
              placeholder="Add your ingredients here..."
              enterButton="Search"
              size="large"
              value={searchterm} /*IMPORTANT*/
              onChange={e=> setSearchterm(e.target.value)} /*IMPORTANT*/
              // onKeyPress={e=> {if(e.key==='Enter') getRecipes()}}
              // onClick={e=> getRecipes()}
              onSearch={value => console.log(value)}
              onSearch={getRecipes}
            />
          </div>
          <div>
            <Tooltip title="favorite">
                <Button
                  type="primary"
                  onClick={getFaved}
                >
                  Show favorite recipes
                </Button>
            </Tooltip>
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
          {showfaves &&
            <div className="favorites">
              {myfaves.map((recipe, i)=> {console.log(recipe); return <Recipe key={`favorite-${i}`} recipe={recipe} faved={true} />})}
            </div>
          }
          {!showfaves && <div className="text-wrap"></div>}
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
 console.log(props)
 const imageurl = props.recipe.image //props accounts for recipe.hits already
 const source = props.recipe.url
 const label = props.recipe.label
 const webname = props.recipe.source
 const [isFaved, setIsFaved] = useState(props.faved ? props.faved : false);
 
 //have a function that saves faves to localstorage
 function favorite(e) {
   e.stopPropagation();
   let favoriteRecipes = []
   if (localStorage && localStorage.getItem('faved')) {
     favoriteRecipes = JSON.parse(localStorage.getItem('faved'))
   }
   let existing=favoriteRecipes.filter(x=>x.url===props.recipe.url)
   if (existing.length <= 0) {
     favoriteRecipes.push(props.recipe)
     setIsFaved(true);
   } else {
     let index = favoriteRecipes.findIndex(x=>x.url===props.recipe.url)
     favoriteRecipes.splice(index, 1)
     setIsFaved(false);
   }
   localStorage.setItem('faved', JSON.stringify(favoriteRecipes))
 }
 
 return (
   <div className="recipe">
    {/* images.fixed_height. <-- also ok to take out below */}
     <Card
         hoverable
         style={{ width: 300 }}
         cover={<img alt="recipe photo" src= {imageurl} />}
         onClick={()=>window.open(source, '_blank')}
     >
     <Meta title={label} description={webname} />
     <Tooltip title="Favorite this recipe">
       <Button
         icon={isFaved ? <StarFilled /> : <StarOutlined />}
         onClick={favorite}
         style={{ marginTop: 20 }}
         // Moved this into favorite
         // onClick={e=>e.stopPropagation()}
       >Add to favorites</Button>
     </Tooltip>
     </Card>
 </div>)
}
 
export default App;