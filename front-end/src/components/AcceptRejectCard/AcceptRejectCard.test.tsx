import { render } from '@testing-library/react';
import AcceptRejectCard from './AcceptRejectCard'

test('renders without crashing', () => {
    const { baseElement } = render(<AcceptRejectCard userID={0} username="username" badge={{name:"cardio champ"}}/>);
    expect(baseElement).toBeDefined();
  });
