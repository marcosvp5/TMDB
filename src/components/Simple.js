import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
} from "@chakra-ui/react";
import { Icon } from '@chakra-ui/react'
import {StarIcon} from '@chakra-ui/icons'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Simple() {
  const params = useParams();
  const { id, type } = params;
  const [title, setTitle]= useState()
  const [overview, setOverview]= useState()
  const [date, setDate]= useState()
  const [lenguaje, setLenguaje]= useState()
  const [genres, setGenres]= useState()
  const [productioncompanies, setProduction_companies]= useState()
  const [imag ,setImag]= useState()


useEffect(async () => {
  const datos = await axios.post("http://localhost:3001/search/single",{id:id ,type:type})
  if (datos.data) {
    console.log(datos.data)
   setTitle(datos.data.title? datos.data.title : datos.data.name)
   setOverview(datos.data.overview)
   setDate(datos.data.release_date)
   setLenguaje(datos.data.original_language)
   setGenres(datos.data.genres)
   setProduction_companies(datos.data.production_companies)
   setImag(`https://image.tmdb.org/t/p/w300${datos.data.poster_path}`)
  }
}, []);

  return (
    <Container bgGradient="linear(to-l, #7928CA, #FF0080)" maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          
          <Image
            rounded={"md"}
            alt={"product image"}
            src={imag
            }
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box  textAlign={'end'} as={"header"}>
          <Heading
           
           lineHeight={1.1}
           fontWeight={600}
           fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
         > 
            <Icon  as={StarIcon} /> 
         </Heading>

          </Box>
          <Box as={"header"}>
            <Heading
           
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
            {title} 
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}
            >
             {date} <br/>
             {lenguaje === 'en' && 'language: English'}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              
              <Text fontSize={"lg"}>
              {overview}
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Categorías
              </Text>
          
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  {genres && genres.map(genre=>{
                    return<ListItem>{genre.name}</ListItem>
                  })}
                </List>
              </SimpleGrid>
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
               Producciones
              </Text>
              <List spacing={2}>
                {productioncompanies && productioncompanies.map(companie=>{
                  return  <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    {companie.name}
                  </Text>
                </ListItem>
                })}
               
              </List>
            </Box>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
