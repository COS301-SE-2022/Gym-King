import { render, wait } from '@testing-library/react';
import AddGymLocation from './AddGymLocation';
//import AcceptRejectPage from './AcceptReject'
const request = require('supertest');


test('renders without crashing', () => {
    const { baseElement } = render(<AddGymLocation />);
    expect(baseElement).toBeDefined();
});

describe('Testing API calls', () => {

    it('should load claim data', async () => {
        (()=>{
            
        })
    });

    it('should load claim data', async () => {
        (()=>
        {
            
        })
    });
  })


////////// INTEGRATION TESTS //////////
/*
describe('Integration Tests', () => {
    
    test('rendering the map', async () => {
        const {getByTestId } = render(<AddGymLocation />);
        // make sure the accept reject cards are displayed 
        expect(getByTestId('sgm').innerHTML).toBeDefined()
    
    });
})*/