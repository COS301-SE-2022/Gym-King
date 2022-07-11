import {IonContent, IonPage, IonHeader, IonText, IonToolbar, IonButtons, IonButton, IonIcon, IonLabel, IonPopover, IonItem, IonCheckbox} from '@ionic/react';
import { arrowDown, arrowUp, funnel, swapVertical } from 'ionicons/icons';
import React, { useState } from 'react';
import MyBadgeGrid from '../../components/MyBadgeGrid/MyBadgeGrid';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './MyBadge';

const badges=[
    { id:1,name:'gold running',qty:5},
    { id:2,name:'aerobics silver',qty:6},
    { id:3,name:'weight bronze',qty:10},
    { id:4,name:'silver running',qty:1},
    { id:5,name:'plank bronze',qty:2},
    { id:6,name:'jog bronze',qty:11},
    { id:7,name:'jog silver',qty:3},
    { id:8,name:'weight silver',qty:4},
    { id:9,name:'plank silver',qty:2},
    { id:10,name:'jog gold',qty:1},
]
const MyBadge: React.FC = () =>{
    const [checkboxList,setCheckboxList]=useState([
        { val: 'Gold', isChecked: true },
        { val: 'Silver', isChecked: true },
        { val: 'Bronze', isChecked: true}
      ])
    function changeCheckbox(type:string,checked:boolean)
    {
        let arr:any=[]
        for(let i =0;i<checkboxList.length;i++)
        {     
            if(type!==checkboxList[i].val)
            {
                arr.push(checkboxList[i])
            }
            else{
                arr.push({
                    'val':type,
                    'isChecked':checked
                })
            }
        }
        setCheckboxList(arr)
    }
    const [sort,setSort]=useState("none")
    console.log(sort)
    console.log(checkboxList)
    return(
        <IonPage >
            <IonHeader>
                <ToolBar></ToolBar>
            </IonHeader>
            <br></br>
            <IonContent fullscreen class="MyBadgeContent" className='Content'>
                    <IonText className='PageTitle center'>My Badges</IonText>
                    <IonToolbar class="FilterBar">
                        <IonButtons slot='start'>
                            <IonButton id="sort-trigger" >
                                <IonIcon icon={swapVertical}></IonIcon>
                                <IonLabel>SORT</IonLabel>
                            </IonButton>
                            <IonPopover  trigger='sort-trigger' triggerAction='click'>      
                                            <IonItem onClick={e=>{setSort("AscName")}}>
                                                <IonIcon icon={arrowUp}></IonIcon>
                                                <IonLabel>Name</IonLabel>
                                            </IonItem>
                                            <IonItem onClick={e=>{setSort("DescName")}}>
                                                <IonIcon icon={arrowDown}></IonIcon>
                                                <IonLabel>Name</IonLabel>
                                            </IonItem>
                                            <IonItem onClick={e=>{setSort("AscQty")}}>
                                                <IonIcon icon={arrowUp}></IonIcon>
                                                <IonLabel>Quantity</IonLabel>
                                            </IonItem>
                                            <IonItem onClick={e=>{setSort("DescQty")}}>
                                                <IonIcon icon={arrowDown}></IonIcon>
                                                <IonLabel>Quantity</IonLabel>
                                            </IonItem>
                            </IonPopover>
                        </IonButtons>
                        <IonButtons slot='secondary'>
                            <IonButton id="filter-trigger">
                                <IonIcon icon={funnel}></IonIcon>
                                <IonLabel>FILTER</IonLabel>
                            </IonButton>
                        </IonButtons>
                        <IonPopover trigger='filter-trigger' triggerAction='click'>
                            {checkboxList.map(({ val, isChecked }, i) => (
                                <IonItem key={i}>
                                 <IonLabel>{val}</IonLabel>
                                    <IonCheckbox slot="end" value={val} checked={isChecked} onIonChange={e=>{changeCheckbox(val,e.detail.checked)}}/>
                                 </IonItem>
                             ))}
                        </IonPopover>
                    </IonToolbar>
                    <MyBadgeGrid badges={badges} filters={checkboxList} sort={sort}></MyBadgeGrid>
            </IonContent>
        </IonPage>
    )
        

}

export default MyBadge;