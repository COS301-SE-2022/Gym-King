jest.setTimeout(25000)
import { render} from '@testing-library/react';
import AppSettingsPage from './AppSettingsPage';

////TESTS TO BE PERFORMED////
/*
*/

//tests to see if the page renders without crashing
test('render without crashing', async() => {
  const{baseElement} =await render(<AppSettingsPage/>);
  expect(baseElement).toBeDefined();
});
