// src/components/Recipes/Recipes.jsx

import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import MyContext from '../../context/MyContext';

function Recipes({ type }) {
  const { foodData, drinkData } = useContext(MyContext);
  // ao entrar na rota /meals, carrega as 12 primeiras receitas OU carrega as 12 primeiras da categoria OU carrega pesquisa do SearchBar
  const showFood = () => (
    <Row xs={ 2 } className="mx-auto g-4">
      { foodData.map((element, index) => {
        const idDaReceita = element.idMeal;
        const { strMealThumb, strMeal } = element;
        return (
          <Link
            className="text-sm-center text-decoration-none"
            to={ `/meals/${idDaReceita}` }
            key={ strMealThumb }
          >
            <Col key={ idDaReceita }>
              <Card
                data-testid={ `${index}-recipe-card` }
                key={ strMealThumb }
              >
                <Card.Img
                  variant="top"
                  src={ strMealThumb }
                  alt={ strMeal }
                  data-testid={ `${index}-card-img` }
                />
                <Card.Body>
                  <Card.Title
                    className="text-warning"
                    data-testid={ `${index}-card-name` }
                  >
                    { strMeal }
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Link>
        );
      }) }
    </Row>
  );

  // ao entrar na rota /drinks, carrega ss 12 primeiras bebidas OU carrega os 12 primeiros da categoria escolhida OU carrega pesquisa do SearchBar
  const showDrinks = () => (
    <Row xs={ 2 } className="mx-auto g-4">
      { drinkData.map(
        ({ strDrinkThumb, strDrink, idDrink }, index) => (
          <Link
            className="text-sm-center text-decoration-none"
            to={ `/drinks/${idDrink}` }
            key={ strDrinkThumb }
          >
            <Col key={ idDrink }>
              <Card
                data-testid={ `${index}-recipe-card` }
                key={ strDrinkThumb }
              >
                <Card.Img
                  src={ strDrinkThumb }
                  alt={ strDrink }
                  data-testid={ `${index}-card-img` }
                />
                <Card.Body>
                  <Card.Title
                    className="text-warning"
                    data-testid={ `${index}-card-name` }
                  >
                    { strDrink }
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Link>
        ),
      )}
    </Row>
  );

  if (type === 'meals') {
    return (
      <>
        { showFood() }
      </>
    );
  }
  return (
    <>
      { showDrinks() }
    </>
  );
}

Recipes.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default Recipes;
// 100% cobertura da tela de receitas
