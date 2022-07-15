import { createAnimation, CreateAnimation, IonBadge, IonButton,  IonCard,  IonCardContent,  IonCardHeader,  IonCardTitle,  IonHeader,  IonLoading, IonModal, IonText, IonTitle, IonToast } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Geolocation } from '@ionic-native/geolocation';
import { Map ,Overlay} from 'pigeon-maps';
import { stamenToner } from 'pigeon-maps/providers';

import gym from '../../icons/gym.png'
import location from '../../icons/location.png'
import recenter from '../../icons/recenter.png'
import './MapView.css';
interface LocationError {
    showError: boolean;
    message?: String;

}

const MapView: React.FC = () =>{
    
    //=========================================================================================================//
    //                                                       MAP                                               //
    //=========================================================================================================//
    const maxZoom = 17.4
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

    // Location Vars------------------------------------------------------------------------------------------//
    const [postWaiting, setPostWaiting] = useState<boolean>(false);
    const [center, setCenter] = useState([0,0])
    const [zoom, setZoom] = useState(10)
    const [first, setFirst] = useState(true)

    const [refresh, setRefresh] = useState(10)

    const [error, setError] = useState<LocationError>({showError: false});
    const [userLocation, setUserLoc] = useState([0,0]);

    // Gym Menu Vars -----------------------------------------------------------------------------------------------//
    const [hidden, setHidden] = useState<boolean>(true);
    const [gymMenuName, setgymMenuName] = useState<string>("");

    //=========================================================================================================//
    /**
     * Function that gets the users location
     * makes use of google API
     * saves users location to a var
     */
    const getLocation = async(load: boolean) => {
        try {
            
            if(load) {
                setLoading(true)
                
            };
            const position = await Geolocation.getCurrentPosition();
          
            setUserLoc([position.coords.latitude, position.coords.longitude]) 

            if(load){
                setCenter([position?.coords.latitude, position?.coords.longitude]) 
                setZoom(17.4) 
            }

            setError({showError: false, message: "no error here"})
     
            setLoading(false);

        } catch(e){
            setLoading(false);
            
            setError({showError: true, message: "Cannot get userlocation: Check Permissions"});
        }
    }    

    
    const gymButtonClick=async (name:string)=>{
        // Set Pop Menus data

        setgymMenuName(name)
        setShowModal(true)
        // 
        setHidden(false)
        setTimeout(() => {  }, 100);
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
        if(!postWaiting){
            setPostWaiting(true);
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
                    setPostWaiting(false);

                }else{
                    console.log(response.success)
                    console.log(response.results)
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
        
    }
    
    useEffect(() => {

        const interval = setInterval(() => {
            getLocation(first);
            if(first){
                setFirst(false)
                setRefresh(10000)
            }
            console.log("Map Refresh")

            
            getNearbyGyms();
        }, refresh);
        
        return () => 
        {
            clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
        }
    })


    const [showModal, setShowModal] = useState(false);

    const enterAnimation = (baseEl: any) => {
        const root = baseEl.shadowRoot;

        const backdropAnimation = createAnimation()
        .addElement(root.querySelector('ion-backdrop')!)
        .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

        const wrapperAnimation = createAnimation()
        .addElement(root.querySelector('.modal-wrapper')!)
        .keyframes([
            { offset: 0, opacity: '0', transform: 'scale(0)' },
            { offset: 1, opacity: '0.99', transform: 'scale(1)' }
        ]);

        return createAnimation()
        .addElement(baseEl)
        .easing('ease-out')
        .duration(500)
        .addAnimation([backdropAnimation, wrapperAnimation]);
    }

    const leaveAnimation = (baseEl: any) => {
        return enterAnimation(baseEl).direction('reverse');
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

            <Map 
                provider={stamenToner}
                center={[center[0],center[1]]}
                zoom={zoom} 
                maxZoom={maxZoom}
                minZoom={minZoom}
                zoomSnap={false}
                onBoundsChanged={({ center, zoom }) => { 
                    setCenter(center) ;
                    setZoom(zoom) ;
                    
                    getLocation(false)
                    getNearbyGyms()
                    setShowModal(false)
                }} 
                onAnimationStart={()=>{
                                
                    setShowModal(false)
                }}
                onClick={()=>{
                                
                    setShowModal(false)
                }}
                
                
            >
                <button id="float" onClick={() => { 
                    
                    getLocation(true)
                    getNearbyGyms()
                }}>
                    <i id="fa fa-plus my-float"></i>
                    <img src={recenter} alt =""></img>
                </button>
                <Overlay anchor={[userLocation[0],userLocation[1]]} offset={[25,30]} >
                <img src={location} width={50} height={50} alt='' />
                </Overlay>      
                {gyms.map((item: { gym_coord_lat: number; gym_coord_long: number; gid:string;gym_brandname:string;}) => {
                    return (
                        <Overlay 
                            key={item.gid}
                            anchor={[item.gym_coord_lat,item.gym_coord_long]} 
                            offset={[15,31]} 
                            
                        > 
                            <img onClick={() => {gymButtonClick(item.gym_brandname)}} id ="GymPicture" src={gym} alt='' />
                        </Overlay> 
                    )                 
                })}

                
            

            </Map>

            <IonModal id = "overlay" isOpen={showModal} enterAnimation={enterAnimation} leaveAnimation={leaveAnimation}>
        
            {/* //<IonBadge > */}
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle className='center '>{gymMenuName}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonButton  className=" btnLogin ion-margin-top" type="submit" expand="block">View Gym</IonButton>
                    </IonCardContent>
                </IonCard>
            {/* </IonBadge> */}
            
            </IonModal>      
        </>
    )
}

export default MapView;
