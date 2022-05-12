import { IonButton, IonContent, IonLoading } from "@ionic/react";
import React, { useState } from "react"
import { Geolocation, Geoposition } from '@ionic-native/geolocation'
import { Map ,Marker} from 'pigeon-maps'

const MapView: React.FC = () =>{
    const [loading, setLoading] = useState<boolean>(false);
    const [position, setPosition] = useState<Geoposition>();

    const getLocation = async() => {
        setLoading(true);
        try {
            const position = await Geolocation.getCurrentPosition();
            setPosition(position);
            setLoading(false);
            setCenter([Number(position?.coords.latitude), Number(position?.coords.longitude)]) 

        } catch(e){
            setLoading(false);
        }
    }
    const [center, setCenter] = useState([-22, 28.2314])
    const [zoom, setZoom] = useState(10)
    
    const [hue, setHue] = useState(0)

    return (
        
        <>
            <IonLoading 
                isOpen={loading}
                message={"Loading"}
                onDidDismiss={() => setLoading(false)}
            />
            <IonButton onClick={getLocation}></IonButton>
            <IonContent >
                <Map 
                    height={900}
                    center={[center[0],center[1]]}
                    zoom={zoom} 
                    onBoundsChanged={({ center, zoom }) => { 
                        setCenter(center) 
                        setZoom(zoom) 
                    }} 
                    
                >
                    
                        
                </Map>
                
                
            </IonContent>
        </>
    )
}

export default MapView;