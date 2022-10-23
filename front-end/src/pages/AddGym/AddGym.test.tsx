jest.setTimeout(25000)
import {render} from '@testing-library/react';
import AddGym from './AddGym';
/*UNIT TESTING*/


//test if pages rendered without causing the application to crash
test('renders without crashing', async() => {
    const { baseElement } = await render(<AddGym />);
    expect(baseElement).toBeDefined();
});
