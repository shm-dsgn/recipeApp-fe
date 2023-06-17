import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { useCookies } from "react-cookie";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]); // eslint-disable-next-line
  const [cookies, _] = useCookies(["access_token"]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    if(cookies.access_token)
    {
      fetchSavedRecipes();
    }
  }, [userID, cookies.access_token]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/recipes",
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
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => {
          return (
            <li
              key={recipe._id}
              className="border border-black my-2 flex flex-col justify-center items-center"
            >
              <div>
                <h2 className="font-bold my-2">{recipe.name}</h2>
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
              <div className=" my-2">
                Ingredients:
                {recipe.ingredients.map((ingredient, index) => (
                  <span key={index} className="mx-2">
                    {ingredient}
                  </span>
                ))}
              </div>
              <div className=" my-2">
                <p>Instructions: {recipe.instructions}</p>
              </div>
              <img src={recipe.imageUrl} alt={recipe.name} className="w-64" />
              <p className=" my-2">
                Cooking Time: {recipe.cookingTime} minutes
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
