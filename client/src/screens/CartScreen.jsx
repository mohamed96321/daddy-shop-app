import React, { useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  Spinner,
  Alert,
  AlertTitle,
  AlertIcon,
  AlertDescription,
  Wrap,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { Link as RouterDomLink } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { useSelector } from 'react-redux';
import CartOrderSummary from '../components/CartOrderSummary';

const CartScreen = () => {
  const cartInfo = useSelector((state) => state.cart);
  const { loading, error, cart } = cartInfo;

  const getHeadingContent = () => (cart.length === 1 ? '(1 Item)' : `(${cart.length} Items)`)

  useEffect(() => {
    document.title = 'Shopping Cart | Daddy';

    return () => {
      document.title = 'Daddy';
    };
  }, [])

  return (
    <Wrap spacing="30px" justify="center" minHeight="100vh">
      {loading ? (
        <Stack direction={'row'} spacing={4}>
          <Spinner
            mt={20}
            thickness="2px"
            speed="0.65s"
            emptyColor="gray.200"
            color="orange.500"
            size={'xl'}
          />
        </Stack>
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Ooops!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : cart.length <= 0 ? (
        <Alert status="warning">
          <AlertIcon />
          <AlertTitle>Your cart is empty!</AlertTitle>
          <AlertDescription>
            <Link as={RouterDomLink} to="/products">
              Click here to see our product.
            </Link>
          </AlertDescription>
        </Alert>
      ) : (
        <Box
          maxW={{ base: '3xl', lg: '7xl' }}
          mx={'auto'}
          px={{ base: '4', md: '8', lg: '12' }}
          py={{ base: '6', md: '8', lg: '12' }}
        >
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            align={{ lg: 'flex-start' }}
            spacing={{ base: '8', md: '16' }}
          >
            <Stack spacing={{ base: '8', md: '10' }} flex={'2'}>
              <Heading fontSize={'2xl'} fontWeight={'extrabold'}>
                Shopping Cart {getHeadingContent()}
              </Heading>
              <Stack spacing={'6'}>
                {cart.map((cartItem) => (
                  <CartItem key={cartItem.id} cartItem={cartItem}/>
                ))}
              </Stack>
            </Stack>
            <Flex direction={'column'} align={'center'} flex={'1'}>
              <CartOrderSummary />
              <HStack mt={'6'} fontWeight={'semibold'}>
                <p className='text'>Or</p>
                <Link
                  as={RouterDomLink}
                  to="/products"
                  color={mode('orange.500', 'orange.200')}
                  _hover={{textDecoration: 'none'}}
                >
                  Continue Shopping
                </Link>
              </HStack>
            </Flex>
          </Stack>
        </Box>
      )}
    </Wrap>
  );
};

export default CartScreen;
