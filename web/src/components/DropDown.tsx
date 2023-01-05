import {
    useDisclosure,
    MenuItem,
    Menu,
    MenuButton,
    MenuList,
    Checkbox,
    useCheckboxGroup,
    CloseButton,
    Flex,
    Tooltip,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import React from "react";

interface IProps {
    menuList: string[];
    menuName: string;
    applyFilter: (menuName: string, filterName: string[]) => void;
}

const DropDown: React.FC<IProps> = ({ menuList, menuName, applyFilter }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {getCheckboxProps, setValue } = useCheckboxGroup({
        onChange: (selectedValues: (string | number)[]) => {
            const checkBoxState = selectedValues as string[];
            applyFilter(menuName, checkBoxState);
        },
    });

    return (
        <Flex justifyContent={"center"} alignItems={"center"}>
            <Menu isOpen={isOpen}>
                <MenuButton
                    // variant="ghost"
                    mx={1}
                    py={[1, 2, 2]}
                    px={4}
                    borderRadius={5}
                    _hover={{ bg: "beige" }}
                    aria-label="Courses"
                    fontWeight="normal"
                    onMouseEnter={ onOpen}
                    onMouseLeave={onClose}
                >
                    {menuName}{" "}
                    {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </MenuButton>
                <MenuList
                    borderColor={"beige"}
                    bg={"beige"}
                    onMouseEnter={onOpen}
                    onMouseLeave={onClose}
                >
                    {menuList.map((menuItem, index) => (
                        <MenuItem key={index} bg={"beige"}>
                            <Checkbox
                                name={menuItem}
                                {...getCheckboxProps({ value: menuItem })}
                            >
                                {menuItem}
                            </Checkbox>
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
            <Tooltip label={`Clear ${menuName} filter`}>
                <CloseButton onClick={() => setValue([])}></CloseButton>
            </Tooltip>
        </Flex>
    );
};
export default DropDown;

