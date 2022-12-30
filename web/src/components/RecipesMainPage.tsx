import React from "react";
import { Flex, Grid, GridItem, Button, Box, Link } from "@chakra-ui/react";
import { IRecipe, IFilter } from "../types/types";
import OneRecipeSummary from "./OneRecipeSummary";
import Layout from "./Layout";
import DropDown from "./DropDown";
import { RECIPES_PER_PAGE } from "../constants/constants";
import { Link as RouterLink } from "react-router-dom";

interface IProps {
    recipes: IRecipe[];
    applyFilter: (menuName: string, filterName: string[]) => void;
    filters: IFilter;
    page: number;
    loadMoreRecipes: () => void;
}

const RecipesMainPage: React.FC<IProps> = ({
    recipes,
    applyFilter,
    filters,
    page,
    loadMoreRecipes,
}) => {
    const recipeCategories: string[] = Array.from(
        new Set(recipes?.map((recipe) => recipe.strCategory) as string[])
    );
    const recipeCousines: string[] = Array.from(
        new Set(recipes?.map((recipe) => recipe.strArea) as string[])
    );
    const shownRecipes =
        filters.Categories.length === 0 && filters.Cousines.length === 0
            ? recipes
            : recipes.filter((recipe: IRecipe) => {
                  if (
                      filters.Categories?.length > 0 &&
                      filters.Cousines.length > 0
                  ) {
                      return (
                          filters.Categories.includes(recipe.strCategory) &&
                          filters.Cousines.includes(recipe.strArea)
                      );
                  } else if (filters.Categories.length > 0) {
                      return filters.Categories.includes(recipe.strCategory);
                  } else if (filters.Cousines) {
                      return filters.Cousines.includes(recipe.strArea);
                  }
              });

    const mainPageRecipesArray = shownRecipes
        .slice(0, page * RECIPES_PER_PAGE)
        .map((recipe: IRecipe) => (
            <GridItem role={'group'} key={recipe.idMeal} w="100%" h="25%">
                <Link to={`/recipes/${recipe.idMeal}`} as={RouterLink}>
                    <OneRecipeSummary recipe={recipe} />{" "}
                </Link>
            </GridItem>
        ));
    const moreOrNoRecipes = () => {
        if (mainPageRecipesArray.length === 0) {
            return (
                <Box mb={5} mt={5} textAlign={"center"}>
                    No recipes for this selection. Please try different filters.
                </Box>
            );
        } else if (shownRecipes.length <= page * RECIPES_PER_PAGE) {
            return (
                <Box mb={5} mt={5} textAlign={"center"}>
                    No more recipes!
                </Box>
            );
        } else {
            return (
                <Box mb={5} textAlign={"center"}>
                    <Button size={"lg"} onClick={loadMoreRecipes}>
                        Show more recipes
                    </Button>
                </Box>
            );
        }
    };

    return (
        <Layout>
            <Flex>
                <Box w={"15%"}>
                    <DropDown
                        menuList={recipeCategories}
                        menuName={"Categories"}
                        applyFilter={applyFilter}
                    />
                    <DropDown
                        menuList={recipeCousines}
                        menuName={"Cousines"}
                        applyFilter={applyFilter}
                    />
                </Box >
                <Box w={"85%"} justifyContent={'center'} textAlign={'center'}>
                    <Grid
                        ml={5}
                        mr={5}
                        templateColumns="repeat(3, 1fr)"
                        gap={5}
                    >
                        {mainPageRecipesArray}
                    </Grid>
                    <Box mt ={5} textAlign={"center"}>{moreOrNoRecipes()}</Box>
                </Box>
            </Flex>
        </Layout>
    );
};

export default RecipesMainPage;
