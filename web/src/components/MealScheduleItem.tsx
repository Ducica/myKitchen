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
    Td,
    UnorderedList,
    useDisclosure,
    Text,
    Flex,
    Tooltip,
    Link,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IRecipe } from "../types/types";
import { CreatableSelect } from "chakra-react-select";
import { SearchIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";

interface IProps {
    day: string;
    meal: string;
    recipes: IRecipe[];
    schedule: {};
    addToSchedule: (id: string, meal: string, day: string) => void;
    removeFromSchedule: (meal: string, day: string) => void;
}

const MealScheduleItem: React.FC<IProps> = ({
    day,
    meal,
    recipes,
    schedule,
    addToSchedule,
    removeFromSchedule,
}) => {
    let recipe: IRecipe | undefined = undefined;
    if (schedule[meal][day]) {
        recipe = recipes.find(
            (recipe: IRecipe) => recipe.idMeal === schedule[meal][day]
        );
    }
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selected, setSelected] = useState(
        recipe
            ? {
                  value: recipe.idMeal,
                  label: recipe.strMeal,
              }
            : { value: "", label: "" }
    );
    const optionsList = recipes.map((recipe: IRecipe) => ({
        value: recipe.idMeal,
        label: recipe.strMeal,
    }));
    const handleChange = (selectedOption) => {
        setSelected(selectedOption);
    };


    return (
        <React.Fragment>
            <Flex justifyContent={"space-between"} textAlign={"center"}>
                <Box mr={1}>
                    <Tooltip
                        label={
                            recipe
                                ? "click to go to recipe's detail page"
                                : "click on magnifying glass to add a meal to schedule"
                        }
                    >
                        {recipe ? (
                            <Link
                                to={`/recipes/${recipe.idMeal}`}
                                as={RouterLink}
                            >
                                {recipe?.strMeal}
                            </Link>
                        ) : (
                            <Text>choose a meal</Text>
                        )}
                    </Tooltip>
                </Box>
                <Box>
                    <Box>
                        <SearchIcon onClick={onOpen} />
                    </Box>
                    <Box>
                        <Tooltip label={recipe ? "remove from schedule" : ""}>
                            <SmallCloseIcon
                                onClick={(e) => removeFromSchedule(meal, day)}
                            />
                        </Tooltip>
                    </Box>
                </Box>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bg={"none"} />
                <ModalContent height={500}>
                    <ModalHeader>Recipe finder</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody textAlign={"center"}>
                        <Box>
                            <CreatableSelect
                                value={selected}
                                onChange={handleChange}
                                options={optionsList}
                            />
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={(e) => {
                                addToSchedule(selected.value, meal, day);
                                onClose();
                            }}
                        >
                            Add to schedule
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </React.Fragment>
    );
};

export default MealScheduleItem;
