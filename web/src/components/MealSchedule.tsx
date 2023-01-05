import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { IRecipe } from "../types/types";
import Layout from "./Layout";
import { Link as RouterLink } from "react-router-dom";
import MealScheduleTable from "./MealScheduleTable";

interface IProps {
    recipes: IRecipe[];
}

const MealSchedule: React.FC<IProps> = ({ recipes }) => {
    return (
        <Layout>
            <Flex textAlign={"center"} justifyContent={"center"}>
                <Text fontSize={30} fontWeight={"bold"}>
                    Meal Schedule
                </Text>
            </Flex>
            <Box mt={"5"} textAlign={"center"}>
                <Text>
                    Tired of always thinking what you will cook at the last
                    moment? You can create your meal schedule and have
                    everything nicely setup for you in advance!
                </Text>
            </Box>
            <MealScheduleTable recipes={recipes} />

        </Layout>
    );
};

export default MealSchedule;
