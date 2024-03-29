import { Link, Outlet, useMatch } from "react-router-dom";
import { Box, HStack, Text } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

const Navbar = () => {
  const homeMatch = useMatch("/");
  const GamesMatch = useMatch("/Games");

  return (
    <>
      <HStack bg="orange" p="3" spacing="30">
        <Box p="3" bg="greenyellow">
          <Link to="/">
            <Text
                color={homeMatch ? "green.400" : "black"}
                fontWeight="bold"
                fontSize="24"
            >
              Home
            </Text>
          </Link>
        </Box>

        <Box>
          <Link to="/Games">
            <Text
                color={homeMatch ? "green.400" : "black"}
                fontWeight="bold"
                fontSize="24"
            >
              Counter
            </Text>
          </Link>
        </Box>
      </HStack>

      <Outlet />
    </>
  );
};

export default Navbar;
