jest.setTimeout(2500-0)
import { render } from '@testing-library/react';
import { BadgeImage } from './BadgeImage'

test('renders without crashing', async() => {
    const { baseElement } =await render(<BadgeImage Badgerank='' BadgeEmblem='' idEmblem='' idRank='s'/>);
    expect(baseElement).toBeDefined();
  });


////TESTS TO BE PERFROMED////
/*

*/



