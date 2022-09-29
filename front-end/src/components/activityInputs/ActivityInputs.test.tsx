jest.setTimeout(250000)

import { render } from '@testing-library/react';
import ActivityInputs from './ActivityInputs'

test('renders without crashing', async() => {
    const { baseElement } = await render(<ActivityInputs activityCategory='cardio' inputs={null} />);
    expect(baseElement).toBeDefined();
  });



describe('Testing prop text values', () => {

  test('correctly displays cardio activitytype inputs',  async() => {
    const {baseElement} =  await render(<ActivityInputs activityCategory='CARDIO' inputs={undefined} />);
    expect (baseElement).toHaveTextContent("Duration");
    expect (baseElement).toHaveTextContent("Distance");
    expect (baseElement).toHaveTextContent("Level of Difficulty");
  }); 
  test('correctly displays strength activitytype inputs', async () => {
    const {baseElement} =  await render(<ActivityInputs activityCategory='strength' inputs={undefined} />);
    expect (baseElement).toHaveTextContent("Weight");
    expect (baseElement).toHaveTextContent("Sets");
    expect (baseElement).toHaveTextContent("Reps");

    expect(() => handleChange()).not.toThrow();
  }); 
});


function handleChange(): any {
  console.log("change")
}

