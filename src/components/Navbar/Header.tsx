import {
  Box,
  Card,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { FaHome, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import useCartTotal from "../../hooks/useCartTotal";
import useGetUser from "../../hooks/useGetUser";
import ColorModeSwitch from "../ColorModeSwitch";
import SearchInput from "./SearchInput";

const Header = () => {
  const queryClient = useQueryClient();
  const jwtToken = localStorage.getItem("jwtToken") || "";
  const { data: user } = useGetUser(jwtToken);
  const { data: cartTotal } = useCartTotal(jwtToken);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    queryClient.setQueryData(["user"], null);
    navigate("/");
  };
  return (
    <Card height="110px">
      <Grid
        templateColumns="0.4fr 0.5fr 2fr 0.5fr 0.4fr"
        templateRows="1px 0.3fr 0.5fr"
        templateAreas={`
        "m m m m m"
    "asideLeft content1 content2 content3 asideRight"
    "asideLeft content4 content5 content6 asideRight"
`}
        alignItems="center"
        gridGap="10px"
      >
        <GridItem area="content3" display="flex" justifyContent="flex-end">
          <Box>
            <HStack spacing={5}>
              {user ? (
                <>
                  <Text
                    position="relative"
                    right="-15px"
                    fontSize="medium"
                  ></Text>
                  <Box>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<FaUserCircle size="30px" />}
                        variant="none"
                      />
                      <MenuList>
                        <MenuItem>{user.email}</MenuItem>
                        <MenuDivider />
                        <MenuItem>My Account</MenuItem>
                        <MenuItem>My Purchase</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </MenuList>
                    </Menu>
                  </Box>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Text _hover={{ textDecoration: "underline" }}>Login</Text>
                  </Link>
                  <Link to="/register">
                    <Text _hover={{ textDecoration: "underline" }}>
                      Register
                    </Text>
                  </Link>
                </>
              )}
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<RxHamburgerMenu size="30px" />}
                  variant="outline"
                />
                <MenuList>
                  <MenuItem>
                    <ColorModeSwitch />
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Box>
        </GridItem>
        <GridItem area="content4">
          <Link to="/">
            <Box display="flex" justifyContent="center">
              <FaHome size="40" />
            </Box>
          </Link>
        </GridItem>
        <GridItem area="content5">
          <SearchInput />
        </GridItem>
        <GridItem area="content6">
          {user ? (
            <>
              <Link to="/cart">
                <Box display="flex" justifyContent="center">
                  <FaShoppingCart size="40px" />
                  <Box
                    h="27px"
                    w="27px"
                    bg="gray.600"
                    borderRadius="30px"
                    position="relative"
                    top="-9px"
                    left="-12px"
                  >
                    <Text
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      color="orange"
                      fontSize="18px"
                      fontWeight="semibold"
                    >
                      {cartTotal?.cartItems ?? 0}
                    </Text>
                  </Box>
                </Box>
              </Link>
            </>
          ) : (
            ""
          )}
        </GridItem>
      </Grid>
    </Card>
  );
};

export default Header;
