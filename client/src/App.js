import { ChakraProvider } from '@chakra-ui/react';
import { 
  BrowserRouter as Router, 
  Route, 
  Switch } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import ProductsScreen from './screens/ProductsScreen';

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
            </Switch>
          }
        </main>
      </Router>
    </ChakraProvider>
  );
};

export default App;
