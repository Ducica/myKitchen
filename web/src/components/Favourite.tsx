import React, { useState } from "react";
import { StarIcon } from "@chakra-ui/icons";
import { Box, Tooltip } from "@chakra-ui/react";

interface IProps {
    recipeId: string;
}
const Favourite: React.FC<IProps> = ({ recipeId }) => {
    const [storageItem, setStorageItem] = useState(() =>
        JSON.parse(localStorage.getItem("favourites") || "[]")
    );

    const isFavourited = storageItem.includes(recipeId);

    const handleToggleFavourite = () => {
        if (!isFavourited) {
            const newStorageItem = [...storageItem, recipeId];
            setStorageItem(newStorageItem);
            localStorage.setItem("favourites", JSON.stringify(newStorageItem));
        } else {
            const newStorageItem = storageItem.filter(
                (savedId) => savedId !== recipeId
            );
            setStorageItem(newStorageItem);
            localStorage.setItem("favourites", JSON.stringify(newStorageItem));
        }
    };
    return (
        <Tooltip
            label={
                isFavourited ? "Remove from favourites" : "Add to favourites"
            }
        >
            <Box
                onClick={(e) => {
                    e.preventDefault();
                    handleToggleFavourite();
                }}
                _groupHover={{ display: "block" }}
                display={"none"}
                position={"absolute"}
                top={0}
                right={2}
            >
                <StarIcon color={isFavourited ? "gold" : "black"} />
            </Box>
        </Tooltip>
    );
};

export default Favourite;
