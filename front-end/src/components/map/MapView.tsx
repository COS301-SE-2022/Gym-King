import { IonButton, IonLoading, IonToast } from "@ionic/react";
import React, { useState } from "react"
import { Geolocation } from '@ionic-native/geolocation'
import { Map ,Overlay} from 'pigeon-maps'

interface LocationError {
    showError: boolean;
    message?: String;

}

const MapView: React.FC = () =>{
    const [loading, setLoading] = useState<boolean>(false);

    const [center, setCenter] = useState([0,0])
    const [zoom, setZoom] = useState(10)

    const [error, setError] = useState<LocationError>({showError: false});
    const getLocation = async() => {
        setLoading(true);
        try {
            const position = await Geolocation.getCurrentPosition();
          
            setUserLoc([position?.coords.latitude, position?.coords.longitude]) 
            setLoading(false);
            setCenter([position?.coords.latitude, position?.coords.longitude]) 
            
            setError({showError: false, message: "no error here"})
            setZoom(18) 

        } catch(e){
            setLoading(false);
            
            setError({showError: true, message: "Cannot get user location: Check Permissions"});
        }
    }
    const [userLocation, setUserLoc] = useState([0,0])

    return (
        
        <>
            <IonLoading 
                isOpen={loading}
                message={"Loading"}
                onDidDismiss={() => setLoading(false)}
            />
            <IonToast
                isOpen={error.showError}
                message={String(error.message)}
                
                onDidDismiss={() => setError({showError: false, message: "no error here"})}
                duration={3000}
            />

            <IonButton onClick={getLocation}>CLICK ME!</IonButton>
            
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