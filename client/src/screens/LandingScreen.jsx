import React, { useEffect } from 'react';

import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Skeleton,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterDomLink } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import Footer from '../components/Footer';
import landingOne from '../images/landingOne.png';
import landingTwo from '../images/landingTwo.png';
import techOne from '../images/techOne.jpg';
import techTwo from '../images/techTwo.jpg';

const LandingScreen = () => {
  useEffect(() => {
    document.title = 'Home | Daddy';

    return () => {
      document.title = 'Daddy';
    };
  }, []);

  return (
    <Box>
      <Box
        maxW="7xl"
        mx="auto"
        px={{ base: '0', lg: '12' }}
        py={{ base: '0', lg: '12' }}
      >
        <Stack
          direction={{ base: 'column-reverse', lg: 'row' }}
          spacing={{ base: '0', lg: '20' }}
        >
          <Box
            width={{ lg: 'sm' }}
            transform={{ base: 'translateY(-50%)', lg: 'none' }}
            bg={{
              base: useColorModeValue('gray.200', 'gray.700'),
              lg: 'transparent',
            }}
            mx={{ base: '6', md: '8', lg: '0' }}
            px={{ base: '6', md: '8', lg: '0' }}
            py={{ base: '6', md: '8', lg: '12' }}
          >
            <Stack spacing={{ base: '8', lg: '10' }}>
              <Stack spacing={{ base: '2', lg: '4' }}>
                <Heading
                  size="xl"
                  color={useColorModeValue('gray.700', 'orange.400')}
                >
                  Misguided
                </Heading>
                <Heading size="xl" fontWeight="normal">
                  Refresh your wardrobe with a new stylish collection
                </Heading>
              </Stack>
              <HStack spacing="3">
                <Link
                  as={RouterDomLink}
                  to="/products"
                  _hover={{ textDecoration: 'none' }}
                  color={useColorModeValue('gray.700', 'orange.400')}
                  fontWeight="bold"
                  fontSize="lg"
                >
                  Discover now
                </Link>
                <Icon
                  color={useColorModeValue('gray.700', 'orange.400')}
                  as={FaArrowRight}
                />
              </HStack>
            </Stack>
          </Box>
          <Flex flex="1" overflow="hidden">
            <Image
              src={landingOne}
              alt="Lovely Image"
              fallback={<Skeleton />}
              maxH="450px"
              minW="300px"
              objectFit="cover"
              flex="1"
            />
            <Image
              display={{ base: 'none', sm: 'initial' }}
              src={landingTwo}
              alt="Lovely Image"
              fallback={<Skeleton />}
              maxH="450px"
              objectFit="cover"
            />
          </Flex>
        </Stack>
      </Box>
      <Box
        maxW="7xl"
        mx="auto"
        px={{ base: '0', lg: '12' }}
        py={{ base: '0', lg: '12' }}
      >
        <Stack
          direction={{ base: 'column-reverse', lg: 'row' }}
          spacing={{ base: '0', lg: '20' }}
        >
          <Flex flex="1" overflow="hidden">
            <Image
              src={techOne}
              alt="Lovely Image"
              fallback={<Skeleton />}
              maxH="450px"
              minW="300px"
              objectFit="cover"
              flex="1"
            />
            <Image
              display={{ base: 'none', sm: 'initial' }}
              src={techTwo}
              alt="Lovely Image"
              fallback={<Skeleton />}
              maxH="450px"
              objectFit="cover"
            />
          </Flex>
          <Box
            width={{ lg: 'sm' }}
            transform={{ base: 'translateY(-50%)', lg: 'none' }}
            mx={{ base: '6', md: '8', lg: '0' }}
            px={{ base: '6', md: '8', lg: '0' }}
            py={{ base: '6', md: '8', lg: '12' }}
          >
            <Stack spacing={{ base: '8', lg: '10' }}>
              <Stack spacing={{ base: '2', lg: '4' }}>
                <Heading
                  size="xl"
                  color={useColorModeValue('gray.700', 'orange.400')}
                >
                  Clear your mind
                </Heading>
                <Heading size="xl" fontWeight="normal">
                  See the new gaming collection
                </Heading>
              </Stack>
              <HStack spacing="3">
                <Link
                  as={RouterDomLink}
                  to="/products"
                  _hover={{ textDecoration: 'none' }}
                  color={useColorModeValue('gray.700', 'orange.400')}
                  fontWeight="bold"
                  fontSize="lg"
                >
                  Discover now
                </Link>
                <Icon
                  color={useColorModeValue('gray.700', 'orange.400')}
                  as={FaArrowRight}
                />
              </HStack>
            </Stack>
          </Box>
        </Stack>
      </Box>  
      <div style={{padding: '15px'}} />
      <Footer />
    </Box>
  );
};

export default LandingScreen;
