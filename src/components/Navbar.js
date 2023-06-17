import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  return (
    <div className="font-bold flex justify-around w-full bg-black text-white h-10 items-center">
      <NavLink to="/">Home</NavLink>

      {!cookies.access_token ? (
        <NavLink to="/auth">Login/Register</NavLink>
      ) : (
        <>
          <NavLink to="/create-recipe">Create Recipe</NavLink>
          <NavLink to="/saved-recipes">Saved Recipes</NavLink>
          <button onClick={logout}>LogOut</button>
        </>
      )}
    </div>
  );
};

export default Navbar;
