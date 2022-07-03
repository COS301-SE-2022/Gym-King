


import { IonCard, IonCardHeader, IonCardTitle, IonSlides } from '@ionic/react';
import React, { useRef } from 'react';
import './BadgeCanvas.css'

export interface BadgeCanvasInputProps {
    rank: string,
    emblem: string    
}

export const BadgeCanvas: React.FC<BadgeCanvasInputProps> = ({
    rank,
    emblem  
  }) => {

    const slidesEl = useRef(document.createElement('ion-slides'))

    const handleSlidesLoad = () => {
      slidesEl.current.lockSwipes(true)
    }
    
    return (
        <>
        <IonCard>
            <IonCardHeader>
                <IonCardTitle className='inputHeading' class ="ion-text-center">Badge</IonCardTitle> 


            </IonCardHeader>

            <IonSlides
                onIonSlidesDidLoad={() => handleSlidesLoad()} 
                ref={slidesEl}
            >
                <div className="container">
                <img className="over" src={emblem} />  
                <img className="under" src={rank} />  
                </div>
            </IonSlides>

        </IonCard>
        </>
    );}

export default BadgeCanvas;