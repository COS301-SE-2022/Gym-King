import { IonAlert} from '@ionic/react';
import { useHistory } from 'react-router';

/*look at viewbadge page to see implementation
*/
export const NNAlert=(props:{award:boolean,show:boolean,message:string,BadgeEmblem:string,Badgerank:string,idEmblem:string,idRank:string})=>{
        // used for routing
        const [showAlert, setShowAlert] = useState(show);
        let history=useHistory()
        return(   
            <div> 
            {props.award
                ?( <IonAlert
                    isOpen={props.show}
                    onDidDismiss={() => setShowAlert(false)}
                    header="Alert"
                    subHeader="Important message"
                    message="This is an alert!"
                    buttons={['OK']}
                />)
                        :(<IonBackButton text="Back"/>)}  
           </div>
        )
}

export default NNAlert;