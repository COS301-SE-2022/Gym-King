import React, { useState, useRef, useEffect } from 'react';
import { IonContent, IonItem, IonLabel,  IonSearchbar, IonModal, IonList, IonHeader, IonText, IonRow,
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
      console.log(props.gyms)
    }, [props.gyms]);
  
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
                mode="ios"
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
             mode="ios"
            ref={modal}
            trigger="open-modal"
            isOpen={isShowing}
            initialBreakpoint={0.25}
            breakpoints={[0.0,0.25, 0.5, 0.75]}
            backdropBreakpoint={0.5}
            backdropDismiss={true}
        
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
            <IonContent color='secondary' >
              <br></br><IonHeader className="inputHeading ion-padding" style={{"fontSize":"30px"}}>{searchTabHeading}</IonHeader> <br></br>
              <IonList mode="ios">

              {  
              props.gyms.map((item: {
                key:string; 
                gid:string; 
                gym_brandname:string; 
                gym_name:string;
                gym_address:string; 
                gym_coord_lat:number; 
                gym_coord_long:number
              }) => {

                      return (
                      
                          <IonItem mode="ios" button detail  
                          onClick={()=>{
                            modal.current?.setCurrentBreakpoint(0.25);
                            props.setGymFocus(item.gym_coord_lat, item.gym_coord_long)
                            setIsShowing(false);
                          }}
                          key={item.gid}
                          >
                                <IonLabel mode="ios">
                                  <IonRow>
                                    <IonText className={"mediumHeading"}>{item.gym_name}</IonText>
                                  </IonRow>
                                  <IonRow>
                                    <i className='linkLabel'>{item.gym_address}</i>
                                  </IonRow>
                                  
                                </IonLabel>
                                
                          </IonItem>)

                                 
                  }) 
                }
               
              </IonList>
            </IonContent>
          </IonModal>
          </>
    );
    
}

export default GymSearchBar;

