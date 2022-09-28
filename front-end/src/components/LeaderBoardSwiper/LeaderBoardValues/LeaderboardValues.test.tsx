jest.setTimeout(250000)
import { render } from '@testing-library/react';
import LeaderboardValues from './LeaderboardValues';

test('renders without crashing',async () => {
    const { baseElement } =await render(<LeaderboardValues scores={[]} />);
    expect(baseElement).toBeDefined();
  });


////TESTS TO BE PERFROMED////
/*

*/


