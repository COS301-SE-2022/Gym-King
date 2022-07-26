import { render } from '@testing-library/react';
import { MyBadgeGrid } from './MyBadgeGrid'

test('renders without crashing', () => {
    const { baseElement } = render(<MyBadgeGrid badges={[]} filters={[]} sort={""} />);
    expect(baseElement).toBeDefined();
  });


////TESTS TO BE PERFROMED////
/*

*/


