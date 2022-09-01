import React, { useState, useRef, useEffect } from 'react';
import { IonContent, IonPage, IonItem, IonLabel, IonInput, useIonModal, IonSearchbar, IonModal, IonList, IonAvatar, IonImg,
} from '@ionic/react';

function GymSearchBar() {
    const modal = useRef<HTMLIonModalElement>(null);
    const page = useRef(null);
  
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

            <IonSearchbar>

            </IonSearchbar>
          </div>
          <IonModal
            ref={modal}
            trigger="open-modal"
            isOpen={true}
            initialBreakpoint={0.25}
            breakpoints={[0.25, 0.5, 0.75]}
            backdropDismiss={true}
            backdropBreakpoint={0.5}
            presentingElement={presentingElement!}
          >
            <IonContent  onClick={() => modal.current?.setCurrentBreakpoint(0.75)} className="ion-padding">
              <IonList>
                <IonItem>
                  <IonAvatar slot="start">
                    <IonImg src="" />
                  </IonAvatar>
                  <IonLabel>
                    <h2>Gym</h2>
                    <p>Address</p>
                  </IonLabel>
                </IonItem>
              </IonList>
            </IonContent>
          </IonModal>
          </>
    );
    
}

export default GymSearchBar;