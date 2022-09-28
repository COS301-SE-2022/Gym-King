import {  IonSlides, IonSlide} from '@ionic/react';
import React, {useRef} from 'react'
import MyBadgeCard from '../MyBadgeGrid/MyBadgeCard/MyBadgeCard';


export type props = {badges?:any}

const BadgeSuggestions: React.FC<props> = (props) =>{


    const slides = useRef<any>(null);
    const slideOpts = {
        initialSlide: 0,
        speed: 400,
      
      };

        return(
            
            <IonSlides
                mode="ios"
                ref={slides}
                options={slideOpts}
                pager={true}
                style={{"height":"fit-content"}}
            >
                {
                    
                    props.badges?.map((el:any)=>{
                        return(
                        <IonSlide  key={el.b_id} style={{"padding":"10%"}}>
                            <MyBadgeCard key={el.b_id} id={el.b_id} name={el.badgename} qty={0} badgeEmblem={el.badgeicon.split("_")[1]} badgeRank={el.badgeicon.split("_")[0]}></MyBadgeCard>
                        </IonSlide>)
                    })
                }
                
            </IonSlides>
               
        )
        

}

export default BadgeSuggestions;

