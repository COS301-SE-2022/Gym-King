import {IonCard, IonCardHeader} from '@ionic/react';
import React from 'react'
import './FileChooser.css'

export type FileChooserProps = {numFiles: number};

export class FileChooser extends React.Component<FileChooserProps>{
    render(){
        return(
               <IonCard mode="ios" className='fileCard shadow centerComp'>
                   <IonCardHeader mode="ios" >
                        <input type="file"/>     
                   </IonCardHeader>
               </IonCard>
        )
        
    }
}

export default FileChooser;