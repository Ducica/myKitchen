import React from "react";
import { Heading, Flex, Text, Link } from "@chakra-ui/react";
import { IRecipe } from "../types/types";
import { SearchIcon } from "@chakra-ui/icons";
import SearchBar from "./SearchBar";
import { Link as RouterLink } from "react-router-dom";

interface IProps {
    recipes: IRecipe[] | undefined;
}

const Header: React.FC<IProps> = ({ recipes }) => {
    return (
        <Flex
            w={"100%"}
            bg={"blue.300"}
            alignItems={"center"}
            justifyContent={"space-between"}
        >
            {" "}
            <Link _hover={{ textDecoration: "none" }} to="/" as={RouterLink}>
                <Heading pl={10} minHeight={20} p={3}>
                    <Text>Dušan's amazing kitchen</Text>
                </Heading>
            </Link>
            <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Link
                    _hover={{ textDecoration: "none" }}
                    m={5}
                    to="/meal-schedule"
                    as={RouterLink}
                >
                    Meal Schedule
                </Link>
                <SearchBar recipes={recipes} />
                <SearchIcon ml={5} mr={10} />
            </Flex>
        </Flex>
    );
};

export default Header;
