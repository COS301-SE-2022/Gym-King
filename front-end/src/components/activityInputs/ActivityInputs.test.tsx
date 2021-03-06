import { render } from '@testing-library/react';
import ActivityInputs from './ActivityInputs'

test('renders without crashing', () => {
    const { baseElement } = render(<ActivityInputs activityCategory='cardio' inputs={{input1:'00:23:00', input2:'3', input3:'4'}} />);
    expect(baseElement).toBeDefined();
  });


  ////TESTS TO BE PERFROMED////
/*
  - test that activtystates update when value in input boxes change (test handle change function)

*/
/*

describe('Testing prop text values', () => {

  test('correctly displays cardio activitytype inputs', async () => {
    const {baseElement} = render(<ActivityInputs activityCategory='CARDIO' inputs={{input1:'00:23:00', input2:'3', input3:'4'}} />);
    expect (baseElement).toHaveTextContent("Duration");
    expect (baseElement).toHaveTextContent("Distance");
    expect (baseElement).toHaveTextContent("Level of Difficulty");
  }); 
  test('correctly displays cardio activitytype inputs', async () => {
    const {baseElement} = render(<ActivityInputs activityCategory='STRENGTH' inputs={{input1:'00:23:00', input2:'3', input3:'4'}} />);
    expect (baseElement).toHaveTextContent("Weight");
    expect (baseElement).toHaveTextContent("Sets");
    expect (baseElement).toHaveTextContent("Reps");
  }); 
});

*/