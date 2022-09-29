jest.setTimeout(250000)
import { render } from '@testing-library/react';
import MyGyms from './MyGyms';

test('renders without crashing', async () => {
    const { baseElement } =await  render(<MyGyms />);
    expect(baseElement).toBeDefined();
  });
