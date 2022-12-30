import React, { useState } from "react";
import { Heading, Flex, Grid, GridItem, Button, Box } from "@chakra-ui/react";
import { IRecipe } from "../types/types";
import OneRecipeSummary from "./OneRecipeSummary";
import usePagination from "../hooks/usePagination";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
interface IProps {
    recipes: IRecipe[];
}

const CategorizedPage: React.FC<IProps> = ({ recipes }) => {
    const { category } = useParams();
    const pagination = usePagination();
    const categorizedRecipesArray = recipes
        .filter((recipe: IRecipe) => recipe.strCategory === category)
        .slice(0, pagination[0])
        .map((recipe: IRecipe) => (
            <GridItem key={recipe.idMeal} w="100%" h="25%">
                <OneRecipeSummary recipe={recipe} />
            </GridItem>
        ));
    console.log(pagination[0], categorizedRecipesArray.length);

    return (
        <Layout>
            <Grid ml={5} mr={5} templateColumns="repeat(3, 1fr)" gap={5}>
                {categorizedRecipesArray}
            </Grid>
            {pagination[0] >=
            recipes.filter((recipe: IRecipe) => recipe.strCategory === category)
                .length ? (
                <Box textAlign={"center"}>No more recipes!</Box>
            ) : (
                <Box textAlign={"center"}>
                    <Button size={"lg"} onClick={pagination[1]}>
                        Show more recipes
                    </Button>
                </Box>
            )}
        </Layout>
    );
};

export default CategorizedPage;
