import React from "react";
import { StarIcon } from "@chakra-ui/icons";
import { Box, Tooltip } from "@chakra-ui/react";

const Favourite: React.FC = () => {
    return (
        <Tooltip label="Add to favourites">
            <Box
                _groupHover={{ display: "block" }}
                display={"none"}
                position={"absolute"}
                top={0}
                right={2}
            >
                <StarIcon />
            </Box>
        </Tooltip>
    );
};

export default Favourite;
