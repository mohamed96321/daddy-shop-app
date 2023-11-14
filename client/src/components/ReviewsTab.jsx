import React, { useEffect } from 'react';
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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Spacer,
  Textarea,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteIcon } from '@chakra-ui/icons';
import { removeReview } from 'redux/actions/adminActions';
import { getProducts, resetProductError } from 'redux/actions/productActions';

const ReviewsTab = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const { error, loading } = admin;
  const productInfo = useSelector((state) => state.products);
  const { products, reviewRemoval } = productInfo;
  const toast = useToast();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(resetProductError());
    if (reviewRemoval) {
      toast({
        description: 'Review has been removed',
        status: 'success',
        isClosable: true,
      });
    }
  }, [reviewRemoval, toast, dispatch]);

  const onRemoveReview = (productId, reviewId) => {
    dispatch(removeReview(productId, reviewId));
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
          {products.length > 0 &&
            products.map((product) => (
              <Box key={product._id}>
                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex={'1'}>
                          <Flex>
                            <Text mr={'8px'} fontWeight={'bold'}>
                              {product.name}
                            </Text>
                            <Spacer />
                            <Text mr={'8px'} fontWeight={'bold'}>
                              ({product.reviews.length} Reviews)
                            </Text>
                          </Flex>
                        </Box>
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={'4'}>
                      <TableContainer>
                        <Table size={'sm'}>
                          <Thead>
                            <Tr>
                              <Th>Username</Th>
                              <Th>Rating</Th>
                              <Th>Title</Th>
                              <Th>Comment</Th>
                              <Th>Created</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {product.reviews.map((review) => (
                              <Tr key={review._id}>
                                <Td>{review.name}</Td>
                                <Td>{review.rating}</Td>
                                <Td>{review.title}</Td>
                                <Td>
                                  <Textarea
                                    value={review.comment}
                                    size={'sm'}
                                  />
                                </Td>
                                <Td>
                                  {new Date(review.createdAt).toDateString()}
                                </Td>
                                <Td>
                                  <Tooltip label='Remove Review'>
                                    <Button
                                      variant={'outline'}
                                      colorScheme="red"
                                      onClick={() =>
                                        onRemoveReview(product._id, review._id)
                                      }
                                    >
                                        <DeleteIcon />
                                    </Button>
                                  </Tooltip>
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
            ))}
        </Box>
      )}
    </Box>
  );
};

export default ReviewsTab;
