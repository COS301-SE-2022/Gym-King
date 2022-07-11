import { IonCol, IonGrid, IonRow} from '@ionic/react';
import { filterSharp } from 'ionicons/icons';
import { useState } from 'react';
import MyBadgeCard from './MyBadgeCard/MyBadgeCard';
import './MyBadgeGrid.css'

export const MyBadgeGrid=(prop:{badges:any[],filters:any[],sort:string})=>{
    let arr:any[]=[]
    for(let i=0;i<prop.badges.length;i++)
    {
        for(let j=0;j<prop.filters.length;j++)
        {
            if(prop.filters[j].isChecked===true&& prop.badges[i].name.toLowerCase().includes(prop.filters[j].val.toLowerCase()))
            {
                arr.push(prop.badges[i])
            }
        }
    }
    return(
        
        <IonGrid>
            <IonRow  className="ion-align-items-center">
                {arr.map(el => 
                    <IonCol className="center" key={el.id}>
                    <MyBadgeCard id={el.id} name={el.name} qty={el.qty}></MyBadgeCard>
                    </IonCol>)}
            </IonRow>
        </IonGrid>
        )
        
    
}

export default MyBadgeGrid;