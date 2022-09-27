import { render } from '@testing-library/react';
import {BadgeCanvas } from './BadgeCanvas'

test('renders without crashing', async () => {
    const { baseElement } = render(<BadgeCanvas name="" rank="" emblem=''/>);
    expect(baseElement).toBeDefined();
  });


////TESTS TO BE PERFROMED////
/*

*/



