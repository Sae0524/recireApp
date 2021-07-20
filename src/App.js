import React,{useEffect, useState} from "react";
import Recipe from "./Recipe";
import './App.css';
import { AiOutlineSearch } from "react-icons/ai";

const App = () => {

  const APP_ID = "2ea39878";
  const APP_KEY = "6f58d953c487ee7c85f727e9c5cbb7e5";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

useEffect( () =>{
  getRecipes();
},[query]);

const getRecipes = async () => {
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`) 
  const data = await response.json();
  setRecipes(data.hits);
};

const updateSearch = e => {
  setSearch(e.target.value);
};

const getSearch = e => {
  e.preventDefault();
  setQuery(search)
  setSearch('');
}

  return(
    <div className="App">
      <h2>Seach for any recipe!!</h2>
      
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" 
        type = "text" 
        placeholder="Search recipe..."
        value={search}
        onChange={updateSearch}/>
        <button className="search-button" type="submit"><AiOutlineSearch/></button>
      </form>

      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}/>
      ))}
      </div>
    </div>
  )
}

export default App;
