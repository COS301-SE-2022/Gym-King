/** 
* @file BadgeCanvas.tsx
* @brief provides a way to display the badges on the pages 
*/

import { IonCard, IonCardHeader, IonCardTitle, IonSlides } from '@ionic/react';
import React, { useRef } from 'react';
import './BadgeCanvas.css'

/**
 * @brief input interface for the badge canvas
*/
export interface BadgeCanvasInputProps {
    name:string,
    rank: string,
    emblem: string    
}


/**
 * @brief this component overlays two images to form the badge icon.
 * @param name - the name of the badge
 * @param rank - the rank of the badge icon "b", "s", "g" ...etc
 * @param emblem - the emblem of the badge icon "bicep", "situp", "gym" ...etc  
 * @result displays a badge icon 
 */
export const BadgeCanvas: React.FC<BadgeCanvasInputProps> = ({
    name,
    rank,
    emblem  
  }) => {

    /**
     * @brief the container of the badge icon
     */
    const slidesEl = useRef(document.createElement('ion-slides'))

    /**
     * @brief function that gets called as the component is rendered
     * @result make the slider container static(cant slide anymore)
     */
    const handleSlidesLoad = () => {
      slidesEl.current.lockSwipes(true)
    }
    
    /**
     * @brief displays the badge name and its icon 
     */
    return (
        <>
        <IonCard>
            <IonCardHeader>
                <IonCardTitle className='inputHeading' class ="ion-text-center">{name}</IonCardTitle> 


            </IonCardHeader>

            <IonSlides
                onIonSlidesDidLoad={() => handleSlidesLoad()} 
                ref={slidesEl}
            >
                <div className="container">
                <img className="over" src={emblem} alt = ''/>  
                <img className="under" src={rank} alt = ''/>  
                </div>
            </IonSlides>

        </IonCard>
        </>
    );}

export default BadgeCanvas;