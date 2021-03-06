import { render } from '@testing-library/react';
import RadioGroup from './radioGroup';


test('renders without crashing', () => {
    const { baseElement } = render(<RadioGroup list={[]} val='' />);
    expect(baseElement).toBeDefined();
  });

////TESTS TO BE PERFROMED////
/*
*/

describe('Testing prop  values', () => {

    test('correctly displays brandname radio buttons', async () => {
      const {baseElement} = render(<RadioGroup list={[{g_id:"123", gym_brandname:"gym1"}, {g_id:"456", gym_brandname:"gym2"}]} val='' />);
      expect (baseElement).toHaveTextContent("gym1");
      expect (baseElement).toHaveTextContent("gym2");
    }); 

});