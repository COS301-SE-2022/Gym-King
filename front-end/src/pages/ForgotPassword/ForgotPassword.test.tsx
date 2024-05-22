jest.setTimeout(250000)
import { render } from '@testing-library/react';
import ForgotPassword from './ForgotPassword';

test('renders without crashing', async () => {
    const { baseElement } =await  render(<ForgotPassword />);
    expect(baseElement).toBeDefined();
  });


  describe('Testing values', () => {

    test('correctly displays captions',  async() => {
      const {baseElement} =  await render(<ForgotPassword />);
      expect (baseElement).toHaveTextContent("FORGOT PASSWORD");
      expect (baseElement).toHaveTextContent("Email");
      expect (baseElement).toHaveTextContent("User type");
      expect (baseElement).toHaveTextContent("Send OTP");
      expect (baseElement).toHaveTextContent("Back to Login");
    }); 
  });
  
  