import React, {useState} from "react";
import { Image } from "@chakra-ui/react";

interface IProps {
  image1URL:string;
  image2URL:string
}

const DynamicImage:React.FC<IProps>= ({image1URL, image2URL}) => {


  const image1 = image1URL;
  const image2 = image2URL;

  const [image, setImage] = useState(image1);
  console.log(image)
  return (
    <Image
      src={image}
      onMouseEnter={() => setImage(image2)}
      onMouseOut={() => setImage(image1)}

    />
  );
};

export default DynamicImage;
