import { render } from '@testing-library/react';
import ActivityList from './ActivityList'

test('renders without crashing', () => {
    const { baseElement } = render(<ActivityList activityCategory='cardio' i1='00:23:00' i2='3' i3='4' />);
    expect(baseElement).toBeDefined();
  });

