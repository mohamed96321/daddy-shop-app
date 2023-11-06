import React, { useState, useEffect } from 'react';
import {
  Box,
  Checkbox,
  Container,
  FormControl,
  Heading,
  HStack,
  Stack,
  Text,
  Button,
  useBreakpointValue,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import {
  useHistory,
  Link as RouterDomLink,
  useLocation,
} from 'react-router-dom';
import PasswordTextField from '../components/PasswordTextField';
import TextField from '../components/TextField';
import { login } from '../redux/actions/userActions';

// TODO: redefine password length
const LoginScreen = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const redirect = '/products';
  const toast = useToast();

  const user = useSelector((state) => state.user);
  const { loading, error, userInfo } = user;

  const headingBR = useBreakpointValue({ base: 'xs', md: 'sm' });
  const boxBR = useBreakpointValue({ base: 'transparent', md: 'bg-surface' });

  useEffect(() => {
    if (userInfo) {
      if (location.state?.from) {
        history.push(location.state.from);
      } else {
        history.push(redirect);
      }
      toast({
        description: 'Login successful',
        status: 'success',
        isClosable: true,
      });
    }
  }, [userInfo, redirect, error, history, location.state, toast]);

  useEffect(() => {
    document.title = 'Login | Daddy';

    return () => {
      document.title = 'Daddy';
    };
  }, []);

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Invalid email.')
          .required('An email is required.'),
        password: Yup.string()
          .min(6, 'Password is too short - must contain at least 1 character.')
          .required('Password is required'),
      })}
      onSubmit={(values) => {
        dispatch(login(values.email, values.password));
      }}
    >
      {(formik) => (
        <Container
          maxW={'lg'}
          py={{ base: '12', md: '24' }}
          px={{ base: '0', md: '8' }}
          minH={'4xl'}
        >
          <Stack spacing={'8'}>
            <Stack spacing={'6'}>
              <Stack spacing={{ base: '2', md: '3' }} textAlign={'center'}>
                <Heading size={{ headingBR }}>Log in to your account</Heading>
                <HStack spacing={'1'} justify={'center'}>
                  <Text color={'muted'}>Don't have account?</Text>
                  <Button
                    _hover={{ textDecoration: 'none' }}
                    as={RouterDomLink}
                    to="/signup"
                    variant={'link'}
                    colorScheme="orange"
                  >
                    Sign Up
                  </Button>
                </HStack>
              </Stack>
            </Stack>
            <Box
              py={{ base: '0', md: '8' }}
              px={{ base: '4', md: '10' }}
              bg={{ boxBR }}
              boxShadow={{ base: 'none', md: 'xl' }}
            >
              <Stack spacing={'6'} as={'form'} onSubmit={formik.handleSubmit}>
                {error && (
                  <Alert
                    status="error"
                    flexDirection={'column'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    textAlign={'center'}
                    bg={'none'}
                  >
                    <AlertIcon />
                    <AlertTitle>Ooops!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Stack spacing={'5'}>
                  <FormControl>
                    <TextField
                      type={'text'}
                      name="email"
                      placeholder={'you@example.com'}
                      label={'Email'}
                    />
                    <PasswordTextField
                      type={'password'}
                      name={'password'}
                      placeholder={'Your password'}
                      label={'Password'}
                    />
                  </FormControl>
                </Stack>
                <Stack spacing={'6'}>
                  <Button
                    colorScheme="orange"
                    size={'lg'}
                    isLoading={loading}
                    type="submit"
                  >
                    Sign In
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Container>
      )}
    </Formik>
  );
};

export default LoginScreen;
