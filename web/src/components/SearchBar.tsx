import React, { useState } from "react";
import {
    Box,
    Button,
    Input,
    ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    UnorderedList,
    useDisclosure,
} from "@chakra-ui/react";
import { IRecipe } from "../types/types";
import { Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

interface IProps {
    recipes: IRecipe[];
}

const SearchBar: React.FC<IProps> = ({ recipes }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
     const onModalClose=()=>{
        setSearchTerm('')
        onClose()
    }
    const [searchTerm, setSearchTerm] = useState("");
    const optionsList = recipes
        .filter((recipe: IRecipe) =>
            recipe.strMeal
                .toLowerCase()
                .includes(searchTerm.toLocaleLowerCase())
        )
        .map((recipe: IRecipe) => (
            <ListItem
                _hover={{ backgroundColor: "gray.100",  }}
                listStyleType={"none"}
                onClick={() => {setSearchTerm(""); onClose()}}
                key={recipe.idMeal}

                border={'solid'}
                minH={8}
             mt={2}
                borderRadius={5}


            >
                <Link display={'block'} to={`/recipes/${recipe.idMeal}`} as={RouterLink}>
                    {recipe.strMeal}
                </Link>
            </ListItem>
        ));
    return (
        <Box textAlign={'center'}>
            <Input
                width={350}
                placeholder={"Look for recipes"}
                type={"text"}
                value={searchTerm}
                name="search"
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                }}
                onClick={onOpen}
            />

            <Modal isOpen={isOpen} onClose={onModalClose}>
                <ModalOverlay />
                <ModalContent height={500}>
                    <ModalHeader>Recipe finder</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody textAlign={'center'}>
                        <Box>
                            <Input
                            ml={-4}
                                textAlign={'center'}
                                width={350}
                                placeholder={"Look for recipes"}
                                type={"text"}
                                value={searchTerm}
                                name="search"
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                }}
                            />
                            {searchTerm && searchTerm.length > 1 && (
                                <UnorderedList
                                width={350}

                                    height={200}
                                    overflow={"auto"}


                                >
                                    {optionsList}
                                </UnorderedList>
                            )}
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default SearchBar;
