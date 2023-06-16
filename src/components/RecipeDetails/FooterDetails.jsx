import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function FooterDetails({ isRecipeSaved, type, idDaReceita }) {
  return (
    <div>
      <footer>
        {
          isRecipeSaved ? (
            <Link to={ `/${type}/${idDaReceita}/in-progress` }>
              <button
                data-testid="start-recipe-btn"
                className="button-recipe-details"
              >
                Continue Recipe
              </button>
            </Link>
          ) : (
            <Link to={ `/${type}/${idDaReceita}/in-progress` }>
              <button
                data-testid="start-recipe-btn"
                className="button-recipe-details"
              >
                Start Recipe
              </button>
            </Link>
          )
        }
      </footer>
    </div>
  );
}

FooterDetails.propTypes = {
  isRecipeSaved: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  idDaReceita: PropTypes.number.isRequired,
};

export default FooterDetails;
