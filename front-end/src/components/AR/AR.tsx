
import {IonButton, IonCard, IonToast} from '@ionic/react';
import React, { useState } from "react";
import './AR.css';

interface inputError {
    showError: boolean;
    message?: String;

}
export interface ARInputProps {
    rank: string,
    emblem: string    
}



const AR: React.FC<ARInputProps> = ( inp ) => {
 
    const [error, setError] = useState<inputError>({showError: false});
    
    const AndroidLink = () =>{
            return "https://gym-king.herokuapp.com/Model/Android%3Frank%3D"+inp.rank  +"%26emblem%3D"  + inp.emblem;
    }
   
    const IosLink = () =>{
        return "https://gym-king.herokuapp.com/Model/iOS?rank="+inp.rank  +"&emblem="  + inp.emblem;
    }
    
    const validInputs = () =>{
        const embID:string[] = ["bicep","clean","cycle","dumbell","gym","pullup","run", "situp","treadmill"];
        const rankID:string[] = ["b","s","g"];

        let valid = false;

        embID.forEach(element => {
            if(inp.emblem === element) valid = true
        });

        if(!valid) return false

        valid = false
        rankID.forEach(element => {
            if(inp.rank === element) valid = true
        });

        return valid
    }

    const IsiOS = () =>{
        return [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    }
    
    const IsAndroid = () =>{
        var ua = navigator.userAgent.toLowerCase();
        return ua.indexOf("android") > -1;
    }
    
    //=========================================================================================================//
    /**
     * Function that determines phone device an calls AR intent
     * @requires rank a valid badge rank Identifier
     * @requires emblem a valid badge emblem Identifier
     * saves users location to a var
     */    
    const ViewAR = () =>{
        console.log(AndroidLink());
        if(validInputs()){

            console.log("ViewAR Clicked") ; 
            console.log(AndroidLink())                
            if(IsiOS()){
                const anchor = document.createElement('a');
                anchor.setAttribute('rel', 'ar');
                anchor.appendChild(document.createElement('img'));
                
                console.log("isiOS:");
                anchor.setAttribute('href', IosLink()+ "#canonicalWebPageURL=https://link.to.website.html");
                anchor.click(); 
            }
            else if (IsAndroid() ){
                var href = "https://arvr.google.com/scene-viewer/1.0?";
                href+="file="+AndroidLink();
                href+="&mode=ar_preferred#Intent;";
                href+="scheme=https;package=com.google.ar.core;";
                href+="action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;";
                href+="end;";
                window.location.replace(href );
                console.log("isAndroid:" + href);
                
            }
            else{
                setError({showError: true, message: "Your device is not AR compatible"});
            }
        }
        else{
            setError({showError: true, message: "Badge-Model inputs are invalid"});
        }
    }


    return (
        
        <>

            <IonToast
                isOpen={error.showError}
                message={String(error.message)}
                
                onDidDismiss={() => setError({showError: false, message: "no error here"})}
                duration={3000}
            />
            <IonCard>
                <IonButton color='primary' onClick={ViewAR}>View Model</IonButton>
            </IonCard>
        </>
    )
}

export default AR;