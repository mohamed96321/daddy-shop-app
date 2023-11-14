import React, { useEffect } from 'react';
import {
  Box,
  Th,
  Tr,
  Table,
  Thead,
  Tbody,
  Stack,
  Button,
  Alert,
  AlertDescription,
  AlertTitle,
  AlertIcon,
  Spinner,
  Wrap,
  useToast,
  Accordion,
  AccordionItem,
  AccordionButton,
  Tooltip,
  AccordionPanel,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProducts,
  resetProductError,
} from '../redux/actions/productActions';
import { AiOutlinePlus } from 'react-icons/ai';
import ProductTableItem from './ProductTableItem';
import AddNewProduct from './AddNewProduct';

const ProductsTab = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const { error, loading } = admin;
  const productInfo = useSelector((state) => state.products);
  const { products, productUpdate } = productInfo;
  const toast = useToast();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(resetProductError());

    if (productUpdate) {
      toast({
        description: 'Product has been updated',
        status: 'success',
        isClosable: true,
      });
    }
  }, [productUpdate, toast, dispatch]);

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
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex={'1'} textAlign={'right'}>
                    <Tooltip
                      label="Add a new product"
                    >
                      <Button variant={'outline'}>
                        <AiOutlinePlus />
                      </Button>
                    </Tooltip>
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={'4'}>
                <Table>
                  <Tbody>
                    <AddNewProduct />
                  </Tbody>
                </Table>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Table variant={'simple'} size={'lg'}>
            <Thead>
              <Tr>
                <Th>Image</Th>
                <Th>Description</Th>
                <Th>Brand & Name</Th>
                <Th>Category & Price</Th>
                <Th>Stock & New Badge</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.length > 0 && products.map((product) => (
                <ProductTableItem key={product._id} product={product} />
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default ProductsTab;
