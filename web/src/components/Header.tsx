import React from "react";
import { Heading, Flex, Text} from "@chakra-ui/react";
import { IRecipe } from "../types/types";
import { SearchIcon } from "@chakra-ui/icons";
import SearchBar from "./SearchBar";
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
            <Heading pl={10} height={20} pt={3}>
                <Text>Dušan's amazing kitchen</Text>
            </Heading>
            <Flex alignItems={"center"} justifyContent ={'space-between'}>
            <SearchBar recipes={recipes}/>
            <SearchIcon ml={5} mr={10} />
            </Flex>
        </Flex>
    );
};

export default Header;
