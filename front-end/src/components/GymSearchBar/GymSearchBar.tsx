import React, { useState, useRef, useEffect } from 'react';
import { IonContent, IonItem, IonLabel,  IonSearchbar, IonModal, IonList, IonAvatar, IonImg, IonHeader,
} from '@ionic/react';

export const GymSearchBar=(props:{
    gyms: any[]; 
    nearByCallBack(): any; 
    searchCallBack(searchQuery:string | null | undefined): any;
    setGymFocus(lat:number, long:number): any;
  })=>{

    const searchInput = useRef<HTMLIonSearchbarElement>(null)
    const modal = useRef<HTMLIonModalElement>(null);
    const page = useRef(null);
    const [isShowing, setIsShowing] = useState(false);
    const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);
    const [searchTabHeading, setSearchTabHeading] = useState("Gyms Near You")

    useEffect(() => {
      setPresentingElement(page.current);
    }, []);
  
    return (
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position:'absolute',
              zIndex:10,
              width: '100%'
              
            }}
          >

            <IonSearchbar
            
                ref={searchInput}
                onClick = {()=>{
                  
                  setSearchTabHeading("Gyms Near You")
                        
                  props.nearByCallBack()
                  setIsShowing(true)
                  console.log(props.gyms)
                  
                }}
                onKeyUp ={()=>{
                    let searchVal = searchInput.current?.value;
                    props.searchCallBack(searchVal);

                    if(searchVal==="")
                      setSearchTabHeading("Gyms Near You")
                    else
                      {
                        if(props.gyms.length===0 || props.gyms==null ){
                          setSearchTabHeading("search for '" + searchVal+"': none found")
                        }
                        else{
                          
                          setSearchTabHeading("search for '" + searchVal+"':")
                        }
                      }
                  }
                }
                
            >
            </IonSearchbar>
          </div>
          <IonModal
            ref={modal}
            trigger="open-modal"
            isOpen={isShowing}
            initialBreakpoint={0.25}
            breakpoints={[0.0,0.25, 0.5, 0.75]}
            backdropBreakpoint={0.5}
        
            presentingElement={presentingElement!}
            onWillDismiss={()=>{
              setIsShowing(false)
              
            }}

            onDidDismiss={()=>{
              
              if(searchInput)
                if(searchInput.current)
                  searchInput.current.value = "";
            }}

            onAnimationEnd={()=>{
              searchInput.current?.setFocus();
            }
          }

          >
            <IonContent className="ion-padding">
              <IonHeader>{searchTabHeading}</IonHeader>
              <IonList>

              {  
              props.gyms.map((item: {
                key:string; 
                gid:string; 
                gym_icon:string; 
                gym_brandname:string;
                gym_address:string; 
                gym_coord_lat:number; 
                gym_coord_long:number
              }) => {

                      return (
                        
                          <IonItem
                            className="ion-align-items-center ion-margin-vertical border-light"
                            onClick={()=>{
                              modal.current?.setCurrentBreakpoint(0.25);
                              props.setGymFocus(item.gym_coord_lat, item.gym_coord_long)
                            }}
                            key={item.key}>
                          <IonAvatar slot="start">
                            <IonImg src={item.gym_icon} />
                          </IonAvatar>

                          <IonLabel>
                            <h2>{item.gym_brandname}</h2>
                            <p>{item.gym_address}</p>
                          </IonLabel>
                          </IonItem>

                      )                 
                  }) 
                }
               
              </IonList>
            </IonContent>
          </IonModal>
          </>
    );
    
}

export default GymSearchBar;

