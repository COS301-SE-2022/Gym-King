import {IonCard, IonCardHeader} from '@ionic/react';
import React from 'react'
import './FileChooser.css'

export type FileChooserProps = {numFiles: number};

export class FileChooser extends React.Component<FileChooserProps>{
    render(){
        return(
               <IonCard className='fileCard shadow centerComp'>
                   <IonCardHeader>
                        <input type="file"/>     
                   </IonCardHeader>
               </IonCard>
        )
        
    }
}

export default FileChooser;