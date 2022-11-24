import { SimpleGrid, GridItem, Box, Link, } from "@chakra-ui/react";
import Card from "./Card";
import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";


function GridGeneral() {

const [media, setMedia]= useState([])
  const {type}= useParams()
  
  useEffect(()=>{
    axios.get(`http://localhost:3001/${type}`)
    .then(mediaDate=> mediaDate.data)
    .then(media=> setMedia(media))
  },[type])


  
  return (
  
        <Box p={3}>
          <SimpleGrid bgGradient='linear(to-r, rgba(51,47,83,1), pink.500)' spacing="30px" minChildWidth="300px">
         {media && media.map((media, i)=>{
           return <>
           
        <GridItem key={i}>
            <Card media={media} type={type}></Card>
          </GridItem>
           

           </>
         })}

          </SimpleGrid>
           
        </Box>

  );
}

export default GridGeneral;