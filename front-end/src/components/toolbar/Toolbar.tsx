import {IonButtons, IonToolbar, IonTitle, IonButton, IonMenuButton} from '@ionic/react';
import React from 'react'
import './Toolbar.css'

//creating a type so props can be entered
export type ToolBarProps = {username?:string};

export class ToolBar extends React.Component<ToolBarProps>{
    render(){
        let username = this.props.username;
        return(
                <IonToolbar mode='ios' class="toolbar" color="#0F005A" data-testid="tb">
                    <IonButtons slot="end">
                        <IonButton shape='round' className='profileImage'>
                        </IonButton>
                    </IonButtons>
                    <IonTitle>{username}</IonTitle>
                    <IonButtons slot='start'>
                             <IonMenuButton />
                    </IonButtons>
                </IonToolbar>
        )
        
    }
}

export default ToolBar;