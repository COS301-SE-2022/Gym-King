import {render} from '@testing-library/react';
import {GymSearchBar} from './GymSearchBar'

test('renders without crashing', () => {
  const {baseElement} = render(<GymSearchBar gyms={[]}, nearByCallback(), searchCallBack, setGymFocus/>);
  expect(baseElement).toBeDefined();
});

////TESTS TO BE PERFORMED ////
/*

*/
