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
    if(prop.sort!=="none")
    {
        if(prop.sort==="AscName")
        {
            arr.sort((a:any,b:any)=>a.name.localeCompare(b.name))
        }
        else if(prop.sort==="DescName")
        {
            arr.sort((a:any,b:any)=>a.name.localeCompare(b.name))
            arr.reverse();
        }
        else if(prop.sort==="AscQty")
        {
            arr.sort((a:any,b:any)=>{ return a.qty-b.qty})
        }
        else if(prop.sort==="DescQty")
        {
            arr.sort((a:any,b:any)=>{ return b.qty-a.qty})
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