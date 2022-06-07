import { render } from '@testing-library/react';
import { DropDown } from './dropdown'

test('renders without crashing', () => {
    const { baseElement } = render(<DropDown list={['Strength', "Cardio"]} />);
    expect(baseElement).toBeDefined();
});


////TESTS TO BE PERFROMED////
/*
- Renders without crashing 
- tests that there are the right amount of ion-options 
- tests that the ion-options display the right names - what is passed in as props 
- tests that onChange method works 
*/