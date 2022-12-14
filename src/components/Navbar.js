import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Menu,
  MenuList,
  MenuButton,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Link as Linked } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function WithSubnavigation() {
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();
  const user = localStorage.getItem("user");
  const logOut = () => {
    axios
      .post("http://localhost:3001/login/logout")
      .then(() => localStorage.removeItem("user"))
      .then(() => navigate("/"));
  };
  return (
    <Box>
      <Flex
        bg={"rgba(51,47,83,1) 100%"}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            fontSize={"lg"}
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={"pink.400"}
          >
            <Linked to="/">
              <strong>The Movie Database</strong>
            </Linked>
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
        <Stack
          flex={{ base: 1, md: 50 }}
          justify={{ base: "center", md: "center" }}
          direction={"row"}
          spacing={6}
        >
          <Linked to='/media/movies'>
          <Button
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bgGradient="linear(to-r, rgba(51,47,83,1), pink.500)"
            href={"#"}
            _hover={{
              bg: "pink.300",
            }}
          >
            Movies
          </Button>
          </Linked>
          <Linked to='/media/tv'>
          <Button
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bgGradient="linear(to-r, rgba(51,47,83,1), pink.500)"
            href={"#"}
            _hover={{
              bg: "pink.300",
            }}
          >
            TV
          </Button>
          </Linked>
        </Stack>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
            color={"pink.400"}
            as={"a"}
            fontSize={"lg"}
            fontWeight={400}
            variant={"link"}
            href={"#"}
          >
            <Linked to="/">GitHub</Linked>
          </Button>

          {user ? (
            <>
              <Menu>
                <MenuButton
                  as={Button}
                  bg={"pink.400"}
                  color={"white"}
                  _active={{
                    bg: "pink.300",
                  }}
                  _hover={{
                    bg: "pink.300",
                  }}
                >
                  <strong>{user}</strong>
                </MenuButton>
                <MenuList
                  fontFamily={"arial"}
                  bg={"pink.400"}
                  color={"white"}
                  textAlign={"center"}
                >
                  <Button
                    onClick={logOut}
                    bg={"pink.400"}
                    _hover={{
                      bg: "pink.300",
                    }}
                    _active={{
                      bg: "pink.300",
                    }}
                    color={"white"}
                    textAlign={"center"}
                  >
                    <strong>Desloguearse</strong>
                  </Button>
                </MenuList>
              </Menu>
            </>
          ) : (
            <>
              <Button
                as={"b"}
                color={"pink.400"}
                fontSize={"lg"}
                fontWeight={400}
                variant={"link"}
                href={"#"}
              >
                <Linked to="/signin">Loguearse</Linked>
              </Button>
              <Button
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bgGradient="linear(to-r, pink.500 , rgba(51,47,83,1))"
                href={"#"}
                _hover={{
                  bg: "pink.300",
                }}
              >
                <Linked to="/signup">Registrarse</Linked>
              </Button>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return <Stack direction={"row"} spacing={4}></Stack>;
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    ></Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
