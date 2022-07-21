import { IonCol, IonGrid, IonIcon, IonRow, IonSlide, IonSlides} from '@ionic/react';
import './LeaderboardSwiper.css'
import {LeaderboardValues} from './LeaderBoardValues/LeaderboardValues'
export const LeaderboardSwiper=(props: {overall:any[],cardio:any[],strength:any[]})=>{
    const slideOpts = {
        initialSlide: 0,
        speed:500,
        pager:true,
        nested:true,
        slidesPerView:1,
        direction:"horizontal"
      };
    return(
        <IonSlides pager={true} options={slideOpts}>
        <IonSlide className='noPadding'>
          <IonGrid  class='LeaderboardGrid'>
              <IonRow  class="LeaderboardHeader">
                <IonCol>  
                </IonCol>
                <IonCol>
                  OVERALL
                </IonCol>
                <IonCol>
                  <IonIcon className="end"class="iconRight" name="chevron-forward-outline"></IonIcon>
                </IonCol>
              </IonRow>
              <LeaderboardValues scores={props.overall} ></LeaderboardValues>
          </IonGrid>
        </IonSlide>
        <IonSlide>
        <IonGrid class='LeaderboardGrid'>
              <IonRow  class="LeaderboardHeader">
                <IonCol>  
                <IonIcon className="end"class="iconRight" name="chevron-back-outline"></IonIcon>
                </IonCol>
                <IonCol>
                  CARDIO
                </IonCol>
                <IonCol>
                  <IonIcon className="end"class="iconRight" name="chevron-forward-outline"></IonIcon>
                </IonCol>
              </IonRow>
              <LeaderboardValues scores={props.cardio}></LeaderboardValues>
          </IonGrid>
        </IonSlide>
        <IonSlide>
        <IonGrid class='LeaderboardGrid'>
              <IonRow  class="LeaderboardHeader">
                <IonCol>  
                <IonIcon className="end"class="iconRight" name="chevron-back-outline"></IonIcon>
                </IonCol>
                <IonCol>
                  STRENGTH
                </IonCol>
                <IonCol>
                 </IonCol>
              </IonRow>
              <LeaderboardValues scores={props.strength}></LeaderboardValues>
          </IonGrid>
        </IonSlide>
      </IonSlides>
            
        )
        
    
}

export default LeaderboardSwiper;