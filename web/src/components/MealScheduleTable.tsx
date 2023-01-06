import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IRecipe } from "../types/types";
import MealScheduleItem from "./MealScheduleItem";

interface ISchedule {
    Breakfast: {
        Monday: string;
        Tuesday: string;
        Wednesday: string;
        Thursday: string;
        Friday: string;
        Saturday: string;
        Sunday: string;
    };
    Lunch: {
        Monday: string;
        Tuesday: string;
        Wednesday: string;
        Thursday: string;
        Friday: string;
        Saturday: string;
        Sunday: string;
    };
    Dinner: {
        Monday: string;
        Tuesday: string;
        Wednesday: string;
        Thursday: string;
        Friday: string;
        Saturday: string;
        Sunday: string;
    };
}

interface IProps {
    recipes: IRecipe[];
}

const MealScheduleTable: React.FC<IProps> = ({ recipes }) => {
    const daysArray = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];
    const mealsArray = ["Breakfast", "Lunch", "Dinner"];

    const [schedule, setSchedule] = useState<ISchedule>(() =>
        JSON.parse(
            localStorage.getItem("schedule") ||
                '{"Breakfast": {},"Lunch": {},"Dinner": {}}'
        )
    );

    const addToSchedule = (id: string, meal: string, day: string) => {
        setSchedule({ ...schedule, [meal]: { ...schedule[meal], [day]: id } });
        localStorage.setItem(
            "schedule",
            JSON.stringify({
                ...schedule,
                [meal]: { ...schedule[meal], [day]: id },
            })
        );
    };
    const removeFromSchedule = (meal: string, day: string) => {
        setSchedule({ ...schedule, [meal]: { ...schedule[meal], [day]: "" } });
        localStorage.setItem(
            "schedule",
            JSON.stringify({
                ...schedule,
                [meal]: { ...schedule[meal], [day]: "" },
            })
        );
    };
    const clearSchedule = () => {
        setSchedule({
            Breakfast: {
                Monday: "",
                Tuesday: "",
                Wednesday: "",
                Thursday: "",
                Friday: "",
                Saturday: "",
                Sunday: "",
            },
            Lunch: {
                Monday: "",
                Tuesday: "",
                Wednesday: "",
                Thursday: "",
                Friday: "",
                Saturday: "",
                Sunday: "",
            },
            Dinner: {
                Monday: "",
                Tuesday: "",
                Wednesday: "",
                Thursday: "",
                Friday: "",
                Saturday: "",
                Sunday: "",
            },
        });
        localStorage.removeItem("schedule");
    };

    const tableData = mealsArray.map((meal: string, index: number) => (
        <Tr minHeight={200} key={index}>
            <Td>{meal}</Td>
            {daysArray.map((day: string, index: number) => (
                <Td key={index}>
                    <MealScheduleItem
                        addToSchedule={addToSchedule}
                        day={day}
                        meal={meal}
                        schedule={schedule}
                        recipes={recipes}
                        removeFromSchedule={removeFromSchedule}
                    />
                </Td>
            ))}
        </Tr>
    ));
    return (
        <Box mt={20}>
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Meal</Th>
                            <Th>Monday</Th>
                            <Th>Tuesday</Th>
                            <Th>Wednesday</Th>
                            <Th>Thursday</Th>
                            <Th>Friday</Th>
                            <Th>Saturday</Th>
                            <Th>Sunday</Th>
                        </Tr>
                    </Thead>
                    <Tbody>{tableData}</Tbody>
                </Table>
            </TableContainer>
            <Box textAlign={"center"}>
                <Button mt={20} onClick={() => clearSchedule()}>
                    Clear entire schedule
                </Button>
            </Box>
        </Box>
    );
};

export default MealScheduleTable;
