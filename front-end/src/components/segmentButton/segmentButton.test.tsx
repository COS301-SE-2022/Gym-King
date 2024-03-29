jest.setTimeout(25000)
import { render } from '@testing-library/react';
import SegmentButton from './segmentButton';

test('renders without crashing', async() => {
    const { baseElement } =await render(<SegmentButton list={[]} />);
    expect(baseElement).toBeDefined();
  });

////TESTS TO BE PERFORMED////
/*
- test that length of list array is 2 
*/

describe('Testing prop values', () => {

    test('correctly displays list buttons ', async () => {
      const {baseElement} =await render(<SegmentButton list={["Strength", "Cardio"]} />);
      expect (baseElement).toHaveTextContent("Strength");
      expect (baseElement).toHaveTextContent("Cardio");
      
    }); 

});