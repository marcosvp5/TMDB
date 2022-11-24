import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SimpleCard() {
  const navigate=useNavigate()
  const onSubmit = (dataSingnIn) => {
     axios.post("http://localhost:3001/login", dataSingnIn)
     .then(res=> res.data)
     .then(user => localStorage.setItem('user',`${user.firstName} ${user.lastName}`))
     .then(()=> navigate('/'))
  };
  const { register, handleSubmit } = useForm();

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("white")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Ingrese a su cuenta</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(onSubmit)}>

            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input {...register('email')}type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input {...register('password')} type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Button
              type="submit"
                bg={"pink.400"}
                color={"white"}
                _hover={{
                  bg: "pink.300",
                }}
              >
                Ingresar
              </Button >
            </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
