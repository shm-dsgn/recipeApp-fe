import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { useCookies } from "react-cookie";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]); // eslint-disable-next-line
  const [cookies, _] = useCookies(["access_token"]);
  const userID = useGetUserID();
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "https://recipeapp-api.onrender.com/recipes"
        );
        setIsLoaded(false);
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://recipeapp-api.onrender.com/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    if (cookies.access_token) {
      fetchSavedRecipes();
    }
  }, [userID, cookies.access_token, savedRecipes]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "https://recipeapp-api.onrender.com/recipes",
        {
          recipeID,
          userID,
        },
        { headers: { authorization: cookies.access_token } }
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) =>
    savedRecipes.some((recipe) => recipe._id === id);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-2xl my-2">Recipes</h1>
      {isLoaded ? <h1>Loading...</h1> : (
        <ul className="flex">
        {recipes.map((recipe) => {
          return (
            <li
              key={recipe._id}
              className="border border-black m-2 flex flex-col justify-start items-start rounded-md w-96"
            >
              <img src={recipe.imageUrl} alt={recipe.name} className= " rounded-md w-full aspect-video" />
              <div className="my-2 px-4">
                <h2 className="font-bold my-2 text-xl">{recipe.name}</h2>
                <button
                  onClick={() => saveRecipe(recipe._id)}
                  disabled={isRecipeSaved(recipe._id)}
                  className={
                    isRecipeSaved(recipe._id)
                      ? " border-2 text-white rounded-md px-4 py-2 bg-slate-600"
                      : " border-2 bg-black text-white rounded-md px-4 py-2"
                  }
                >
                  {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                </button>
              </div>
              <div className="font-bold my-2 px-4">
                Ingredients:
                {recipe.ingredients.map((ingredient, index) => (
                  <span key={index} className="font-normal mx-1">
                    {ingredient}
                  </span>
                ))}
              </div>
              <div className=" my-2 px-4">
                <p><span className="font-bold">Instructions</span>: {recipe.instructions}</p>
              </div>
              
              <p className=" my-2 px-4">
                <span className="font-bold">Cooking Time</span>: {recipe.cookingTime} minutes
              </p>
            </li>
          );
        })}
      </ul>
      )}
      
    </div>
  );
};

export default Home;
