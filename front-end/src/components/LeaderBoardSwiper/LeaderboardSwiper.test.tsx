import { render } from '@testing-library/react';
import { LeaderboardSwiper } from './LeaderboardSwiper'

test('renders without crashing', async() => {
    const { baseElement } = render(<LeaderboardSwiper overall={[]} cardio={[]} strength={[]} />);
    expect(baseElement).toBeDefined();
  });


////TESTS TO BE PERFROMED////
/*

*/


