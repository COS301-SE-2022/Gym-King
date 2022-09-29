jest.setTimeout(250000)
import { render } from '@testing-library/react';
import BadgeSuggestions from './BadgeSuggestions';

test('renders without crashing', async () => {
    const { baseElement } =await  render(<BadgeSuggestions badges={undefined}/>);
    expect(baseElement).toBeDefined();
  });
