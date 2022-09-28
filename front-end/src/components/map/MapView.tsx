import { createAnimation, IonButton,  IonButtons,  IonCard,  IonCardContent,  IonCardHeader,  IonCardTitle,  IonContent,  IonLoading, IonModal, IonToast } from "@ionic/react";
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
import  stringSimilarity  from "string-similarity-js";
interface LocationError {
    showError: boolean;
    message?: String;

}



const MapView: React.FC = () =>{
    let history=useHistory()

    // state that controls the selectedGymMenu display
    const [showModal, setShowModal] = useState(false);

    

    //=========================================================================================================//
    //                                                       MAP                                               //
    //=========================================================================================================//
    const maxZoom = 20
    const minZoom = 14
    const [gyms, setGyms] = useState<{[key: string]: any}>();
    const [gymsInView, setGymsinView] = useState<{[key: string]: any}>([{key:"xxx",g_id:"xxx"}]);
    
    
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
        gym_name:"",
        gym_brandname: "",
        gym_address: "",
        gym_coord_lat: 0,
        gym_coord_long: 0,
        gym_icon: ".."
    });
    
    const [gymsInSearchTab, setGymsInSearchTab] = useState<any[]>([]);
    
    



    //=========================================================================================================//
    /**
     * used to search the list of gyms for the specefed query
     */
    const searchQueryAction = async(query: string) => {

        // the list of gyms that match the search query
        let outGyms: {                    
            g_id: any; 
            gym_coord_lat: number;
            gym_coord_long: number; 
        }[] = [];

        // check if query is not empty
        if(query.length > 0){
            // loop through all the gyms in memory
            gyms?.forEach((element: any) => {


                    // set all strings to lowercase
                    let qAdjusted = query.toLocaleLowerCase();
                    let nameAdjusted = element.gym_brandname.toLocaleLowerCase();
                    let addresAdjusted = element.gym_address.toLocaleLowerCase();


                    // check name similarity
                    if(stringSimilarity(qAdjusted, nameAdjusted) >= 0.5)
                        outGyms.push(element)

                    // check address similarity
                    else if(stringSimilarity(qAdjusted, addresAdjusted) >= 0.5)
                        outGyms.push(element)

                });

                
                // set the gyms array for the search tab
                setGymsInSearchTab(outGyms);
                console.log(gymsInSearchTab)
        }
        // display nearby gyms
        else
            getNearbyGyms()
        
    }
    
    //=========================================================================================================//
    /**
     * Function that gets the users location
     * makes use of google API
     * saves users location to a var
     */
    const getLocation = async(load: boolean) => {
        try {
            
            // display loading bar?
            if(load) {
                setLoading(true)
            };

            // check if we have location permissons
            Geolocation.checkPermissions().then(
                result => {
                    // no permissions granted 
                    if(result.location!=="granted") 

                        Geolocation.requestPermissions()
                    else console.log("permissions granted")
                },
                err =>{ 
                    // big error
                    console.log(err)
                    Geolocation.requestPermissions()
                },
                
            );  
            
            // get the users location
            const position = await Geolocation.getCurrentPosition({
                enableHighAccuracy: true
            });
          
            // reset user coordinates
            setUserLoc([position.coords.latitude, position.coords.longitude]) 

            // recenter users view to their location
            if(load){
                setCenter([position?.coords.latitude, position?.coords.longitude]) 
                setZoom(18) 
            }

            // clear 
            setError({showError: false, message: "no error here"})
            setLoading(false);

        // locations is probably not enabled
        } catch(e){
            setLoading(false);
            setError({showError: true, message: "Please Enable your GPS location"});
        }
    }  

    /**
     * onClick event for a gym marker on the map
     * @param activeGym 
     */
    const gymButtonClick=async (activeGym:any)=>{
        // Set Pop Menus data
        setGymData(activeGym);
        setShowModal(true);
    }

    //=========================================================================================================//
    /**
     * Function that gets the 5 nearest gyms to the users
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

    /**
     * function that makes an api call to get all the gyms
     */
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

    //=========================================================================================================//
    /**
     * function that displayds all the gyms within the view of the users map
     */
     function setGymsInMapView() 
     {   
         // the radius grows with the zoom depth
         let rad =  (20-zoom);
 
         //the gyms we find in the radius will be added here
         let outGyms:any = [];
 
         //get the center coordinates
         let lat= center[0];
         let long = center[1];
 
         // loop through all gyms
         gyms?.forEach((element: { gid: string; gym_coord_lat: number; gym_coord_long: number; key: string;}) => {
             // get magnitde between user and each gym coordinate
             let magnitude = calcCrow(lat,long,element.gym_coord_lat,element.gym_coord_long);
             // If magnitude is within radius then add it to the results
             if(magnitude <= rad){
                 outGyms.push(element);
             }
         });
 
         //chagne the state of gyms in view 
         setGymsinView(outGyms);
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
     * @param {float} lat1 = fromLat
     * @param {float} lon1 = fromLong
     * @param {float} lat2 = toLat
     * @param {float} lon2 = toLong
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

    /**
     * function that loops every few minutes 
     * gets an updated list of gyms
     */
    useEffect(() => {

        const interval = setInterval(() => {
            if(first) {
                getLocation(first);
                setRefresh(60000);
                setFirst(false);
                getAllGyms();
            }
            else    
                getLocation(false);

            setGymsInMapView();
        }, refresh);
        
        return () => 
        {
            clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
        }
    })
    
    /**
     * animation for opening the selected gym menu
     */
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

    /**
     * animation for closing the selected gym menu
     */
    const leaveAnimation = (baseEl: any) => {
        return enterAnimation(baseEl).direction('reverse');
    }

    /**
     * a function that gets map tiles from the map provider
     * @param x latitude
     * @param y longitude
     * @param z zoom
     * @param dpr resolution
     * @returns png for pidgeon maps
     */
    const mapTiler =(x: number, y: number, z: number, dpr?: number)=> {
        return `https://api.maptiler.com/maps/voyager/${z}/${x}/${y}.png?key=GhihzGjr8MhyL7bhR5fv`
    }
    return (
        
        <>  
            <IonContent  className="main" >
                
            <GymSearchBar 
            
                gyms={gymsInSearchTab} 
                nearByCallBack = {() =>{
                        setShowModal(false);
                        getNearbyGyms()
                    }
                }
                searchCallBack = {(searchQuery:string) => {
                        searchQueryAction(searchQuery)
                    }
                }

                setGymFocus = {(lat: number, long:number) =>{

                    setCenter([lat, long]) ;
                    setZoom(18) ;
                    setGymsInMapView()
                }}
            /> 
                
            <IonLoading 
                mode="ios"
                isOpen={loading}
                message={"Loading"}
                onDidDismiss={() => setLoading(false)}
                spinner={"circles"}
                cssClass="spinner"
            />
            <IonToast
                mode="ios"
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
                <IonButton mode="ios" shape="round" id="float" onClick={() => { 
                    
                    getLocation(true)
                    setGymsInMapView()
                }}>

                    <img id = "btnIcon" alt="" src={recenter} ></img>
                </IonButton>
                <Overlay anchor={[userLocation[0],userLocation[1]]} offset={[25,30]} >
                <img src={location} width={50} height={50} alt='' />
                </Overlay>      
                {gymsInView.map((item: {key:string; gid:string; gym_coord_lat: number; gym_coord_long: number;gym_brandname:string; gym_name:string}) => {
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

            <IonModal mode="ios"  id = "overlay" showBackdrop = {false} backdropDismiss={true}  isOpen={showModal} enterAnimation={enterAnimation} leaveAnimation={leaveAnimation}>

                <IonCard mode="ios" style={{"margin":"0px", "height":"100%"}}  >
                    <IonCardHeader>
                        <IonCardTitle className='center Subheading'>{ gymData.gym_name}</IonCardTitle>
                    </IonCardHeader >
                    <IonCardContent id="buttonBox" >
                        <IonButtons >
                            <IonButton  
                                mode="ios"
                                shape='round' 
                                color="dark"
                                className='btnView'
                                onClick={()=>{

                                    sessionStorage.setItem('gym_name',gymData.gym_name);
                                    sessionStorage.setItem('gym_brandname',gymData.gym_brandname);
                                    sessionStorage.setItem('gym_address',gymData.gym_address);
                                    sessionStorage.setItem('gid',gymData.g_id);
                                    setShowModal(false);
                                    history.push("/GymPage");
                                    
                                }}
                            >
                                View
                            </IonButton>
                            <IonButton mode="ios" onClick={()=>setShowModal(false)} shape='round' className='btnClose' color="light">Close</IonButton>
                        </IonButtons>
                    
                    </IonCardContent>
                </IonCard>

            
            </IonModal>   
            </IonContent>
        </>
    )
}

export default MapView;
