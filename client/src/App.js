import { ChakraProvider } from '@chakra-ui/react';
import { 
  BrowserRouter as Router, 
  Route, 
  Switch } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import ProductsScreen from './screens/ProductsScreen';
import CartScreen from './screens/CartScreen';
import ProductScreen from './screens/ProductScreen';
import LandingScreen from './screens/LandingScreen';

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <main>
          {
            <Switch>
              <Route path='/products'>
                <ProductsScreen />
              </Route>
              <Route path='/product/:id'>
                <ProductScreen />
              </Route>
              <Route path='/cart'>
                <CartScreen />
              </Route>
              <Route path='/'>
                <LandingScreen />
              </Route>
            </Switch>
          }
        </main>
      </Router>
    </ChakraProvider>
  );
};

export default App;
