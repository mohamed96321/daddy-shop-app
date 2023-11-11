import React, { useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  Heading,
  Stack,
  Alert,
  AlertDescription,
  AlertTitle,
  AlertIcon,
  Flex,
  Card,
  CardHeader,
  CardBody,
  StackDivider,
  useToast,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import TextField from '../components/TextField';
import PasswordTextField from '../components/PasswordTextField';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateProfile,
  resetUpdateSuccess,
} from '../redux/actions/userActions';
import { useLocation, Redirect } from 'react-router-dom';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userInfo, error, loading, updateSuccess } = user;
  const location = useLocation();
  const toast = useToast();

  useEffect(() => {
    if (updateSuccess) {
      toast({
        description: 'Profile updated successfully',
        status: 'success',
        isClosable: true,
      });
      dispatch(resetUpdateSuccess());
    }
  }, [updateSuccess, toast, dispatch]);

  useEffect(() => {
    document.title = 'Profile | Daddy';

    return () => {
      document.title = 'Daddy';
    };
  }, []);

  return userInfo ? (
    <Formik
      initialValues={{
        name: userInfo.name,
        email: userInfo.email,
        password: '',
        confirmPassword: '',
      }}
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
        dispatch(
          updateProfile(
            userInfo._id,
            values.name,
            values.email,
            values.password
          )
        );
      }}
    >
      {(formik) => (
        <Box
          minH={'100vh'}
          maxW={{ base: '3xl', md: '7xl' }}
          mx={'auto'}
          py={{ base: '6', md: '8', lg: '12' }}
          px={{ base: '4', md: '8', lg: '12' }}
        >
          <Stack
          spacing={'10'}
            direction={{ base: 'column', md: 'row' }}
            align={{ lg: 'flex-start' }}
          >
            <Stack
              flex={'1.5'}
              mb={{ base: '2xl', md: 'none' }}
            >
              <Heading fontSize={'2xl'} fontWeight={'extrabold'}>
                Profile
              </Heading>
              <Stack spacing={'6'}>
                <Stack spacing={'6'} as={'form'} onSubmit={formik.handleSubmit}>
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
                  <Stack spacing={'5'}>
                    <FormControl>
                      <TextField
                        type={'text'}
                        name={'name'}
                        placeholder={'Your name'}
                        label={'Name'}
                      />
                      <TextField
                        type={'text'}
                        name={'email'}
                        placeholder={'you@example.com'}
                        label={'Email'}
                      />
                      <PasswordTextField
                        type={'password'}
                        name={'password'}
                        placeholder={'Your password'}
                        label={'Password'}
                      />
                      <PasswordTextField
                        type={'password'}
                        name={'confirmPassword'}
                        placeholder={'Confirm your password'}
                        label={'Confirm Password'}
                      />
                    </FormControl>
                  </Stack>
                  <Stack spacing={'6'}>
                    <Button
                      color={mode('gray.900', 'orange')}
                      size={'lg'}
                      fontSize={'md'}
                      isLoading={loading}
                      type="submit"
                    >
                      Save
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <Flex
              direction={'column'}
              align={'center'}
              flex={'1'}              
            >
              <Card>
                <CardHeader>
                  <Heading size={'md'}>User Report</Heading>
                </CardHeader>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing={'4'}>
                    <Box pt={'2'} fontSize={'sm'}>
                      Registered on{' '}
                      {new Date(userInfo.createdAt).toDateString()}
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            </Flex>
          </Stack>
        </Box>
      )}
    </Formik>
  ) : (
    <Redirect to="/login" replace={true} state={{ from: location }} />
  );
};

export default ProfileScreen;
