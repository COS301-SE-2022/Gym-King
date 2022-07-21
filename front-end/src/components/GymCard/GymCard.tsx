import { IonActionSheet, IonCard, IonCardSubtitle, IonCardTitle, useIonAlert} from '@ionic/react';
import { create, trash } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './GymCard.css'

export const GymCard=(prop:{id:any,name:string,address:string})=>{
    const history=useHistory();
    const [showActionSheet, setShowActionSheet] = useState(false);
    const [presentAlert] = useIonAlert();
    return(
        <div>
            <IonCard
                color="primary"   
                class="gymCard ion-padding"
                onClick={() => setShowActionSheet(true)}
            >
                  <IonCardTitle>
                    {prop.name}
                  </IonCardTitle>
                  <IonCardSubtitle>
                    {prop.address}
                  </IonCardSubtitle>
            </IonCard>
            <IonActionSheet
                isOpen={showActionSheet}
                onDidDismiss={()=>setShowActionSheet(false)}
                cssClass="my-custom-class"
               
                buttons={[{
                    text: 'Edit',
                    id:'edit-button',
                    icon: create,
                    handler: () => {
                      sessionStorage.setItem("gid",prop.id  )
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
                        buttons:[
                            {
                                text:'YES',
                                cssClass:"alert-button-yes",
                                handler:()=>{console.log("yes")}
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
        </div>
        )
        
    
}

export default GymCard;