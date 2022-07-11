import { IonActionSheet, IonCard, IonCardSubtitle, IonCardTitle} from '@ionic/react';
import { caretForwardCircle, create, heart, share, trash } from 'ionicons/icons';
import { useState } from 'react';
import './GymCard.css'

export const GymCard=(prop:{id:any,name:string,address:string})=>{
    const [showActionSheet, setShowActionSheet] = useState(false);
    return(
        <div>
            <IonCard
                color="primary"   
                class="ion-padding"
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
                    icon: create,
                    handler: () => {
                      console.log('edit clicked');
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