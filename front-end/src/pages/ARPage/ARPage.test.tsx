import { render, wait } from '@testing-library/react';
import ARPage from './ARPage';
//import AcceptRejectPage from './AcceptReject'
const request = require('supertest');


test('renders without crashing', () => {
    const { baseElement } = render(<ARPage />);
    expect(baseElement).toBeDefined();
});

////////// INTEGRATION TESTS //////////
/*
describe('Integration Tests', () => {
    
    test('rendering AddGymLocation', async () => {
        const {getByTestId } = render(<ARPage />);
        // make sure the accept reject cards are displayed 
        expect(getByTestId("a").innerHTML).toBeDefined()
    
    });
})*/