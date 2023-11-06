import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  Image,
  Text,
  useDisclosure,
  Button,
  Stack,
  useColorModeValue,
  useColorMode,
  IconButton,
  useToast,
  Menu,
  Icon,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';
import { Link as RouterDomLink } from 'react-router-dom';
import {
  HamburgerIcon,
  CloseIcon,
  MoonIcon,
  SunIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons';
import daddyDark from '../images/daddyDarker.png';
import daddyLight from '../images/daddyLighter.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/userActions';
import { CgProfile } from 'react-icons/cg';
import { useHistory } from 'react-router-dom';
import { MdLogout, MdLocalShipping } from 'react-icons/md';
import { FiShoppingCart } from 'react-icons/fi';

const ShoppingCartIcon = () => {
  const cartInfo = useSelector((state) => state.cart);
  const { cart } = cartInfo;
  return (
    <Flex>
      <Text
        as={'sub'}
        fontSize={'sx'}
        color={'orange'}
        fontStyle={'italic'}
        fontWeight={'extrabold'}
      >
        {cart.length}
      </Text>
      <Icon as={FiShoppingCart} h="4" w="7" alignSelf={'center'} />
      Cart
    </Flex>
  );
};

const links = [
  { linkName: 'Products', path: '/products' },
  { linkName: <ShoppingCartIcon />, path: '/cart' },
];

const NavLink = ({ path, children }) => (
  <Link
    as={RouterDomLink}
    to={path}
    px={1}
    py={2}
    rounded="md"
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const dispatch = useDispatch();
  const history = useHistory();
  const toast = useToast();

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/products');
    toast({
      description: 'You have been logged out',
      status: 'success',
      isClosable: true,
    });
  };

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack>
          <Link as={RouterDomLink} to="/" _hover={{ textDecoration: 'none' }}>
            <Flex alignItems="center">
              <Image
                src={useColorModeValue(daddyLight, daddyDark)}
                alt="Daddy Logo"
                h={6}
                w={6}
              />
              <Text fontWeight="extrabold">Daddy</Text>
            </Flex>
          </Link>
          <HStack
            as="nav"
            spacing={4}
            display={{ base: 'none', md: 'flex' }}
            m="5"
          >
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                {link.linkName}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems="center">
          <IconButton
            as="button"
            bg={'0'}
            mr={'2px'}
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            alignSelf="center"
            onClick={toggleColorMode}
          />

          {userInfo ? (
            <>
              <Menu>
                <MenuButton
                  px={'4'}
                  py={'2'}
                  transition={'all 0.3s'}
                  as={Button}
                >
                  {userInfo.name} <ChevronDownIcon />
                </MenuButton>
                <MenuList>
                  <MenuItem as={RouterDomLink} to="/profile">
                    <CgProfile />
                    <Text ml={'2'}>Profile</Text>
                  </MenuItem>
                  <MenuItem as={RouterDomLink} to="/your-orders">
                    <MdLocalShipping />
                    <Text ml={'2'}>Your Orders</Text>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={logoutHandler}>
                    <MdLogout />
                    <Text ml={'2'}>Logout</Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <>
              <Button
                as={RouterDomLink}
                to="/login"
                p={2}
                fontSize="sm"
                fontWeight={400}
                variant="link"
                _hover={{ textDecoration: 'none' }}
              >
                Sign In
              </Button>
              <Button
                as={RouterDomLink}
                to="/signup"
                m={2}
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize="sm"
                fontWeight={600}
                _hover={{ bg: 'orange.400' }}
                bg="orange.500"
                color="white"
              >
                Sign Up
              </Button>
            </>
          )}
        </Flex>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                {link.linkName}
              </NavLink>
            ))}
            {!userInfo && (
              <NavLink key="sign up" path="signup">
                Sign Up
              </NavLink>
            )}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
