jest.setTimeout(250000)
import { render } from '@testing-library/react';
import GymsList from './GymsList';

test('renders without crashing', async () => {
    const { baseElement } =await  render(<GymsList gymsList={[]} />);
    expect(baseElement).toBeDefined();
  });
