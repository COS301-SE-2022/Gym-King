import React, { useState, useRef, useEffect } from 'react';
import { IonContent, IonItem, IonLabel,  IonSearchbar, IonModal, IonList, IonAvatar, IonImg,
} from '@ionic/react';

export const GymSearchBar=(props:{
    gyms: any[]; 
    callback(): any;
  })=>{
    const modal = useRef<HTMLIonModalElement>(null);
    const page = useRef(null);
    const [isShowing, setIsShowing] = useState(false);
    const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);
  
    useEffect(() => {
      setPresentingElement(page.current);
    }, []);
  
    function dismiss() {
      modal.current?.dismiss();
    }
  
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
                onClick = {()=>{
                  
                  props.callback()
                  setIsShowing(true)
                  console.log(props.gyms)
                }}
            >
            </IonSearchbar>
          </div>
          <IonModal
            ref={modal}
            trigger="open-modal"
            isOpen={isShowing}
            initialBreakpoint={0.25}
            breakpoints={[0.0,0.25, 0.5, 0.75]}
            backdropDismiss={true}
            backdropBreakpoint={0.5}
        
            presentingElement={presentingElement!}
            onWillDismiss={()=>setIsShowing(false)}

          >
            <IonContent  onClick={() => modal.current?.setCurrentBreakpoint(0.75)} className="ion-padding">
              <IonList>

              {props.gyms.map((item: {key:string; gid:string;gym_brandname:string;gym_address:string;}) => {
                    return (

                      <IonItem 
                        key={item.key}>
                      <IonAvatar slot="start">
                        <IonImg src="" />
                      </IonAvatar>

                      <IonLabel>
                        <h2>{item.gym_brandname}</h2>
                        <p>{item.gym_address}</p>
                      </IonLabel>
                      </IonItem>


                    )                 
                })}
               
              </IonList>
            </IonContent>
          </IonModal>
          </>
    );
    
}

export default GymSearchBar;

