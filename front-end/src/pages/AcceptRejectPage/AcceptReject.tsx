import { IonContent, IonHeader, IonText, IonPage} from '@ionic/react';
import React from 'react'
import AcceptRejectCard from '../../components/AcceptRejectCard/AcceptRejectCard';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './AcceptReject.css';

export class AcceptRejectPage extends React.Component {

    badge= {
        name:'Cycling Champ', 
        description: 'Cycle 10km in 15 minutes to earn this badge!', 
        activityCategory:'cardio',
        activityType:'cycling',
        input1:'00:14:45',
        input2:'10km',
        input3:'4'
    };
    render(){
        
        return (
            <IonPage color='#220FE' >
                <IonHeader>
                    <ToolBar></ToolBar>
                </IonHeader>
                <br></br>
                <IonContent fullscreen className='Content'>
                    <IonText className='PageTitle center'>Accept/Reject</IonText>
                    <AcceptRejectCard userID={1} username='jadepeche' badge={this.badge}></AcceptRejectCard>
                </IonContent>
            </IonPage>
        )

    }
}
export default AcceptRejectPage;
