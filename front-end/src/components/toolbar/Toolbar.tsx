import {IonButtons, IonToolbar, IonTitle, IonMenuButton, IonBackButton, IonImg, IonAvatar} from '@ionic/react';
import React from 'react'
import './Toolbar.css'

//creating a type so props can be entered
export type ToolBarProps = {username?:string,menu?:boolean};

export class ToolBar extends React.Component<ToolBarProps>{

    render(){
        let username = this.props.username;
        
        return(
                <IonToolbar mode='ios' class="toolbar" color="#0F005A" data-testid="tb">
                    <IonButtons slot="end" >
                        <IonAvatar>
                        <IonImg  style={{"overflow":"hidden","marginTop":"6px","borderRadius":"50%","backgroundImage":`url(${localStorage.getItem("pp")})`}} alt="" className="toolbarImage centerComp contain"  ></IonImg>                        
                        </IonAvatar>
                    </IonButtons>
                    <IonTitle>{username}</IonTitle>
                    <IonButtons slot='start' >
                        {this.props.menu && this.props.menu===true ?(<IonMenuButton />)
                        :(<IonBackButton text="Back"/>)}
                             
                    </IonButtons>
                </IonToolbar>
        )
        
    }
}

export default ToolBar;