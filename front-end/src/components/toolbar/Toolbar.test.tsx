import { render } from '@testing-library/react';
import Toolbar from './Toolbar';

test('renders without crashing', () => {
    const { baseElement } = render(<Toolbar username='user'/>);
    expect(baseElement).toBeDefined();
  });

