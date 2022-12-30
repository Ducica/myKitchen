import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import { IRecipe } from "../types/types";
import Favourite from "./Favourite";

interface IProps {
    recipe: IRecipe
}

const OneRecipeSummary: React.FC<IProps> = ({recipe}) => {
    return (
        <Box position={'relative'}>
            <Favourite/>
            <Image src={recipe.strMealThumb} />
            <Text fontSize={20}   fontWeight={'bold'} align={'center'} mt={2}>{recipe.strMeal}</Text>
        </Box>
    );
};

export default OneRecipeSummary;
