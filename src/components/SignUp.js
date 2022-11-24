import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate= useNavigate()
  const onSubmit = async (dataSingnUp) => {
   
const register= await axios.post('http://localhost:3001/register', dataSingnUp)

   await axios.post('http://localhost:3001/login', {email: dataSingnUp.email,
  password: dataSingnUp.password})
  .then((res)=> localStorage.setItem('user',`${res.data.firstName} ${res.data.lastName}`))
   .then(()=>navigate('/') )


  };



  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("white")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"} color={"pink.400"}>
            Registrarse
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
        
          <Stack spacing={4}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input {...register("firstName")} type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input {...register("lastName")} type="text" />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input {...register('email')}type="email"/>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Contraseña</FormLabel>
              <InputGroup>
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                type="submit"
                loadingText="Submitting"
                size="lg"
                bg={"pink.400"}
                color={"white"}
                _hover={{
                  bg: "pink.300",
                }}
              >
                Registrarse
              </Button>
            </Stack>
            </form>

            <Stack pt={6}>
              <Text color={'pink.400'}align={"center"}>
                Ya es usuario? Loguearse
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
