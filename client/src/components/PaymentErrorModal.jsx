import React from 'react';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalBody,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Wrap,
} from '@chakra-ui/react';

const PaymentErrorModal = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalBody>
              <Wrap
                justify={'center'}
                direction={'column'}
                align={'center'}
                my={'20px'}
              >
                <Alert
                  h={'200px'}
                  status='error'
                  variant={'subtle'}
                  flexDirection={'column'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  textAlign={'center'}
                >
                  <AlertIcon boxSize={'55px'} />
                  <AlertTitle pt={'8px'} fontSize={'xl'}>
                    Payment Failed!
                  </AlertTitle>
                  <AlertDescription>We couldn't process your payment.</AlertDescription>
                </Alert>
              </Wrap>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export default PaymentErrorModal;
