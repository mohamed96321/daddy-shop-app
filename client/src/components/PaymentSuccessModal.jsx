import React from 'react';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalBody,
  Button,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Wrap,
  useToast,
  Stack,
} from '@chakra-ui/react';
import { Link as ReactLink, useHistory } from 'react-router-dom';
import { logout } from 'redux/actions/userActions';
import { useDispatch } from 'react-redux';

const PaymentSuccessModal = ({ isOpen, onClose }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const toast = useToast();
  const logoutHandler = () => {
    dispatch(logout());
    toast({
      description: 'You have been logged out',
      status: 'success',
      isClosable: true,
    });
    history.push('/products');
  };

  return (
    <>
      <Modal size={'full'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalBody>
              <Wrap
                justify={'center'}
                direction={'column'}
                align={'center'}
                mt={'20px'}
              >
                <Alert
                  status="success"
                  variant={'subtle'}
                  flexDirection={'column'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  textAlign={'center'}
                  height={'auto'}
                >
                  <AlertIcon boxSize={'55px'} />
                  <AlertTitle pt={'8px'} fontSize={'xl'}>
                    Payment Successfull
                  </AlertTitle>
                  <AlertDescription>From here you can go to:</AlertDescription>
                  <Stack mt={'20px'} minW={'200px'}>
                    <Button colorScheme='teal' variant={'outline'} as={ReactLink} to='/your-orders'>
                      Your Orders
                    </Button>
                    <Button colorScheme='teal' variant={'outline'} as={ReactLink} to='/products'>
                      See More Products
                    </Button>
                    <Button colorScheme='teal' variant={'outline'} onClick={logoutHandler}>
                      Logout
                    </Button>
                  </Stack>
                </Alert>
              </Wrap>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export default PaymentSuccessModal;
