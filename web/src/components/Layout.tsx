import React from 'react'
import {Box} from '@chakra-ui/react'

interface IProps {
    children:React.ReactNode
    width?:string
}
const Layout:React.FC<IProps>=({children, width="100%"})=>{
    return <Box minHeight={1200} width={width} bg={'beige'} pt={5} pl={10} pr={10}>{children}</Box>
}

export default Layout
