import { ChakraProvider } from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductsScreen from './screens/ProductsScreen';
import CartScreen from './screens/CartScreen';
import ProductScreen from './screens/ProductScreen';
import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ProfileScreen from './screens/ProfileScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import YourOrdersScreen from 'screens/YourOrdersScreen';

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <main>
          {
            <Switch>
              <Route path="/login" component={LoginScreen} exact />
              <Route path="/profile" component={ProfileScreen} exact />
              <Route path="/signup" component={SignupScreen} exact />
              <Route path="/products" component={ProductsScreen} exact />
              <Route path="/product/:id" component={ProductScreen} />
              <Route path="/cart" component={CartScreen} exact />
              <Route path="/" component={LandingScreen} exact />
              <Route path="/checkout" component={CheckoutScreen} exact />
              <Route path="/your-orders" component={YourOrdersScreen} exact />
              <Redirect to="/products" />
            </Switch>
          }
        </main>
      </Router>
    </ChakraProvider>
  );
};

export default App;
