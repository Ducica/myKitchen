import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { IRecipe, IFilter } from "./types/types";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RecipesMainPage from "./components/RecipesMainPage";
import { Route,Routes } from "react-router-dom";
import Recipe from "./components/Recipe";

interface IState {
  isLoading: boolean;
  recipes: IRecipe[];
  filters: IFilter;
  page: number;
  favouritedRecipes: string[];
}

const App = () => {
  const [state, setState] = useState<IState>({
    isLoading: false,
    recipes: [],
    filters: { Categories: [], Cousines: [] },
    page: 1,
    favouritedRecipes: JSON.parse(localStorage.getItem("favourited"))
      ? JSON.parse(localStorage.getItem("favourited"))
      : [],
  });
  console.log(state.favouritedRecipes);
  const applyFilter = (menuName: string, filters: string[]) => {
    setState({
      ...state,
      filters: { ...state.filters, [menuName]: filters },
      page: 1,
    });
  };
  const loadMoreRecipes = () => {
    setState({ ...state, page: state.page + 1 });
  };



  useEffect(() => {
    axios
      .get("http://localhost:4000/recipes")
      .then((res) => setState({ ...state, recipes: res.data.data }));
  }, []);
  // View: the UI definition
  return (
    <ChakraProvider>
      <Header recipes={state.recipes} />
      <Routes>
        <Route
          path="/"
          element={
            <RecipesMainPage
              filters={state.filters}
              recipes={state.recipes}
              applyFilter={applyFilter}
              page={state.page}
              loadMoreRecipes={loadMoreRecipes}
            />
          }
        />
        <Route
          path="/recipes/:recipeId"
          element={<Recipe recipes={state.recipes} />}
        />
      </Routes>
      <Footer />
    </ChakraProvider>
  );
};
export default App;
