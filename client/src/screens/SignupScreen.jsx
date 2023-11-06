import React, { useEffect, useState } from 'react';
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
import TextField from '../components/TextField';
import PasswordTextField from '../components/PasswordTextField';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link as RouterDomLink } from 'react-router-dom';
import { register } from '../redux/actions/userActions';

const SignupScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { loading, error, userInfo } = user;
  const redirect = '/products';
  const toast = useToast();
  const headingBR = useBreakpointValue({ base: 'xs', md: 'sm' });
  const boxBR = useBreakpointValue({ base: 'transparent', md: 'bg-surface' });

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
      toast({
        description: 'Account Created Successfully',
        status: 'success',
        isClosable: true,
      });
    }
  }, [userInfo, redirect, error, history, toast]);

  useEffect(() => {
    document.title = 'Sign Up | Daddy';

    return () => {
      document.title = 'Daddy';
    };
  }, []);

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(3, 'You should enter a valid name')
          .required('Your name is required.'),
        email: Yup.string()
          .email('Invalid email.')
          .required('An email is required.'),
        password: Yup.string()
          .min(5, 'Password is too short - must contain at least 1 character.')
          .required('Password is required'),
        confirmPassword: Yup.string()
          .required('Password is required')
          .oneOf([Yup.ref('password'), null], 'Passwords must match.'),
      })}
      onSubmit={(values) => {
        dispatch(register(values.name, values.email, values.password));
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
                <Heading size={{ headingBR }}>Create a new account</Heading>
                <HStack spacing={'1'} justify={'center'}>
                  <Text color={'muted'}>You have an account?</Text>
                  <Button
                    _hover={{ textDecoration: 'none' }}
                    as={RouterDomLink}
                    to="/login"
                    variant={'link'}
                    colorScheme="orange"
                  >
                    Sign In
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
                      name="name"
                      placeholder={'your name'}
                      label={'Name'}
                    />
                    <TextField
                      type={'text'}
                      name="email"
                      placeholder={'you@example.com'}
                      label={'Email'}
                    />
                    <PasswordTextField
                      type={'password'}
                      name={'password'}
                      placeholder={'your password'}
                      label={'Password'}
                    />
                    <PasswordTextField
                      type={'password'}
                      name={'confirmPassword'}
                      placeholder={'Comfirm your password'}
                      label={'Confirm Password'}
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
                    Sign Up
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

export default SignupScreen;
