jest.setTimeout(250000)
import { render } from '@testing-library/react';
import GymSearchBar from './GymSearchBar';

test('renders without crashing', async () => {
    const { baseElement } =await  render(<GymSearchBar gyms={[]} nearByCallBack={()=>undefined } searchCallBack={()=>undefined } setGymFocus={()=>undefined  } />);
    expect(baseElement).toBeDefined();
  });
