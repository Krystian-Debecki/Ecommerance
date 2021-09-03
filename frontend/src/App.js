import {  BrowserRouter as Router } from 'react-router-dom'

import Header from './layouts/Header'
import Footer from './layouts/Footer'
import Content from './Content'

import './styles/App.css'

function App() {

  /*
  
  const dispatch = useDispatch();
  const basket = useBasket()

  console.log(basket)

  const handleClick = () => {
    dispatch({ type: 'BASKET/ADD_TO_BASKET' })
  }

  */

  return (
    <Router>
      <Header />
      <Content />
      <Footer />
    </Router>
  );
}

export default App;
