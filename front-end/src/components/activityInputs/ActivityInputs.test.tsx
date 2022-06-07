import { render } from '@testing-library/react';
import ActivityInputs from './ActivityInputs'

test('renders without crashing', () => {
    const { baseElement } = render(<ActivityInputs activityCategory='cardio' inputs={{input1:'00:23:00', input2:'3', input3:'4'}} />);
    expect(baseElement).toBeDefined();
  });


  ////TESTS TO BE PERFROMED////
/*
  - Renders without crashing 
  - tests if labels are (Duration, Distance and Level of difficulty) if activityCaterogy prop is cardio
  - tests if labels are (Weights, Sets and Reps) if activityCaterogy prop is strength 
  - test that activtystates update when value in input boxes change (test handle change function)

*/