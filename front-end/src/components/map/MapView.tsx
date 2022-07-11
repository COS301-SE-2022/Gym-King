import { IonLoading, IonToast } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Geolocation } from '@ionic-native/geolocation';
import { Map ,Overlay} from 'pigeon-maps';
import { stamenToner } from 'pigeon-maps/providers';

import { DeviceMotion, DeviceMotionAccelerationData } from '@awesome-cordova-plugins/device-motion/ngx';


import './MapView.css';
interface LocationError {
    showError: boolean;
    message?: String;

}


const MapView: React.FC = () =>{

    const maxZoom = 18
    const minZoom = 13
    const [gyms, setGyms] = useState<{[key: string]: any}>([{
        key: "",
        g_id: "",
        gym_brandname: "",
        gym_address: "",
        gym_coord_lat: 0,
        gym_coord_long: 0,
        gym_icon: ".."
    }]);
    const [loading, setLoading] = useState<boolean>(false);

    const [center, setCenter] = useState([0,0])
    const [zoom, setZoom] = useState(10)
    const [first, setFirst] = useState(true)

    const [error, setError] = useState<LocationError>({showError: false});
    const [userLocation, setUserLoc] = useState([0,0])

    //=========================================================================================================//
    /**
     * Function that gets the users location
     * makes use of google API
     * saves users location to a var
     */
    const getLocation = async(load: boolean) => {
        try {
            
        if(load) {setLoading(true)};
            const position = await Geolocation.getCurrentPosition();
          
            setUserLoc([position.coords.latitude, position.coords.longitude]) 

            if(load){
                setCenter([position?.coords.latitude, position?.coords.longitude]) 
                setZoom(15) 
            }

            setError({showError: false, message: "no error here"})
     
            setLoading(false);

        } catch(e){
            setLoading(false);
            
            setError({showError: true, message: "Cannot get userlocation: Check Permissions"});
        }
    }    

    
    const gymButtonClick=async ()=>{
        window.alert("The Gyms Menu will open Up");
        window.location.href = "http://localhost:3000/Login";

    }

    const MINUTE_MS = 1333;
    useEffect(() => {

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
                    latCoord: center[0],
                    longCoord: center[1],
                    radius: Math.pow(1.5,(18-zoom))
                })
            })
            .then(response =>response.json())
            .then(response =>{
                
                if(response.success){
                    console.info(Math.pow(1.5,(18-zoom)))
                    console.info(response.results)
                    setGyms(response.results);
    
                }else{
                    console.log(response.success)
                    console.log(response.results)
                }
            })
            .catch(err => {
                console.log(err);
            })
        }



        if(first) getLocation(true);
        const interval = setInterval(() => {
            if(first){setFirst(false)}
            console.log("Map Refresh")

            getLocation(false);
            
            getNearbyGyms();
        }, MINUTE_MS);
        
        return () => 
        {
            clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
        }
    }, [userLocation,center,first])
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
            <Map 
                provider={stamenToner}
                height={900}
                center={[center[0],center[1]]}
                zoom={zoom} 
                maxZoom={17}
                minZoom={11}
                zoomSnap={false}
                onBoundsChanged={({ center, zoom }) => { 
                    setCenter(center) ;
                    setZoom(zoom) ;
                }} 
                
            >
                
                <Overlay anchor={[userLocation[0],userLocation[1]]} offset={[30,30]} >
                <img src='https://icons-for-free.com/iconfiles/png/512/svg+location+locator+map+navigation+user+user+location+icon-1320184910707394703.png' width={50} height={50} alt='' />
                </Overlay>      

                {gyms.map((item: { gym_coord_lat: number; gym_coord_long: number; }) => {
                    return (
                        <Overlay 
                            key="{item}"
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
