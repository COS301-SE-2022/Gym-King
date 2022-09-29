jest.setTimeout(250000)
import { render } from '@testing-library/react';
import Explore from './Explore';

//tests to see if the page renders without crashing
test('renders without crashing', async () => {
    const { baseElement } =await  render(<Explore />);
    expect(baseElement).toBeDefined();
  });

    //tests to see if all labels are properly displayed
  describe('Testing values', () => {

    test('correctly displays captions',  async() => {
      const {baseElement} =  await render(<Explore />);
      expect (baseElement).toHaveTextContent("Find Users");
      expect (baseElement).toHaveTextContent("Explore");
      expect (baseElement).toHaveTextContent("Find Gyms");
      expect (baseElement).toHaveTextContent("Suggested Badges");
    }); 
  });
  
  
