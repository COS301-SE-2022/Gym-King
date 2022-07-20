import {fireEvent, render, screen} from '@testing-library/react';
import AppSettingsPage from './AppSettingsPage';

////TESTS TO BE PERFORMED////
/*
*/

test('render without crashing', () => {
  const{baseElement} = render(<AppSettingsPage/>);
  expect(baseElement).toBeDefined();
});
