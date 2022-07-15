import {IonActionSheet, IonCard, IonCardSubtitle, IonCardTitle, useIonAlert} from '@ionic/react';
import {create, trash} from 'ionicons/icons';
import {useState} from 'react';
import './EmployeeCard/css';

export const EmployeeCard=(prop:{id:any, name:string, gym:string})=>{
    const [showActionSheet, setShowActionSheet] = useState(false);
    const [presentAlert] = useIonAlert();
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
                    {prop.gym}
                </IonCardSubtitle>
            </IonCard>
            <IonActionSheet
                isOpen={showActionSheet}
                onDidDismiss={()=> setShowActionSheet(false)}
                cssClass="my-custom-class"

                buttons={[{
                    text: 'Edit',
                    id:'edit-button',
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
                        presentAlert({
                            cssClass: 'custom-alert',
                            header: 'delete',
                            subHeader: prop.name,
                            message: 'delete cannot be undone',
                            buttons:[
                                {
                                    text: 'YES',
                                    cssClass:"alert-button-yes",
                                    handler: ()=>{console.log("yes")}
                                },
                                {
                                    text:"NO",
                                    cssClass:"alert-button-no",
                                    handler:()=>{console.log("no")}
                                },
                            ]
                        })
                    }
                }, {
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

export default EmployeeCard;