import {IonButton, IonCard, IonCardContent, IonCardHeader, IonText} from '@ionic/react';
import React from 'react'
import './FileChooser.css'

export type FileChooserProps = {numFiles: number};

export class FileChooser extends React.Component<FileChooserProps>{
    render(){
        let numAttachments= this.props.numFiles;
        return(
               <IonCard className='fileCard shadow centerComp'>
                   <IonCardHeader>
                        <IonButton>Upload File</IonButton>    
                   </IonCardHeader>
                   <IonCardContent>
                        {numAttachments===0 && <IonText>No file chosen</IonText>}
                        
                   </IonCardContent>
               </IonCard>
        )
        
    }
}

export default FileChooser;