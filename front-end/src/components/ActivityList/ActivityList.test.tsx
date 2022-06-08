import { render } from '@testing-library/react';
import ActivityList from './ActivityList'

test('renders without crashing', () => {
    const { baseElement } = render(<ActivityList activityCategory='cardio' i1='00:23:00' i2='3' i3='4' />);
    expect(baseElement).toBeDefined();
  });


////TESTS TO BE PERFROMED////
/*
  - Renders without crashing 
  - tests if labels are (Duration, Distance and Level of difficulty) if activityCaterogy prop is cardio
  - tests if labels are (Weights, Sets and Reps) if activityCaterogy prop is strength 
  - test that text inputs display what is passed in as props 
*/