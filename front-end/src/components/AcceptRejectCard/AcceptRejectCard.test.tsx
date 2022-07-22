import { render } from '@testing-library/react';
import ActivityList from '../ActivityList/ActivityList';
import AcceptRejectCard from './AcceptRejectCard'


test('renders without crashing', () => {
    const { baseElement } = render(<AcceptRejectCard userID="" username="" badgeId="" badgename="" i1="" i2="" i3="" activitytype="" history=""/>);
    expect(baseElement).toBeDefined();
  });


////TESTS TO BE PERFROMED////
/*
  - test if the accept button works 
  - test if the reject button works 
  - test if badge image displays
  - test if proof displays 
*/

describe('Testing prop text values', () => {
  let username = "user1"
  let activitytype = "STRENGTH";
  let badgename = "Badge"

  test('correctly displays username', async () => {
      const {baseElement} = render(<AcceptRejectCard userID="" username={username} badgeId="" badgename="" i1="" i2="" i3="" activitytype="" history="" />);
      expect (baseElement).toHaveTextContent(username);
  });
  test('correctly displays strength activitytype inputs', async () => {
    const {baseElement} = render(<AcceptRejectCard userID="" username="" badgeId="" badgename="" i1="" i2="" i3="" activitytype="STRENGTH" history="" />);
    expect (baseElement).toHaveTextContent("Weight");
    expect (baseElement).toHaveTextContent("Sets");
    expect (baseElement).toHaveTextContent("Reps");
  });
  test('correctly diplays input values', async () => {
    const {baseElement} = render(<AcceptRejectCard userID="" username="" badgeId="" badgename="" i1="1" i2="2" i3="3" activitytype="Strength"  history=""/>);
    expect (baseElement).toHaveTextContent("1");
    expect (baseElement).toHaveTextContent("2");
    expect (baseElement).toHaveTextContent("3");
  });
  /*
  test('correctly displays cardio activitytype inputs', async () => {
    const {baseElement} = render(<AcceptRejectCard userID="" username="" badgeId="" badgename="" i1="" i2="" i3="" activitytype="CARDIO" />);
    expect (baseElement).toHaveTextContent("Duration");
    expect (baseElement).toHaveTextContent("Distance");
    expect (baseElement).toHaveTextContent("Level of Difficulty");
  });  */

  test('correctly displays badgename', async () => {
    const {baseElement} = render(<AcceptRejectCard userID="" username="" badgeId="" badgename="badge" i1="" i2="" i3="" activitytype="" history=""/>);
    expect (baseElement).toHaveTextContent("badge");
  });
});

