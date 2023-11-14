import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  TableContainer,
  Th,
  Tr,
  Table,
  Td,
  Thead,
  Tbody,
  Stack,
  Button,
  useDisclosure,
  Text,
  Alert,
  AlertDescription,
  AlertTitle,
  AlertIcon,
  Spinner,
  Wrap,
  useToast,
  Flex,
  Tooltip,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { TbTruckDelivery } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllOrders,
  deleteOrder,
  setDelivered,
  resetErrorAndRemoval,
} from 'redux/actions/adminActions';
import ConfirmRemovalAlert from './ConfirmRemovalAlert';

const OrdersTab = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [orderToDelete, setOrderToDelete] = useState('');
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const { error, loading, deliveredFlag, orders, orderRemoval } = admin;
  const toast = useToast();

  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(resetErrorAndRemoval());
    if (orderRemoval) {
      toast({
        description: 'Order has been removed',
        status: 'success',
        isClosable: true,
      });
    }
    if (deliveredFlag) {
      toast({
        description: 'Order has been set to delivered',
        status: 'success',
        isClosable: true,
      });
    }
  }, [orderRemoval, toast, dispatch, deliveredFlag]);

  const openDeleteConfirmBox = (order) => {
    setOrderToDelete(order);
    onOpen();
  };

  const onSetToDelivered = (order) => {
    dispatch(resetErrorAndRemoval());
    dispatch(setDelivered(order._id));
  };

  return (
    <Box>
      {error && (
        <Alert
          status="error"
          flexDirection={'column'}
          alignItems={'center'}
          textAlign={'center'}
          bg={'none'}
        >
          <AlertIcon />
          <AlertTitle>Ooops!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {loading ? (
        <Wrap justify={'center'}>
          <Stack direction={'row'} spacing={'4'}>
            <Spinner
              mt={'20'}
              thickness="2px"
              speed="0.65s"
              emptyColor="gray.200"
              color="orange.500"
              size={'xl'}
            />
          </Stack>
        </Wrap>
      ) : (
        <Box>
          <TableContainer>
            <Table variant={'simple'}>
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Name & Email</Th>
                  <Th>Shipping Infromation</Th>
                  <Th>Items Ordered</Th>
                  <Th>Payment Method</Th>
                  <Th>Total & Shipping Price</Th>
                  <Th>Delivery</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders &&
                  orders.map((order) => (
                    <Tr key={order._id}>
                      <Td>{new Date(order.createdAt).toDateString()}</Td>
                      <Td>
                        <Text><i>{order.username}</i></Text>
                        <Text><i>{order.email}</i></Text>
                      </Td>
                      <Td>
                        <Text>
                          <i>Address:</i> {order.shippingAddress.address}
                        </Text>
                        <Text>
                          <i>City:</i> {order.shippingAddress.postalCode}
                          , {order.shippingAddress.city}
                        </Text>
                        <Text>
                          <i>Country:</i> {order.shippingAddress.country}
                        </Text>
                      </Td>
                      <Td>
                        {order.orderItems.map((item) => (
                          <Text key={item._id}>
                            {item.qty} x {item.name}
                          </Text>
                        ))}
                      </Td>
                      <Td>{order.paymentMethod}</Td>
                      <Td>
                        <Text>
                          <i>Total: ${order.totalPrice}</i>
                        </Text> 
                        <Text>
                          <i>Shipping: ${order.shippingPrice}</i>
                        </Text>
                      </Td>
                      <Td>{order.isDelivered ? 'Done' : 'Pending'}</Td>
                      <Td>
                        <Flex direction={'column'}>
                          <Tooltip label='Delete Order'>
                            <Button
                              variant={'outline'}
                              colorScheme='red'
                              onClick={() => openDeleteConfirmBox(order)}
                            >
                              <DeleteIcon />
                            </Button>
                          </Tooltip>
                          {!order.isDelivered && (
                            <Tooltip label='Set Order is delivered'>
                              <Button
                                mt={'4px'}
                                variant={'outline'}
                                onClick={() => onSetToDelivered(order)}
                              >
                                <TbTruckDelivery />
                              </Button>
                            </Tooltip>
                          )}
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
          <ConfirmRemovalAlert
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            cancelRef={cancelRef}
            itemDelete={orderToDelete}
            deleteAction={deleteOrder}
          />
        </Box>
      )}
    </Box>
  );
};

export default OrdersTab;
