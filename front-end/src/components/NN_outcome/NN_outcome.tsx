import { IonAlert} from '@ionic/react';
/*look at viewbadge page to see implementation
*/
export const NNAlert=(props:{award:boolean,show:boolean,message:string,reset:any,submitClaim:any})=>{
        // used for routing
        return(   
            <div> 
            {props.award
                ?( <IonAlert
                    isOpen={props.show}
                    onDidDismiss={() =>props.reset()}
                    header="Congradulations"
                    message={props.message}
                    buttons={[{text:'YES',
                                cssClass:"alert-button-yes",
                                handler:()=>props.submitClaim()}]}
                />)
                :(
                    <IonAlert
                    isOpen={props.show}
                    onDidDismiss={() => props.reset()}
                    header="Badge claim failed"
                    message={props.message}
                    buttons={[
                        {text:'close',handler:()=>props.reset()},
                        {text:'send to Employee',cssClass:"alert-button-yes",handler:()=>props.submitClaim()}]}/>
                )
                }
            </div> 
           
        )
}

export default NNAlert;
