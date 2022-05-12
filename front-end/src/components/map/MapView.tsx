import { IonButton, IonContent, IonLoading } from "@ionic/react";
import React, { useState } from "react"
import { Geolocation, Geoposition } from '@ionic-native/geolocation'
import { Map ,Overlay} from 'pigeon-maps'

const MapView: React.FC = () =>{
    const [loading, setLoading] = useState<boolean>(false);

    const getLocation = async() => {
        setLoading(true);
        try {
            const position = await Geolocation.getCurrentPosition();
          
            setUserLoc([position?.coords.latitude, position?.coords.longitude]) 
            setLoading(false);
            setCenter([position?.coords.latitude, position?.coords.longitude]) 
            
            setZoom(18) 

        } catch(e){
            setLoading(false);
        }
    }
    const [center, setCenter] = useState([0,0])
    const [zoom, setZoom] = useState(10)

    const [userLocation, setUserLoc] = useState([0,0])
    
    const [hue, setHue] = useState(0)

    return (
        
        <>
            <IonLoading 
                isOpen={loading}
                message={"Loading"}
                onDidDismiss={() => setLoading(false)}
            />
            <IonButton onClick={getLocation}></IonButton>
            
                <Map 
                    height={900}
                    center={[center[0],center[1]]}
                    zoom={zoom} 
                    
                    onBoundsChanged={({ center, zoom }) => { 
                        setCenter(center) 
                        setZoom(zoom) 
                    }} 
                    
                >
                    
                    <Overlay anchor={[userLocation[0],userLocation[1]]} offset={[30,30]} >
                    <img src='https://icons-for-free.com/iconfiles/png/512/svg+location+locator+map+navigation+user+user+location+icon-1320184910707394703.png' width={50} height={50} alt='' />
                    </Overlay>      
                </Map>
                
                
        </>
    )
}

export default MapView;