import { IonAlert} from '@ionic/react';
import { useHistory } from 'react-router';
import BadgeImage from '../../components/BadgeImage/BadgeImage';
/*look at viewbadge page to see implementation
*/
export const NNAlert=(props:{award:boolean,show:boolean,message:string,BadgeEmblem:string,Badgerank:string,idEmblem:string,idRank:string,reset:any})=>{
        // used for routing
        let history=useHistory()
        return(   
            <div> 
            {props.award
                ?( <IonAlert
                    isOpen={props.show}
                    onDidDismiss={() =>props.reset()}
                    header="Congradulations"
                    message={`<BadgeImage BadgeEmblem="${props.BadgeEmblem}" Badgerank="${props.Badgerank}" idEmblem="UploadEmblem" idRank='UploadRank'></BadgeImage>`}
                    buttons={['cool']}
                />)
                :(
                    <IonAlert
                    isOpen={props.show}
                    onDidDismiss={() => props.reset()}
                    header="Badge claim failed"
                    message={props.message}
                    buttons={['send to Employee','close']}></IonAlert>
                )
                }
            </div> 
           
        )
}

export default NNAlert;