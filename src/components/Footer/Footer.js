import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import drinkIcon from '../../images/drinkIcon.png';
import mealIcon from '../../images/mealIcon.png';
// import './Footer.css';

function Footer() {
  const history = useHistory();

  const goToDrinks = () => {
    history.push('/drinks');
  };

  const goToMeals = () => {
    history.push('/meals');
  };

  const showDrinksBtn = () => (
    <Nav.Link
      onClick={ goToDrinks }
    >
      <img
        src={ drinkIcon }
        alt="drinks"
        data-testid="drinks-bottom-btn"
      />
    </Nav.Link>
  );

  const showMealsBtn = () => (
    <Nav.Link
      onClick={ goToMeals }
    >
      <img
        src={ mealIcon }
        alt="meals"
        data-testid="meals-bottom-btn"
      />
    </Nav.Link>
  );

  return (
    <Navbar data-testid="footer" fixed="bottom" bg="warning">
      <Container>
        { showDrinksBtn() }
        { showMealsBtn() }
      </Container>
    </Navbar>
  );
}

export default Footer;
