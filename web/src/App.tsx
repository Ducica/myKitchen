import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { IRecipe, IFilter } from "./types/types";
import {
  ChakraProvider,
  extendTheme,
  Spinner,
  Box,
  Flex,
} from "@chakra-ui/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RecipesMainPage from "./components/RecipesMainPage";
import { Route, Routes } from "react-router-dom";
import Recipe from "./components/Recipe";
import MealSchedule from "./components/MealSchedule";
import { useFetch } from "./hooks/useFetch";
import PageNotExist from "./components/PageNotExist";

const theme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
});

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

  const { data, loading, error } = useFetch("http://localhost:4000/recipes");
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

  if (loading)
    return (
      <Box mt={200} textAlign={"center"}>
        <Spinner height={400} width={400} />
      </Box>
    );
  if (error) return <Box>{error}</Box>;

  if (data)
    return (
      <ChakraProvider theme={theme}>
        <Header recipes={data.data} />
        <Routes>
          <Route
            path="/"
            element={
              <RecipesMainPage
                filters={state.filters}
                recipes={data.data}
                applyFilter={applyFilter}
                page={state.page}
                loadMoreRecipes={loadMoreRecipes}
              />
            }
          />
          <Route
            path="/recipes/:recipeId"
            element={<Recipe recipes={data.data} />}
          />
          <Route
            path="/meal-schedule"
            element={<MealSchedule recipes={data.data} />}
          />
          <Route path="*" element={<PageNotExist />} />
        </Routes>
        <Footer />
      </ChakraProvider>
    );
};
export default App;
