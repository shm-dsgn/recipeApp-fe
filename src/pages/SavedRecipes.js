import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://recipeapp-api.onrender.com/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, [userID]);
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li
          key={recipe._id}
          className="border border-black my-2 flex flex-col justify-center items-center"
        >
          <div>
            <h2 className="font-bold my-2">{recipe.name}</h2>
          
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
        ))}
      </ul>
    </div>
  );
};

export default SavedRecipes;