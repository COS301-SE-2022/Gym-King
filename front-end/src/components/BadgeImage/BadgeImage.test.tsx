import { render } from '@testing-library/react';
import { BadgeImage } from './BadgeImage'

test('renders without crashing', () => {
    const { baseElement } = render(<BadgeImage Badgerank='' BadgeEmblem='' idEmblem='' idRank='s'/>);
    expect(baseElement).toBeDefined();
  });


////TESTS TO BE PERFROMED////
/*

*/



