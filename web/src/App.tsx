import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { IRecipe, IFilter } from "./types/types";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RecipesMainPage from "./components/RecipesMainPage";
import { Route, Routes } from "react-router-dom";
import Recipe from "./components/Recipe";
import MealSchedule from "./components/MealSchedule";

const theme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
})

interface IState {
  isLoading: boolean;
  recipes: IRecipe[];
  filters: IFilter;
  page: number;
}

const App = () => {
  const [state, setState] = useState<IState>({
    isLoading: false,
    recipes: [],
    filters: { Categories: [], Cousines: [] },
    page: 1,
  });

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
       const fetchData = async () => {
      const res = await axios.get("http://localhost:4000/recipes");
      setState((state)=>{return { ...state, recipes: res.data.data }});
    };
    fetchData()
  }, []);
  return (
    <ChakraProvider theme={theme}>
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
        <Route
          path="/meal-schedule"
          element={<MealSchedule recipes={state.recipes} />}
        />
      </Routes>
      <Footer />
    </ChakraProvider>
  );
};
export default App;
// axios
//   .get("http://localhost:4000/recipes")
//   .then((res) => setState({ ...state, recipes: res.data.data }));
