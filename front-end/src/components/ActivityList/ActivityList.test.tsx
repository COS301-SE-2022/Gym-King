import { render } from '@testing-library/react';
import ActivityList from './ActivityList'

test('renders without crashing', () => {
    const { baseElement } = render(<ActivityList activityCategory='cardio' i1='00:23:00' i2='3' i3='4' />);
    expect(baseElement).toBeDefined();
  });


////TESTS TO BE PERFROMED////
/*

*/


describe('Testing prop text values', () => {

  test('correctly displays cardio activitytype inputs', async () => {
    const {baseElement} = render(<ActivityList activityCategory='cardio' i1='00:23:00' i2='3' i3='4'/>);
    expect (baseElement).toHaveTextContent("Duration");
    expect (baseElement).toHaveTextContent("Distance");
    expect (baseElement).toHaveTextContent("Level of Difficulty");
  }); 
  test('correctly displays cardio activitytype inputs', async () => {
    const {baseElement} = render(<ActivityList activityCategory='STRENGTH' i1='00:23:00' i2='3' i3='4' />);
    expect (baseElement).toHaveTextContent("Weight");
    expect (baseElement).toHaveTextContent("Sets");
    expect (baseElement).toHaveTextContent("Reps");
  }); 
  test('correctly displays inputs', async () => {
    const {baseElement} = render(<ActivityList activityCategory='STRENGTH' i1='00:23:00' i2='3' i3='4' />);
    expect (baseElement).toHaveTextContent("00:23:00");
    expect (baseElement).toHaveTextContent("3");
    expect (baseElement).toHaveTextContent("4");
  }); 
});