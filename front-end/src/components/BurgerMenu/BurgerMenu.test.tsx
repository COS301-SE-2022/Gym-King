jest.setTimeout(250000)
import { render } from '@testing-library/react';
import BurgerMenu from './BurgerMenu';

test('renders without crashing', async () => {
    const { baseElement } =await  render(<BurgerMenu listItems={[]}/>);
    expect(baseElement).toBeDefined();
  });


  describe('Testing values', () => {

    test('correctly displays captions',  async() => {
      const {baseElement} =  await render(<BurgerMenu listItems={["Profile", "My Badges"]} />);
      expect (baseElement).toHaveTextContent("MenuLogout");
    }); 
  });
  
  