import React, { useState } from 'react';
import {
  Button,
  Flex,
  Heading,
  Text,
  Stack,
  useColorModeValue as mode,
  Badge,
} from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link as RouterDomLink, useHistory } from 'react-router-dom';

const CartOrderSummary = () => {
  const [buttonLoading, setButtonLoading] = useState();
  const standardShipping = Number(4.99).toFixed(2);
  const cartItems = useSelector((state) => state.cart);
  const { subtotal } = cartItems;
  const navigate = useHistory();

  const checkoutHandler = () => {
    setButtonLoading(true);
    navigate('/checkout');
  };

  return (
    <Stack
      spacing={'8'}
      borderWidth={'1px'}
      rounded={'lg'}
      padding={'8'}
      w={'full'}
    >
      <Heading size={'md'}>Order Summary</Heading>
      <Stack spacing={'6'}>
        <Flex justify={'space-between'}>
          <Text fontWeight={'medium'} color={mode('gray.600', 'gray.400')}>
            Subtotal
          </Text>
          <Text fontWeight={'medium'}>${subtotal}</Text>
        </Flex>
        <Flex justify={'space-between'}>
          <Text fontWeight={'medium'} color={mode('gray.600', 'gray.400')}>
            Shipping
          </Text>
          <Text fontWeight={'medium'}>
            {subtotal <= 1000 ? (
              '$' + standardShipping
            ) : (
              <Badge
                rounded={'full'}
                px={'2'}
                fontSize={'0.8em'}
                colorScheme="green"
              >
                Free
              </Badge>
            )}
          </Text>
        </Flex>
        <Flex justify={'space-between'}>
          <Text fontSize={'md'} fontWeight={'extrabold'}>Total</Text>
          ${subtotal <= 1000
            ? Number(subtotal) + Number(standardShipping)
            : subtotal}
        </Flex>
      </Stack>
      <Button
        as={RouterDomLink}
        to="/checkout"
        colorScheme="orange"
        size={'lg'}
        fontSize={'md'}
        rightIcon={<FaArrowRight />}
        isLoading={buttonLoading}
        onClick={() => checkoutHandler()}
      >
        Checkout
      </Button>
    </Stack>
  );
};

export default CartOrderSummary;
