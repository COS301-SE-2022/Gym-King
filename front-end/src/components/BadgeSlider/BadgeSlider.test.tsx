import { render } from '@testing-library/react';
import { BadgeSlider } from './BadgeSlider'

test('renders without crashing', () => {
    const { baseElement } = render(<BadgeSlider name="" bIcon="" />);
    expect(baseElement).toBeDefined();
  });


////TESTS TO BE PERFROMED////
/*

*/


