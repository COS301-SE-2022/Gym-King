import { IonActionSheet, IonCard, IonCardSubtitle, IonCardTitle, IonLoading, IonToast, useIonAlert} from '@ionic/react';
import { create, trash } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './GymCard.css'

export const GymCard=(prop:{id:any,name:string,address:string})=>{
    const [loading, setLoading] = useState<boolean>(false);
    const [showToast1, setShowToast1] = useState(false);
    const [showToast2, setShowToast2] = useState(false);
    const [toastMessage,setToastMessage]=useState("could not delete gym")
    const history=useHistory();
    const [showActionSheet, setShowActionSheet] = useState(false);
    const [presentAlert] = useIonAlert();
    const deleteGym = (password:string) => {
    setLoading(true)
    fetch(`https://gym-king.herokuapp.com/owner/delete/gym`,
    {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        gid:prop.id,
        "email":localStorage.getItem("email"),
        "password":password,
      })
    }
  )
    .then((response) => response.json())
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
      }
    })
    .catch((err) => {
      setLoading(false)
      console.log(err);
      setShowToast2(true)
    });
    }
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
        isOpen={showToast1}
        onDidDismiss={() => setShowToast1(false)}
        message="Gym has been deleted."
        duration={500}
        color="success"
      />
      <IonToast
        isOpen={showToast2}
        onDidDismiss={() => setShowToast2(false)}
        message={toastMessage}
        duration={500}
        color="danger"
      />
      <IonLoading 
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