import { Flex, Text, Box } from '@chakra-ui/react'
import React from 'react'

const Footer:React.FC = ()=>{
    return (<Box  w={'100%'} bottom={-20} position={'absolute'} ><Flex bg={'gray.300'} height={20} justifyContent={'space-between'} alignItems={'center'} >
        <Box ml={10}><Text>DAK</Text></Box>
        <Box mr={10}><Text>Dušan Stojanović INC</Text></Box>
    </Flex></Box>)
}

export default Footer
