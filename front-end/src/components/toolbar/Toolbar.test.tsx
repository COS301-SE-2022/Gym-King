import { render } from '@testing-library/react';
import ToolBar from './Toolbar';

test('renders without crashing', () => {
    const { baseElement } = render(<ToolBar username='user'/>);
    expect(baseElement).toBeDefined();
  });

