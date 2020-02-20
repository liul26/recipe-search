import React, {useState} from 'react';
import './App.css';
import { Input } from 'antd';
import { Spin } from 'antd';
import Sandwich from './Sandwich.PNG';

const { Search } = Input;

function App() {
  const [text, setText] = useState('')
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  
  async function getRecipes(){
    setLoading(true)
    const key='AitgzNZBJNonm2fIFf7fc6EsGIuRfS0a'
    let url = 'https://api.giphy.com/v1/gifs/search?'
    url += 'api_key=' + key
    url += '&q=' + text + '&limit=50&offset=0&rating=G&lang=en'
    const r = await fetch(url)
    const body = await r.json()
    setRecipes(body.data)
    setText('')
    setLoading(false)
  }

  console.log(recipes)

    return (
      <div className="App">
        <header className="App-header">
          <div className="title-wrap">Recipe Search</div>
          <div className="input-wrap">
            <Search
              placeholder="Add your ingredients here..."
              enterButton="Search"
              size="large"
              onSearch={value => console.log(value)}
            />
          </div>
        </header>
        <div className="recipes">
          {/* {recipes.map((recipe, i)=> <Recipe key={i} {...recipe} />)} */}
          <div className="loading-wrap">
            <Spin />
          </div>
          <img src={Sandwich} alt="a sandwich"/>
        </div>
      </div>
    );
}

export default App;
