import { render, wait } from '@testing-library/react';
import AddGymLocation from './AddGymLocation';
//import AcceptRejectPage from './AcceptReject'
const request = require('supertest');


test('renders without crashing', () => {
    const { baseElement } = render(<AddGymLocation />);
    expect(baseElement).toBeDefined();
});


////////// INTEGRATION TESTS //////////
/*
describe('Integration Tests', () => {
    
    test('rendering AddGymLocation', async () => {
        const {getByTestId } = render(<AddGymLocation />);
        // make sure the accept reject cards are displayed 
        expect(getByTestId('ar').innerHTML).toBeDefined()
    
    });
})*/