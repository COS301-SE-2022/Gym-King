import { render } from '@testing-library/react';
import {BadgeCanvas } from './BadgeCanvas'

test('renders without crashing', async () => {
    const { baseElement } =await  render(<BadgeCanvas name="name" rank="rank" emblem="emblem"/>);
    expect(baseElement).toBeDefined();
  });


////TESTS TO BE PERFROMED////
/*

*/



