import { Box, HStack, Text } from "@chakra-ui/react";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCartTotal from "../../hooks/useCartTotal";
import useGetUser from "../../hooks/useGetUser";
import SearchInput from "./SearchInput";
const jwtToken = localStorage.getItem("jwtToken");
const NavBar = () => {
  const { data: cartTotal } = useCartTotal(jwtToken || "");
  const { data: user } = useGetUser(jwtToken || "");

  return (
    <HStack spacing={{ base: 2, md: 4 }} px={{ base: 2, md: 10 }}>
      <Link to="/">
        <FaHome size="55" />
      </Link>
      <SearchInput />
      {user ? (
        <>
          <Link to="/cart">
            <Box position="relative" bottom="-20px">
              <FaShoppingCart size="50" />
              <Box
                h="30px"
                w="30px"
                bg="gray.700"
                borderRadius="30px"
                position="relative"
                right="-35px"
                top="-60px"
              >
                <Text
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  color="orange"
                  fontSize="20px"
                  fontWeight="semibold"
                >
                  {cartTotal?.cartItems ?? 0}
                </Text>
              </Box>
            </Box>
          </Link>
        </>
      ) : (
        <Link to="/login">
          <FaShoppingCart size="50" />
        </Link>
      )}
    </HStack>
  );
};

export default NavBar;
