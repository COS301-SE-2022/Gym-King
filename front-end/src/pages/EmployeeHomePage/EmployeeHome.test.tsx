import { render } from '@testing-library/react';
import EmployeeHomePage from './EmployeeHome';

////TESTS TO BE PERFORMED////
/*
*/

test('renders without crashing', async() => {
    const { baseElement } =await render(<EmployeeHomePage />);
    expect(baseElement).toBeDefined();
});


/*
describe('Integration Tests', () => {
    
    test('sending in a list of activity types displays correctly as a segment button', async () => {
        const {getByTestId } = render(<EmployeeHomePage />);
    
        expect(getByTestId('bm').innerHTML).toBeDefined()
    });

})*/