import React from 'react';
import PropTypes from 'prop-types';
import './Carousel.css';

const six = 6;
function Recomendations({ recomend, type }) {
  return (
    <div>
      <div className="carousel-recomend">
        { recomend
          && recomend.slice(0, six).map((item, index) => (
            <div
              data-testid={ `${index}-recommendation-card` }
              key={ index }
              className="carousel-item-recomend"
            >
              <img
                src={ type === 'drinks' ? item.strMealThumb : item.strDrinkThumb }
                alt={ type === 'drinks' ? 'drink' : 'meal' }
              />
              <p
                data-testid={ `${index}-recommendation-title` }
              >
                { type === 'drinks' ? item.strMeal : item.strDrink }
              </p>
            </div>
          )) }
      </div>
    </div>
  );
}

Recomendations.propTypes = {
  recomend: PropTypes.arrayOf(
    PropTypes.shape({
    }),
  ).isRequired,
  type: PropTypes.string.isRequired,
};

export default Recomendations;
