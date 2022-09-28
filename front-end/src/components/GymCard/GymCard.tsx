/**
 * @file GymCArd.tsx
 * @brief card component to display a gyms info
 */
 import { IonActionSheet, IonCard, IonCardSubtitle, IonCardTitle, IonLoading, IonToast, useIonAlert} from '@ionic/react';
 import { create, trash } from 'ionicons/icons';
 import { useState } from 'react';
 import { useHistory } from 'react-router-dom';
 import './GymCard.css'
 import axios from 'axios';
 /**
  * 
  * @param prop takes in id{any},name{string}, address{string}, deleteClicked{any}
  * @returns GymCard component
  */
 export const GymCard=(prop:{id:any,name:string, brand:string,address:string,deleteClicked:any})=>{
 //=================================================================================================
 //    VARIABLES & HOOKS
 //=================================================================================================
   //-loading hook{boolean},determines whether loading bar is shown or not
   const [loading, setLoading] = useState<boolean>(false);
   //-showToast1 hook {boolean},determines whether showToast1 is shown or not
   const [showToast1, setShowToast1] = useState<boolean>(false);
   //-showToast2 hook{boolean},determines whether showToast2 is shown or not
   const [showToast2, setShowToast2] = useState<boolean>(false);
   //-toatsMessage {string},stores message to be shown on toast
   const [toastMessage,setToastMessage]=useState<string>("could not delete gym")
   //history,uses react-route for navigation
   const history=useHistory();
   //-showActionSheet hook {boolean}, toggles acttion sheet
   const [showActionSheet, setShowActionSheet] = useState<boolean>(false);
   //-presentAlert, toggles alert
    
   const [presentAlert] = useIonAlert();
 //=================================================================================================
 //    FUNCTIONS
 //=================================================================================================  
   /**
    * deleteGym Function
    * @param password gets gymOwners password
    */
   const deleteGym = (password:string) => {
   setLoading(true)
     axios(process.env["REACT_APP_GYM_KING_API"]+`/owner/delete/gym`,

     {
       method: "DELETE",
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       data: JSON.stringify({ 
         "gid":prop.id,
         "email":localStorage.getItem("email"),
         "password":password,
       })
     }
   )
     .then((response) => response.data)
     .then((response) => {
       setLoading(false)
       console.log(response)
       
       if(response?.success===false)
       {
         setToastMessage(response.results)
         setShowToast2(true)
       }
       else{
         setShowToast1(true)
         prop.deleteClicked();
        
       }
     })
     .catch((err) => {
       setLoading(false)
       console.log(err);
       setShowToast2(true)
     });
     }
   return(
   <div data-testid="GymCard">
     <IonCard
        mode="ios"
       color="primary"   
       class="ion-padding gymCardMargin"
       onClick={() => setShowActionSheet(true)}
     >
       <IonCardTitle class="inputHeading" mode="ios">
         {prop.name}
       </IonCardTitle>
       
       <IonCardSubtitle mode="ios" className='subheading' style={{"marginBottom":"0%", "marginTop":"2%", "marginLeft":"0%"}}>
         {prop.address}
       </IonCardSubtitle>
     </IonCard>
 
           <IonActionSheet
              mode="ios"
               isOpen={showActionSheet}
               onDidDismiss={()=>setShowActionSheet(false)}
               cssClass="my-custom-class"
               
               buttons={[{
                  
                   text: 'Edit',
                   id:'edit-button',
                   icon: create,
                   handler: () => {
                     sessionStorage.setItem("gid",prop.id  )
                     sessionStorage.setItem("gymName",prop.name )
                     sessionStorage.setItem("gymAddress",prop.address)
                     sessionStorage.setItem("gymBrand",prop.brand)
                     history.push("/EditGym")
                   }
                 },{
                   text: 'Delete',
                   role: 'destructive',
                   icon: trash,
                   id: 'delete-button',
                   data: {
                     type: 'delete'
                   },
                   handler: () => {
                     console.log('Delete clicked');
                     presentAlert({
                       cssClass:'custom-alert',
                       header:'delete:',
                       subHeader:prop.name,
                       message:'delete cannot be undone',
                       inputs:[
                         {
                           name: 'password',
                           type:'password',
                           placeholder:'password'
                         }],
                       buttons:[
                           {
                               text:'YES',
                               cssClass:"alert-button-yes",
                               handler:(alertData)=>{deleteGym(alertData.password);}
                           },
                           {
                               text:'NO',
                               cssClass:"alert-button-no",
                               handler:()=>{console.log("no")}
                           },
                       ]
                       
                     })
                   }
                 },{ 
                   text: 'Cancel',
                   role: 'cancel',
                   handler: () => {
                     console.log('Cancel clicked');
                   }
                 }]}>
           </IonActionSheet>
 
           <IonToast
            mode="ios"
             isOpen={showToast1}
             onDidDismiss={() => setShowToast1(false)}
             message="Gym has been deleted."
             duration={500}
             color="success" 
             />
 
           <IonToast
            mode="ios"
             isOpen={showToast2}
             onDidDismiss={() => setShowToast2(false)}
             message={toastMessage}
             duration={500}
             color="danger"
           />
                 
           <IonLoading 
           mode="ios"
             isOpen={loading}
             message={"Loading"}
             duration={2000}
             spinner={"circles"}
             onDidDismiss={() => setLoading(false)}
             cssClass={"spinner"}
             
           />
   </div>
   )
       
   
 }
 
 export default GymCard;