import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CategoryFilterBtn from '../components/CategoryFilterBtn.js/CategoryFilterBtn';

describe('CategoryFilterBtn', () => {
  it('should render title based on current route', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <CategoryFilterBtn />
      </MemoryRouter>,
    );

    // screen.getByRole('heading', { name: /meals/i });
  });
});
