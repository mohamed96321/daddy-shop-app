import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  Icon,
  Text,
  useDisclosure,
  Button,
  Stack,
  useColorModeValue,
  useColorMode,
  IconButton
} from '@chakra-ui/react';
import { Link as RouterDomLink } from 'react-router-dom';
import {
  HamburgerIcon,
  CloseIcon,
  MoonIcon,
  SunIcon
} from '@chakra-ui/icons';
import { TbSquareRoundedLetterD } from 'react-icons/tb';

const links = [
  { linkName: 'Products', path: '/products' },
  { linkName: 'ShoppingCart', path: '/cart' }
];

const NavLink = ({ path, children }) => (
  <Link 
    as={RouterDomLink} 
    to={path} 
    px={1} 
    py={2} 
    rounded='md' 
    _hover={{ textDecoration: 'none', bg: useColorModeValue('gray.200', 'gray.700')}}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box 
      bg={useColorModeValue('gray.100', 'gray.900')} 
      px={4}
    >
      <Flex h={16} alignItems='center' justifyContent='space-between'>
        <IconButton 
          size='md' 
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />} 
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack>
          <Link as={RouterDomLink} to='/' _hover={{ textDecoration: 'none'}}>
            <Flex alignItems='center'>
              <Icon as={TbSquareRoundedLetterD} h={6} w={6} color='orange.400' />
              <Text fontWeight='extrabold' className='text'>Daddy</Text>
            </Flex>
          </Link>
          <HStack as='nav' spacing={4} display={{base: 'none', md: 'flex'}} m='5'>
            {links.map(link => (
              <NavLink key={link.linkName} path={link.path}>
                {link.linkName}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems='center'>
          <IconButton
            as="button"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            alignSelf="center"
            onClick={toggleColorMode}
          />
          <Button 
            as={RouterDomLink} 
            to='/login'
            p={2} 
            fontSize='sm'
            fontWeight={400}
            variant='link'
            _hover={{ textDecoration: 'none'}}
          >
            Sign In
          </Button>
          <Button 
            as={RouterDomLink} 
            to='/register'
            m={2} 
            display={{base: 'none', md: 'inline-flex'}}
            fontSize='sm'
            fontWeight={600}
            _hover={{ bg: 'orange.400'}}
            bg='orange.500'
            color='white'
          >
            Sign Up
          </Button>
        </Flex>
      </Flex>
      {isOpen ? <Box pb={4} display={{md: 'none'}}>
        <Stack as='nav' spacing={4}>
          {links.map((link) => (
            <NavLink key={link.linkName} path={link.path}>
              {link.linkName}
            </NavLink>
          ))}
          <NavLink key='sign up' path='register'>Sign Up</NavLink>
        </Stack>
      </Box> : null}
    </Box>
  );
};

export default Navbar
 