import {IonContent, IonPage, IonHeader, IonText, IonToolbar, IonButtons, IonButton, IonIcon, IonLabel, IonPopover, IonItem, IonCheckbox, useIonViewDidEnter, IonLoading} from '@ionic/react';
import { arrowDown, arrowUp, funnel, swapVertical } from 'ionicons/icons';
import React, { useState } from 'react';
import MyBadgeGrid from '../../components/MyBadgeGrid/MyBadgeGrid';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './MyBadge';
import { useHistory } from 'react-router-dom';



const MyBadge: React.FC = () =>{
    const [badges, setBadges] = useState(new Array<any>());
    let history=useHistory()
    const [loading, setLoading] = useState<boolean>(false);
        let email=localStorage.getItem("email")

    
    useIonViewDidEnter(()=>{
        setLoading(true)
        fetch(`https://gym-king.herokuapp.com/users/owned/${email}`,{
            "method":"GET"
        })
        .then(response =>response.json())
        .then(response =>{
            let arr=[];
            for(let i=0; i<response.length;i++)
            {
                arr.push({
                    id:response[i].b_id.b_id,
                    name:response[i].b_id.badgename,
                    qty:response[i].count,
                    icon:response[i].b_id.badgeicon.split("_")
                })
                
            }
            setBadges(arr)
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
    })

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

    const goToPendingBadges = () =>{
        history.push("/PendingBadges")
    }

    return(
        <IonPage >
            <IonHeader>
                <ToolBar menu={false}></ToolBar>
            </IonHeader>
            <br></br>
            <IonContent fullscreen class="MyBadgeContent" className='Content'>
                    <IonText className='PageTitle center'>My Badges</IonText>

                    <IonButton color='warning' className='width80' onClick={goToPendingBadges}>View Pending badges</IonButton><br></br><br></br>

                    <IonToolbar class="FilterBar" >
                        <IonButtons slot='start' color="light">
                            <IonButton id="sort-trigger" color="light">
                                <IonIcon size='large' icon={swapVertical}></IonIcon>
                                <IonLabel color="light" style={{"paddingLeft":"5%"}}>Sort</IonLabel>
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
                        <IonButtons slot='secondary' >
                            <IonButton id="filter-trigger"  color="light">
                                <IonIcon size='large' icon={funnel} ></IonIcon>
                                <IonLabel style={{"paddingLeft":"5%"}}>Filter</IonLabel>
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
                    <IonLoading 
                        isOpen={loading}
                        message={"Loading"}
                        spinner={"circles"}
                        onDidDismiss={() => setLoading(false)}
                        cssClass={"spinner"}
                        
                    />
            </IonContent>
        </IonPage>
    )
        

}

export default MyBadge;