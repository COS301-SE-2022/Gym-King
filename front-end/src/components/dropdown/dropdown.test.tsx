jest.setTimeout(25000)
import { render } from '@testing-library/react';
import { DropDown } from './dropdown'

test('renders without crashing', async() => {
    const { baseElement } = render(<DropDown list={['Strength', "Cardio"]} />);
    expect(baseElement).toBeDefined();
});


////TESTS TO BE PERFROMED////
/*
- tests that onChange method works 
*/

describe('Testing prop text values', () => {

    test('correctly displays select options', async () => {
      const {baseElement} =await render(<DropDown list={['Strength', 'Cardio']} />);
      expect (baseElement).toHaveTextContent("Strength");
      expect (baseElement).toHaveTextContent("Cardio");
      
    }); 
 
  });