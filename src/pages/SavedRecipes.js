import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://recipeapp-api.onrender.com/recipes/savedRecipes/${userID}`
        );
        setIsLoaded(false);
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, [userID]);
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-2xl my-2">Saved Recipes</h1>
      {isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <ul className="flex">
          {savedRecipes.map((recipe) => {
            return (
              <li
                key={recipe._id}
                className="border border-black m-2 flex flex-col justify-start items-start rounded-md w-96"
              >
                <img
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  className=" rounded-md w-full aspect-video"
                />
                <div className="my-2 px-4">
                  <h2 className="font-bold my-2 text-xl">{recipe.name}</h2>
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
                  <p>
                    <span className="font-bold">Instructions</span>:{" "}
                    {recipe.instructions}
                  </p>
                </div>

                <p className=" my-2 px-4">
                  <span className="font-bold">Cooking Time</span>:{" "}
                  {recipe.cookingTime} minutes
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SavedRecipes;
