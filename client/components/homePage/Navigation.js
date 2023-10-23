// "use client";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useAuth } from "../context/auth-context";
import { useRouter } from "next/router";

// const Links = ["Dashboard", "Projects", "Team"];

const NavLink = (props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

export default function Navigation() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { authState, setAuthState } = useAuth();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Link href="/">
                <img
                  src="/assets/logos/Bright_boost_transparent.png"
                  style={{ height: "5rem" }}
                />
              </Link>
            </Box>
            {/* <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack> */}
          </HStack>
          {authState.isAuth ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <p>
                Welcome
                <span style={{ fontWeight: "700", marginLeft: "5px" }}>
                  {authState.userInfo}
                </span>{" "}
              </p>
              <button
                onClick={() => {
                  localStorage.clear();
                  setAuthState({});
                  router.push("/");
                }}
                style={{
                  border: "1px solid black",
                  marginLeft: "10px",
                  padding: "2px",
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Flex alignItems={"center"}>
              <Link href="/adminLogin">
                <Button
                  variant="outline"
                  m={4}
                  style={{ color: "#603813", border: "1px solid #ED8936" }}
                >
                  Admin Login
                </Button>
              </Link>
              <Link href="/teacherLogin">
                <Button
                  variant="outline"
                  m={4}
                  style={{ color: "#603813", border: "1px solid #ED8936" }}
                >
                  Teacher Login
                </Button>
              </Link>
              <Link href="/studentLogin">
                <Button
                  variant="outline"
                  m={4}
                  style={{ color: "#603813", border: "1px solid #ED8936" }}
                >
                  Student Login
                </Button>
              </Link>
              {/* <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu> */}
            </Flex>
          )}
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
