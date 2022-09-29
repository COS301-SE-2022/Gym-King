jest.setTimeout(25000)
import { render} from '@testing-library/react';
import AppSettingsPage from './AppSettingsPage';

////TESTS TO BE PERFORMED////
/*
*/

test('render without crashing', async() => {
  const{baseElement} =await render(<AppSettingsPage/>);
  expect(baseElement).toBeDefined();
});
