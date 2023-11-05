import React from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  IconButton,
  Stack,
  Image,
  Text,
  Flex,
  Input,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import daddyDark from '../images/daddyDarker.png';

const Footer = () => (
  <Box
    w="100%"
    color={useColorModeValue('white', 'white')}
    bg={useColorModeValue('gray.700', 'gray.900')}
  >
    <Container as="footer" role="contentinfo" maxW={'7xl'}>
      <Stack
        spacing="8"
        direction={{ base: 'column', md: 'row' }}
        justify={'space-between'}
        py={{ base: '6', md: '8' }}
        align={'start'}
      >
        <Stack>
          <Flex alignItems={'center'}>
            <Image
              src={useColorModeValue(daddyDark, daddyDark)}
              alt="Daddy Logo"
              h={10}
              w={10}
            />
            <Text fontSize={'2xl'} fontWeight={'extrabold'}>
              Daddy
            </Text>
          </Flex>
          <Text color={'muted'}>Elegant Products & affortable</Text>
        </Stack>
        <Stack
          direction={{ base: 'column-reverse', md: 'column' }}
          spacing={{ base: '12', md: '8' }}
        >
          <Stack direction={{ base: 'row' }} spacing={'8'}>
            <Stack spacing={'4'} minW={'36'} flex={'1'}>
              <Text fontSize={'md'} fontWeight={'semibold'} color={'subtle'}>
                Product
              </Text>
              <Stack spacing={'3'} shouldWrapChildren>
                <Button
                  fontSize={'sm'}
                  _hover={{ textDecoration: 'none' }}
                  variant={'link'}
                >
                  How it work
                </Button>
                <Button
                  fontSize={'sm'}
                  _hover={{ textDecoration: 'none' }}
                  variant={'link'}
                >
                  Pricing
                </Button>
                <Button
                  fontSize={'sm'}
                  _hover={{ textDecoration: 'none' }}
                  variant={'link'}
                >
                  Use Cases
                </Button>
              </Stack>
            </Stack>
            <Stack spacing={'4'} minW={'36'} flex={'1'}>
              <Text fontSize={'md'} fontWeight={'semibold'} color={'subtle'}>
                Legal
              </Text>
              <Stack spacing={'3'} shouldWrapChildren>
                <Button
                  fontSize={'sm'}
                  _hover={{ textDecoration: 'none' }}
                  variant={'link'}
                >
                  Privacy
                </Button>
                <Button
                  fontSize={'sm'}
                  _hover={{ textDecoration: 'none' }}
                  variant={'link'}
                >
                  Terms
                </Button>
                <Button
                  fontSize={'sm'}
                  _hover={{ textDecoration: 'none' }}
                  variant={'link'}
                >
                  License
                </Button>
              </Stack>
            </Stack>
          </Stack>
          <Stack spacing={'4'}>
            <Text fontSize={'sm'} fontWeight={'semibold'} color={'subtle'}>
              Stay up to date
            </Text>
            <Stack
              spacing={'4'}
              direction={{ base: 'column', md: 'row' }}
              maxW={{ lg: '360px' }}
              align={'start'}
            >
              <Input placeholder="Enter your email" type="email" required />
              <Button colorScheme="gray" type='submit' flexShrink={0}>
                Subscribe
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Divider />
      <Stack
        pt={'8'}
        pb={'12'}
        justify={'space-between'}
        direction={{ base: 'column-reverse', md: 'row' }}
        align={'center'}
      >
        <Text fontSize="sm" color="whiteAlpha.500">
          &copy; {new Date().getFullYear()} MA Company, Inc. All rights
          reserved.
        </Text>
        <ButtonGroup variant="ghost">
          <IconButton
            as="a"
            href="#"
            aria-label="LinkedIn"
            icon={<FaLinkedin color="white" />}
          />
          <IconButton
            as="a"
            href="#"
            aria-label="GitHub"
            icon={<FaGithub color="white" />}
          />
          <IconButton
            as="a"
            href="#"
            aria-label="Twitter"
            icon={<FaTwitter color="white" />}
          />
        </ButtonGroup>
      </Stack>
    </Container>
  </Box>
);

export default Footer;
