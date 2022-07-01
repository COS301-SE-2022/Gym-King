import { IonButton, IonLoading, IonToast } from "@ionic/react";
import React, { useState } from "react";
import { Geolocation } from '@ionic-native/geolocation';
import { Map ,Overlay} from 'pigeon-maps';
import { stamenToner } from 'pigeon-maps/providers';

import './MapView.css';
interface LocationError {
    showError: boolean;
    message?: String;

}


const MapView: React.FC = () =>{

    const [gyms, setGyms] = useState([{
        key: 0,
        g_id: "gS8C",
        gym_brandname: "",
        gym_address: "",
        gym_coord_lat: -0,
        gym_coord_long: 0,
        gym_icon: ".."
    }]);
    const [loading, setLoading] = useState<boolean>(false);

    const [center, setCenter] = useState([0,0])
    const [zoom, setZoom] = useState(10)

    const [error, setError] = useState<LocationError>({showError: false});
    const [userLocation, setUserLoc] = useState([0,0])

    //=========================================================================================================//
    /**
     * Function that gets the users location
     * makes use of google API
     * saves users location to a var
     */
    const getLocation = async() => {
        setLoading(true);
        try {
            const position = await Geolocation.getCurrentPosition();
          
            setUserLoc([position?.coords.latitude, position?.coords.longitude]) 
            setLoading(false);
            setCenter([position?.coords.latitude, position?.coords.longitude]) 
            
            setError({showError: false, message: "no error here"})
            setZoom(15) 

            getNearbyGyms();

        } catch(e){
            setLoading(false);
            
            setError({showError: true, message: "Cannot get userlocation: Check Permissions"});
        }
    }    
    //=========================================================================================================//
    /**
     * Function that gets the location of nearby gyms
     * @requires position users coordinates
     * @returns all nearby gyms
     */
    const getNearbyGyms = async () => {
        //=========================================================================================================//
        /**
         * POST request to get nearby gyms
         * makes use of gym-king API
         * @param userLocation
         */
        fetch('https://gym-king.herokuapp.com/gyms/aroundme',{
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                latCoord: userLocation[0],
                longCoord: userLocation[1],
                radius: 2
            })
        })
        .then(response =>response.json())
        .then(response =>{
            if(response.success){
                setGyms(response.results);
            }else{
                console.log(response.success)
                console.log(response.results)
            }
        })
        .catch(err => {console.log(err)})
    }
    const gymButtonClick=()=>{
        console.log("CLICKED")
        window.alert("The Gyms Menu will open Up");

    }
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
                provider={stamenToner}
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

                <Overlay 
                    anchor={[userLocation[0]*0.9995,userLocation[1]*0.9997]} 
                    offset={[30,30]} 
                    
                    >
                        
                        <img onClick={gymButtonClick} id = "GymPicture" src='https://www.seekpng.com/png/full/309-3093415_gym-building-sport-training-svg-png-icon-free.png' width={50} height={50} alt='' />
                </Overlay> 

                {gyms.map(item => {
                    return (
                        <Overlay 
                            anchor={[item.gym_coord_lat,item.gym_coord_long]} 
                            offset={[30,30]} 
                        > 
                            <img onClick={gymButtonClick} id = "GymPicture" src='https://www.seekpng.com/png/full/309-3093415_gym-building-sport-training-svg-png-icon-free.png' width={50} height={50} alt='' />
                        </Overlay> 
                    )                 
                })}

            </Map>
                
                
        </>
    )
}

export default MapView;