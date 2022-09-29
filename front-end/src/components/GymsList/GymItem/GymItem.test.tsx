jest.setTimeout(250000)
import { render } from '@testing-library/react';
import GymItem from './GymItem';

test('renders without crashing', async () => {
    const { baseElement } =await  render(<GymItem gymId={""} />);
    expect(baseElement).toBeDefined();
  });
