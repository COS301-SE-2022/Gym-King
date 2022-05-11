import React, { FC }  from 'react';
import {fromLonLat} from 'ol/proj';
import {Point} from 'ol/geom';
import 'ol/ol.css';
import {RMap, ROSM, RLayerVector, RFeature, ROverlay, RStyle} from 'rlayers';

import './MapView.css'
const MapView: React.FC = () => {
    return(
        <>
    // Create a map, its size is set in the CSS class example-map
    <RMap className='example-map' initial={{ center: [2.364,48.82], zoom: 11}}>
        {/* Use an OpenStreetMap background */}
        <ROSM />
        {/* Create a single layer for holding vector features */}
        <RLayerVector zIndex={10}>
            {/* Create a style for rendering the features */}
            <RStyle.RStyle>
                {/* Consisting of a single icon, that is slightly offset
                *so that its center falls over the center of the feature */}
            </RStyle.RStyle>
            {/* Create a single feature in the vector layer */}
            <RFeature
                geometry={new Point(fromLonLat([2.295, 48.8737]))}
                onClick={(e: any) =>
                    e.map.getView().fit(e.target.getGeometry().getExtent(), {
                        duration: 250,
                        maxZoom: 15
                    })
                }
            >
                {/* The icon is an SVG image that represents the feature on the map
                while an overlay allows us to add a normal HTML element over the feature */}
                <ROverlay className='example-overlay'>
                    Arc de Triomphe
                    <br />
                    <em>&#11017; click to zoom</em>
                </ROverlay>
            </RFeature>
        </RLayerVector>
    </RMap>
    </>
    );
};
export default MapView;