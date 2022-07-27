import { render } from '@testing-library/react';
import LeaderboardValues from './LeaderboardValues';

test('renders without crashing', () => {
    const { baseElement } = render(<LeaderboardValues scores={[]} />);
    expect(baseElement).toBeDefined();
  });


////TESTS TO BE PERFROMED////
/*

*/


