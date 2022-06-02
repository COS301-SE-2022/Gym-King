import { render } from '@testing-library/react';
import ActivityInputs from './ActivityInputs'

test('renders without crashing', () => {
    const { baseElement } = render(<ActivityInputs activityCategory='cardio' inputs={{input1:'00:23:00', input2:'3', input3:'4'}} />);
    expect(baseElement).toBeDefined();
  });
