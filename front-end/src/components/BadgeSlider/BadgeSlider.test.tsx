jest.setTimeout(25000)
import { render } from '@testing-library/react';
import { BadgeSlider } from './BadgeSlider'

test('renders without crashing',async () => {
    const { baseElement } =await render(<BadgeSlider name="" bIcon="" />);
    expect(baseElement).toBeDefined();
  });


////TESTS TO BE PERFROMED////
/*

*/


