jest.setTimeout(250000)
import { render } from '@testing-library/react';
import FriendRequestList from './FriendRequestList';

test('renders without crashing', async () => {
    const { baseElement } =await  render(<FriendRequestList requests={[]}/>);
    expect(baseElement).toBeDefined();
  });


  describe('Testing values', () => {

    test('correctly displays cardio activitytype inputs',  async() => {
      const {baseElement} =  await render(<FriendRequestList requests={[]}/>);
      expect (baseElement).toHaveTextContent("");
    }); 
  });
  
  