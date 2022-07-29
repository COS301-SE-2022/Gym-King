import { render } from '@testing-library/react';
import ActivityInputs from './ActivityInputs'

test('renders without crashing', () => {
    const { baseElement } = render(<ActivityInputs activityCategory='cardio' inputs={{input1:'00:23:00', input2:'3', input3:'4'}} />);
    expect(baseElement).toBeDefined();
  });



describe('Testing prop text values', () => {

  test('correctly displays cardio activitytype inputs', async () => {
    const {baseElement} = render(<ActivityInputs activityCategory='CARDIO' inputs={{input1:'00:23:00', input2:'3', input3:'4'}} />);
    expect (baseElement).toHaveTextContent("Duration");
    expect (baseElement).toHaveTextContent("Distance");
    expect (baseElement).toHaveTextContent("Level of Difficulty");
  }); 
  test('correctly displays strength activitytype inputs', async () => {
    const {baseElement} = render(<ActivityInputs activityCategory='strength' inputs={{input1:'00:23:00', input2:'3', input3:'4'}} />);
    expect (baseElement).toHaveTextContent("Weight");
    expect (baseElement).toHaveTextContent("Sets");
    expect (baseElement).toHaveTextContent("Reps");
  }); 
});


