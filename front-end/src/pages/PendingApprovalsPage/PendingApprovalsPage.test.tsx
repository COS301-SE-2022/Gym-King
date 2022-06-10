import { render } from '@testing-library/react';
import PendingApprovalsPage from './PendingApprovalsPage'

test('renders without crashing', () => {
    const { baseElement } = render(<PendingApprovalsPage />);
    expect(baseElement).toBeDefined();
});


describe('Testing API calls', () => {

    it('should load pending claims data', async () => {
        (()=>{
            let gymId="lttD"
            fetch(`https://gym-king.herokuapp.com/claims/claim?gid=${gymId}`,{
                "method":"GET"
            })
            .then(response =>response.json())
            .then(response =>{
                expect (response).toBeDefined
            })
            .catch(err => {
                expect (err).toBeDefined
            })
        })
    });

})

describe('Integration Tests', () => {
    
    test('displays toolbar', async () => {
        const {getByTestId } = render(<PendingApprovalsPage />);
    
        expect(getByTestId('tb').innerHTML).toBeDefined()
    });
/*
    test('sending in a list of claims loads approval buttons', async () => {
        const {getByTestId } = render(<PendingApprovalsPage />);
        
        expect(getByTestId('aB')).toBeDefined()
    }); */
})

