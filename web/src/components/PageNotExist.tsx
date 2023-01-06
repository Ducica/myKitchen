import { Flex, Text, Spinner, Box, Image, Link } from "@chakra-ui/react";
import React from "react";
import Layout from "./Layout";
import OneRecipeSummary from "./OneRecipeSummary";
import { useFetch } from "../hooks/useFetch";
import { Link as RouterLink } from "react-router-dom";

const PageNotExist: React.FC = () => {
    const RandomRecipe: React.FC = () => {
        const { data, loading, error } = useFetch(
            "https://www.themealdb.com/api/json/v1/1/random.php"
        );
        if (loading) return <Spinner />;
        if (error) return <Text>There was an error</Text>;
        if (data)
            return (
                <Box
                    alignItems={"center "}
                    justifyContent={"center"}
                    mt={10}
                    maxW={400}
                    maxH={500}
                >
                    {" "}
                    <Link
                        to={`/recipes/${data.meals[0].idMeal}`}
                        as={RouterLink}
                    >
                        <Image src={data.meals[0].strMealThumb} />
                        <Text
                            fontSize={20}
                            fontWeight={"bold"}
                            align={"center"}
                            mt={2}
                        >
                            {data.meals[0].strMeal}
                        </Text>
                    </Link>
                </Box>
            );
    };

    return (
        <Layout>
            <Flex textAlign={"center"} justifyContent={"center"}>
                <Text fontSize={20} fontWeight={"bold"}>
                    Sorry, that page does not exist, maybe you would be
                    interested to check out this recipe:
                </Text>
            </Flex>
            <Flex mt={25} alignItems={"center"} justifyContent={"center"}>
                <RandomRecipe />
            </Flex>
        </Layout>
    );
};

export default PageNotExist;
