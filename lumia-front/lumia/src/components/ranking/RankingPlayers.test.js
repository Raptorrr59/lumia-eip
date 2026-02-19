import React from 'react';
import { render, screen } from '@testing-library/react';
import RankingPlayer from './RankingPlayers';

describe('RankingPlayer Component', () => {
  test('renders ranking and pseudo correctly', () => {
    render(<RankingPlayer ranking={1} pseudo="JohnDoe" />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('JohnDoe')).toBeInTheDocument();
  });
});
