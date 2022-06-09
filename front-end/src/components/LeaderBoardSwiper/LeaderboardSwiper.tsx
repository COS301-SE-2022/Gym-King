import { IonCol, IonGrid, IonIcon, IonRow, IonSlide, IonSlides} from '@ionic/react';
import './LeaderboardSwiper.css'
import {LeaderboardValues} from './LeaderBoardValues/LeaderboardValues'
export const LeaderboardSwiper=()=>{
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
        <IonSlide>
          <IonGrid class='LeaderboardGrid'>
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
              <LeaderboardValues></LeaderboardValues>
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
              <LeaderboardValues></LeaderboardValues>
          </IonGrid>
        </IonSlide>
        <IonSlide>
        <IonGrid class='LeaderboardGrid'>
              <IonRow  class="LeaderboardHeader">
                <IonCol>  
                <IonIcon className="end"class="iconRight" name="chevron-back-outline"></IonIcon>
                </IonCol>
                <IonCol>
                  STRENGHT
                </IonCol>
                <IonCol>
                 </IonCol>
              </IonRow>
              <LeaderboardValues></LeaderboardValues>
          </IonGrid>
        </IonSlide>
      </IonSlides>
            
        )
        
    
}

export default LeaderboardSwiper;