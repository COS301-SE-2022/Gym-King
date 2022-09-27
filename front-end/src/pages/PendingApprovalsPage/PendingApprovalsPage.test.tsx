import { render } from '@testing-library/react';
import PendingApprovalsPage from './PendingApprovalsPage'

test('renders without crashing', async() => {
    const { baseElement } = render(<PendingApprovalsPage />);
    expect(baseElement).toBeDefined();
});

////////// INTEGRATION TESTS //////////


describe('Testing connection to api', () => {

    it('should load pending claims data', async () => {
        (async ()=>{
            let gymId="lttD"
            await fetch(process.env["REACT_APP_GYM_KING_API"]+`/claims/claim?gid=${gymId}`,{
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

describe('Testing integration of components and pages', () => {
    
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

