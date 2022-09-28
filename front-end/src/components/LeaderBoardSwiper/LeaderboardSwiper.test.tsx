jest.setTimeout(250000)
import { render } from '@testing-library/react';
import { LeaderboardSwiper } from './LeaderboardSwiper'

test('renders without crashing', async() => {
    const { baseElement } =await render(<LeaderboardSwiper overall={[]} cardio={[]} strength={[]} />);
    expect(baseElement).toBeDefined();
  });


////TESTS TO BE PERFROMED////
/*

*/


