import React, { useState } from 'react';
import {
  Tr,
  Td,
  Button,
  VStack,
  Textarea,
  Tooltip,
  Input,
  FormControl,
  Switch,
  FormLabel,
  Text,
  Badge,
} from '@chakra-ui/react';
import { MdDriveFolderUpload } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { uploadProduct } from 'redux/actions/adminActions';

const AddNewProduct = () => {
  const dispatch = useDispatch();
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [productIsNew, setProductIsNew] = useState(true);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const createNewProduct = () => {
    dispatch(
      uploadProduct({
        brand,
        name,
        category,
        stock,
        price,
        productIsNew,
        description,
        image,
      })
    );
  };

  return (
    <Tr>
      <Td>
        <Text fontSize={'sm'}>Image File Name</Text>
        <Tooltip label="Set the name of your image e.g. Iphone.jpg">
          <Input
            size={'sm'}
            id='image'
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="e.g. IPhone.jpg"
          />
        </Tooltip>
      </Td>
      <Td>
        <Text fontSize={'sm'}>Description</Text>
        <Textarea
          value={description}
          w={'270px'}
          h={'120px'}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          id='description'
          size={'sm'}
        />
      </Td>
      <Td>
        <Text fontSize={'sm'}>Brand</Text>
        <Input
          size={'sm'}
          value={brand}
          id='brand'
          onChange={(e) => setBrand(e.target.value)}
          placeholder="e.g. Apple or Samsung"
        />
        <Text fontSize={'sm'}>Name</Text>
        <Input
          size={'sm'}
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Samsung S30"
        />
      </Td>
      <Td>
        <Text fontSize={'sm'}>Category</Text>
        <Input
          id='category'
          size={'sm'}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g. Electronics"
        />
        <Text fontSize={'sm'}>Price</Text>
        <Input
          size={'sm'}
          value={price}
          id='price'
          onChange={(e) => setPrice(e.target.value)}
          placeholder="299.99"
        />
      </Td>
      <Td>
        <Text fontSize={'sm'}>Stock</Text>
        <Input
          size={'sm'}
          id='stock'
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <Text fontSize={'sm'}>New badge shown on product card</Text>
        <FormControl display={'flex'} alignItems={'center'}>
          <FormLabel htmlFor="productIsNewFlag" mb={'0'} fontSize={'sm'}>
            Enable
            <Badge
              rounded={'full'}
              px={'1'}
              mx={'1'}
              fontSize={'0.8em'}
              colorScheme="green"
            >
              New
            </Badge>
            Toggle
          </FormLabel>
          <Switch
            id="productIsNewFlag"
            onChange={() => setProductIsNew(!productIsNew)}
            isChecked={productIsNew}
          />
        </FormControl>
      </Td>
      <Td>
        <VStack>
          <Button variant={'outline'} w={'160px'} onClick={() => createNewProduct()}>
            <MdDriveFolderUpload />
            <Text ml={'2'}>Save Product</Text>
          </Button>
        </VStack>
      </Td>
    </Tr>
  );
};

export default AddNewProduct;
