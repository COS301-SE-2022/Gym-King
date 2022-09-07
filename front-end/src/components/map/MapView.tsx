import { createAnimation, IonButton,  IonButtons,  IonCard,  IonCardContent,  IonCardHeader,  IonCardTitle,  IonContent,  IonIcon,  IonLoading, IonModal, IonToast, useIonViewDidEnter } from "@ionic/react";
import React, {  useEffect, useState } from "react";
import { Geolocation } from '@capacitor/geolocation';
import { Map ,Overlay} from 'pigeon-maps';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import gym from '../../icons/gym.png'
import location from '../../icons/location.png'
import recenter from '../../icons/recenter.png'
import './MapView.css';
import GymSearchBar from "../GymSearchBar/GymSearchBar";


interface LocationError {
    showError: boolean;
    message?: String;

}



const MapView: React.FC = () =>{
    let history=useHistory()

    //=========================================================================================================//
    //                                                       MAP                                               //
    //=========================================================================================================//
    const maxZoom = 20
    const minZoom = 14
    const [gyms, setGyms] = useState<{[key: string]: any}>();

    const [gymsInView, setGymsinView] = useState<{[key: string]: any}>([{key:"xxx",g_id:"xxx"}]);
    const [gymsInSearchTab, setGymsInSearchTab] = useState<any[]>([]);
    
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

    const [gymData, setGymData]=useState({
        g_id: "",
        gym_brandname: "",
        gym_address: "",
        gym_coord_lat: 0,
        gym_coord_long: 0,
        gym_icon: ".."
    });


    //=========================================================================================================//
    /**
     * used to search the list of gyms for the specefed query
     */
    const searchQuery = async(query: string) => {
        gyms?.forEach((element: any) => {
            console.log(element);
        });
    }
    
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

            Geolocation.checkPermissions().then(
                result => {
                    if(result==null) Geolocation.requestPermissions()
                    else console.log("permissions granted")
                },
                err =>{ 
                    console.log(err)
                    Geolocation.requestPermissions()
                },
                
            );  
            
            const position = await Geolocation.getCurrentPosition({
                enableHighAccuracy: true
            });
          
            setUserLoc([position.coords.latitude, position.coords.longitude]) 

            if(load){
                setCenter([position?.coords.latitude, position?.coords.longitude]) 
                setZoom(17.4) 
            }

            setError({showError: false, message: "no error here"})
     
            setLoading(false);

        } catch(e){
            setLoading(false);
            setError({showError: true, message: " Please Enable your GPS location"});
        }
    }  
    const gymButtonClick=async (activeGym:any)=>{
        // Set Pop Menus data
        setGymData(activeGym);
        setShowModal(true);
    }

    //=========================================================================================================//
    /**
     * Function that gets the location of nearby gyms
     * @requires position users coordinates
     * @returns all nearby gyms
     */    
    const getNearbyGyms = async () => {

        let outGyms: {                    
            g_id: any; 
            gym_coord_lat: number;
            gym_coord_long: number; 
        }[] = [];

        if(gyms){

            for(let x = 0;x<5;x++){
                let closetGym:any;

                gyms.forEach((elementx: {
                    g_id: any; 
                    gym_coord_lat: number;
                    gym_coord_long: number;
                }) => {


                    let isAlreadyInList = false;

                    outGyms.forEach((elementy: { g_id: any; }) => {
                        if(elementy.g_id===elementx.g_id){
                            isAlreadyInList = true;
                        }
                    });

                    if(!isAlreadyInList){
                        if(closetGym==null)
                            closetGym = elementx;
                        else{
                            var newMag = calcCrow(userLocation[0],userLocation[1],elementx.gym_coord_lat,elementx.gym_coord_long)
                            var oldMag = calcCrow(userLocation[0],userLocation[1],closetGym.gym_coord_lat,closetGym.gym_coord_long)
                            if(oldMag > newMag){
                                closetGym = elementx;
                            }       
                        }

                    }

                });
                if(closetGym!=null)
                    outGyms.push(closetGym)
            }

            setGymsInSearchTab(outGyms);
        }
        
    }

    const getAllGyms = async() => {
        if(!postWaiting){
            setPostWaiting(true);
            axios(process.env["REACT_APP_GYM_KING_API"]+'/gyms/getAllGyms',{
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                }
            })
            .then(response =>response.data)
            .then(response =>{
                
                if(response.success){
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


    //=============================================================================================//
    //Helper Functions 
    //=============================================================================================//
   

    //=========================================================================================================//
    /**
     * Converts numeric degrees to radians
     * @param {float} Value a value in degree format
     * @returns {float} value in radians
     */
    function toRad(Value:any) 
    {
        return Value * Math.PI / 180;
    }
   
    //=========================================================================================================//
    /**
     * Helper functions to get the distance between two coordinates
     * @param {float} lat1 = toX
     * @param {float} lon1
     * @param {float} lat2
     * @param {float} lon2
     * @returns {float} distance between points 
     */
    function calcCrow(lat1: number, lon1: number, lat2: number, lon2: number)  
    {
      var R = 6371; // km
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var latNew1 = toRad(lat1);
      var latNew2 = toRad(lat2);
  
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(latNew1) * Math.cos(latNew2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }
 
    //=========================================================================================================//
    /**
     * 
     * 
     */
    function setGymsInMapView() 
    {   
        let rad =  (18-zoom);
        let outGyms:any = [];
        let lat= center[0];
        let long = center[1];
        gyms?.forEach((element: { gid: string; gym_coord_lat: number; gym_coord_long: number; key: string;}) => {
            // get magnitde between user and each gym coordinate
            let magnitude = calcCrow(lat,long,element.gym_coord_lat,element.gym_coord_long);
            // If magnitude is within radius then add it to the results
            if(magnitude <= rad){
                outGyms.push(element);
            }
        });
        console.log(outGyms)
        setGymsinView(outGyms);
    }

    
    useEffect(() => {

        const interval = setInterval(() => {
            if(first) {
                getLocation(first);
                setRefresh(10000);
                setFirst(false);
                getAllGyms();
            }
            else    
                getLocation(false);

            //console.log("Map Refresh")

            setGymsInMapView();
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

    const mapTiler =(x: number, y: number, z: number, dpr?: number)=> {
        return `https://api.maptiler.com/maps/voyager/${z}/${x}/${y}.png?key=GhihzGjr8MhyL7bhR5fv`
    }
    return (
        
        <>  
            <IonContent  overflow-scroll="false" >
                
            <GymSearchBar 
                gyms={gymsInSearchTab} 
                nearByCallBack = {() =>{
                        setShowModal(false);
                        getNearbyGyms()
                    }
                }
                searchCallBack = {(searchQuery:string) => {
                        console.log(searchQuery)
                    }
                }
            />
                
                
            <IonLoading 
                isOpen={loading}
                message={"Loading"}
                onDidDismiss={() => setLoading(false)}
                spinner={"circles"}
                cssClass="spinner"
            />
            <IonToast
                isOpen={error.showError}
                message={String(error.message)}
                
                onDidDismiss={() => setError({showError: false, message: "no error here"})}
                duration={3000}
            />

            <Map 
                provider={mapTiler}
                center={[center[0],center[1]]}
                zoom={zoom} 
                maxZoom={maxZoom}
                minZoom={minZoom}
                zoomSnap={false}
                onBoundsChanged={({ center, zoom }) => { 
                    setCenter(center) ;
                    setZoom(zoom) ;
                    setShowModal(false)
                    setGymsInMapView();
                }} 
                onAnimationStart={()=>{
                                
                    setShowModal(false)
                }}
                onClick={()=>{
                     
                    setShowModal(false)
                }}        
            >
                <IonButton shape="round" id="float" onClick={() => { 
                    
                    getLocation(true)
                    setGymsInMapView()
                }}>

                    <img id = "btnIcon"  src={recenter} ></img>
                </IonButton>
                <Overlay anchor={[userLocation[0],userLocation[1]]} offset={[25,30]} >
                <img src={location} width={50} height={50} alt='' />
                </Overlay>      
                {gymsInView.map((item: {key:string; gid:string; gym_coord_lat: number; gym_coord_long: number;gym_brandname:string;}) => {
                    return (
                        <Overlay 
                            key={item.key}
                            anchor={[item.gym_coord_lat,item.gym_coord_long]} 
                            offset={[15,31]} 
                            
                        > 
                            <img onClick={() => {gymButtonClick(item)}} id ="GymPicture" src={gym} alt='' />
                        </Overlay>
                    )                 
                })}

                
            

            </Map>

            <IonModal  id = "overlay" showBackdrop = {false} backdropDismiss={true}  isOpen={showModal} enterAnimation={enterAnimation} leaveAnimation={leaveAnimation}>
        
            {/* <IonBadge > */}
                <IonCard style={{"margin":"0px", "height":"100%"}}  >
                    <IonCardHeader>
                        <IonCardTitle className='center Subheading'>{gymData.gym_brandname}</IonCardTitle>
                    </IonCardHeader >
                    <IonCardContent id="buttonBox" >
                        <IonButtons>
                            <IonButton  
                                shape='round' 
                                color="dark"
                                className='btnView'
                                onClick={()=>{

                                    sessionStorage.setItem('gym_brandname',gymData.gym_brandname);
                                    sessionStorage.setItem('gym_address',gymData.gym_address);
                                    sessionStorage.setItem('gid',gymData.g_id);
                                    setShowModal(false);
                                    history.push("/GymPage");
                                    
                                }}
                            >
                                View
                            </IonButton>
                            <IonButton onClick={()=>setShowModal(false)} shape='round' className='btnClose' color="light">Close</IonButton>
                        </IonButtons>
                    
                    </IonCardContent>
                </IonCard>
            {/* </IonBadge > */}
            
            </IonModal>   
            </IonContent>
        </>
    )
}

export default MapView;
