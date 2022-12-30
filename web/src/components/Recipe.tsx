import {
    Box,
    Flex,
    Heading,
    Image,
    Text,

} from "@chakra-ui/react";
import React from "react";
import { IRecipe } from "../types/types";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import IngredientTable from "./IngredientTable";
interface IProps {
    recipes: IRecipe[];
}

const getIngredientData = (recipe: IRecipe) => {
    const ingredientsArray = [];
    for (let i = 1; i < 21; i++) {
        let arrayItem: { [key: string]: string } = {};
        let ingredientName = `strIngredient${i}`;
        let ingredientQuantity = `strMeasure${i}`;

        // arrayItem[recipe[ingredientName as keyof IRecipe] ] = recipe[ingredientQuantity as keyof IRecipe]
        arrayItem.ingredient = recipe[ingredientName as keyof IRecipe];
        arrayItem.quantity = recipe[ingredientQuantity as keyof IRecipe];
        arrayItem.thumb = `https://www.themealdb.com/images/ingredients/${arrayItem.ingredient}-small.png`;
        if (arrayItem.ingredient && arrayItem.quantity) {
            ingredientsArray.push(arrayItem);
        }
    }
    return ingredientsArray;
};

const Recipe: React.FC<IProps> = ({ recipes }) => {
    const { recipeId } = useParams();
    const recipe: IRecipe | undefined = recipes.find(
        (recipe: IRecipe) => recipe.idMeal === recipeId
    );

    if (recipe === undefined)
        return <Layout>That recipe does not exist</Layout>;
    const ingredientData = getIngredientData(recipe);

    return (
        <Layout>
            <Box>
                <Heading textAlign={"center"}>{recipe.strMeal}</Heading>
            </Box>
            <Flex mt={5} justifyContent={"center"}>
                <Image src={recipe.strMealThumb} />
            </Flex>
            <Box mt={5} fontWeight={"bold"} textAlign={"center"}>
                <Text fontSize={30}>Ingredients</Text>
            </Box>
            <Flex justifyContent={"center"}>
                <IngredientTable ingredientInfo={ingredientData} />
            </Flex>
            <Box mt={5} textAlign={"center"} fontWeight={"bold"}><Text fontSize={30}>Instructions</Text></Box>
            <Flex pl={60} pr={60} pb={15} justifyContent={'center'} ><Text>{recipe.strInstructions}</Text></Flex>
        </Layout>
    );
};

export default Recipe;
