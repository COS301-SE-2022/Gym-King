import { render } from '@testing-library/react';
import { GymCard } from './GymCard'

test('renders without crashing', () => {
    const { baseElement } = render(<GymCard id="" name='' address='' deleteClicked="" />);
    expect(baseElement).toBeDefined();
  });


////TESTS TO BE PERFROMED////
/*

*/


