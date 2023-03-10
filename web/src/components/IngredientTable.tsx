import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Image,
} from "@chakra-ui/react";

interface IProps {
  ingredientInfo: any[];
}

const IngredientTable: React.FC<IProps> = ({ ingredientInfo }) => {
  const tableData = ingredientInfo.map((ingredient, index) => (
    <Tr key={index}>
      <Td>{ingredient.ingredient}</Td>
      <Td>{ingredient.quantity}</Td>
      <Td>
        <Image src={ingredient.thumb}></Image>
      </Td>
    </Tr>
  ));
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Ingredient Name</Th>
            <Th>Quantity</Th>
            <Th>Image</Th>
          </Tr>
        </Thead>
        <Tbody>{tableData}</Tbody>
      </Table>
    </TableContainer>
  );
};

export default IngredientTable;
