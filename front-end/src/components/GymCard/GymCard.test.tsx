import {render,screen} from '@testing-library/react';
import GymCard from './GymCard';
/*UNIT TESTING*/
//test if pages rendered
test('renders without crashing', () => {
*/
  const { baseElement } = render(<GymCard id="" name="" address='' deleteClicked=""/>);
  expect(baseElement).toBeDefined();
});

describe('Testing prop text values', () => {

    
    test('correctly displays gym card info', async () => {
        render(<GymCard id="" name="a gym" address='123 street' deleteClicked=""/>);
        expect(screen.getByText(/a gym/i)).toBeInTheDocument();
        expect(screen.getByText(/123 street/i)).toBeInTheDocument();
    }); 
  });
/*describe('testing clickables',()=>{
  test('action sheet opens', async () => {
        expect(screen.getByText(/Edit/i)).toBeInTheDocument();
        expect(screen.getByText(/Delete/i)).toBeInTheDocument();
        expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
    });
})*/
