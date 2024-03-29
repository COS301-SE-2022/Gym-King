jest.setTimeout(250000)
import { render } from '@testing-library/react';
import ApprovalButton from './approvalButton'

test('renders without crashing', async() => {
    const { baseElement } =await render(<ApprovalButton userID={0} username="" badgeId=""  profile=""/>);
    expect(baseElement).toBeDefined();
  });

////TESTS TO BE PERFROMED////
/*
  - tests that onClick button redirects to accept reject page 
  - test that local storage values are set (email, badgeid and username)
  - test that image displays correcty ?
*/

describe('Testing prop text values',  () => {

  test('correctly displays cardio activitytype inputs',  async() => {
    const {baseElement} = await render(<ApprovalButton userID={2} username='user1@example.com' badgeId='3' profile=""/>);
    expect (baseElement).toHaveTextContent("user1@example.com");
  }); 
});