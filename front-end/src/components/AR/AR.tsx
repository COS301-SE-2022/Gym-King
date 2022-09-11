/** 
* @file AR.tsx
* @brief provides interface of AR component to view badges 
*/
import {IonButton, IonToast} from '@ionic/react';
import React, { useState } from "react";
import './AR.css';
import DeviceInfo from 'react-native-device-info';

/**
 * @brief input inteface for IonToast 
 */
interface inputError {
    showError: boolean;
    message?: String;

}
/**
 * @brief input inteface for custom AR component 
 */
export interface ARInputProps {
    rank: string,
    emblem: string    
}
/**
 * @brief this component detects if a compatible device is being used and starts up ARcore/ARkit 
 * 
 * @param inp - used to determine what badge to fetch from the API
 * @param inp.rank - the rank of the ARbadge model "b", "s", "g" ...etc
 * @param inp.emblem - the emblem of the ARbadge model "bicep", "situp", "gym" ...etc  
 * @result opens up AR scene 
 */
const AR: React.FC<ARInputProps> = ( inp ) => {

    //=========================================================================================================//
    /**
     * @brief state to control error pop 
     */
    const [error, setError] = useState<inputError>({showError: false});
    
    //=========================================================================================================//
    /**
     * @brief link to android badge model
     */
    const AndroidLink = () =>{
            return "https://gym-king.herokuapp.com/Model/Android%3Frank%3D"+inp.rank  +"%26emblem%3D"  + inp.emblem;
    }

    /**
     * @brief link to ios badge model
     */
    const IosLink = () =>{
        return "https://gym-king.herokuapp.com/Model/iOS?rank="+inp.rank  +"&emblem="  + inp.emblem;
    }
    
    //=========================================================================================================//
    /**
     * @brief used to determine if the given inputs are valid
     * @returns boolean
     */
    const validInputs = () =>{
        // valid emblems
        const embID:string[] = ["bicep","clean","cycle","dumbell","gym","pullup","run", "situp","treadmill"];
        // valid ranks
        const rankID:string[] = ["b","s","g"];

        // return value
        let valid = false;

        // loop thrugh all valid emblems and compare with inp.emblem
        embID.forEach(element => {
            if(inp.emblem === element) valid = true
        });

        //return false if no match was found
        if(!valid) return false

        
        // loop thrugh all valid ranks and compare with inp.ranks
        valid = false
        rankID.forEach(element => {
            if(inp.rank === element) valid = true
        });

        return valid
    }

    //=========================================================================================================//
    /**
     * @brief this function is used to determine what kind of ios device is being used and if it is compatible with ARkit
     * @returns boolean
     */
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
    
    //=========================================================================================================//
    /**
     * @brief this function is used to determine what kind of android device is being used and if it is compatible with ARcore
     * @returns boolean
     */
    const IsAndroid = () =>{
        var ua = navigator.userAgent.toLowerCase();
        return ua.indexOf("android") > -1;
    }
    
    //=========================================================================================================//
    /**
     * Function that determines phone device and calls AR intent
     * @requires rank a valid badge rank Identifier
     * @requires emblem a valid badge emblem Identifier
     * saves users location to a var
     */    
    const ViewAR = () =>{

        // check if the component inputs are valid
        if(validInputs()){    
            
            // check if IOS device
            if(IsiOS()){
                // build the href intent to open up arkit
                const anchor = document.createElement('a');
                anchor.setAttribute('rel', 'ar');
                anchor.appendChild(document.createElement('img'));
                anchor.setAttribute('href', IosLink()+ "#canonicalWebPageURL=https://link.to.website.html");
                
                // launch intent
                anchor.click(); 
            }
            // check if Android device
            else if (IsAndroid() ){

                // build the href intent to open up arcore
                var href = "https://arvr.google.com/scene-viewer/1.0?";
                href+="file="+AndroidLink();
                href+="&mode=ar_preferred#Intent;";
                href+="scheme=https;package=com.google.ar.core;";
                href+="action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;";
                href+="end;";

                // launch intent
                window.location.replace(href) ;
                console.log("isAndroid:" + href);
                
            }
            
            // device is not compatible
            else{ 
                // display error message
                setError({showError: true, message: "Your device is not AR compatible"});
            }
        }
        else{ 
            // display error message
            setError({showError: true, message: "Badge-Model inputs are invalid"});
        }
    }

    //=========================================================================================================//
    /**
     * @brief a simple button with an iontoast 
     */
    return (
        <>
            <IonToast
                isOpen={error.showError}
                message={String(error.message)}
                
                onDidDismiss={() => setError({showError: false, message: "no error here"})}
                duration={3000}
            /><br></br>
            <IonButton color='primary' onClick={ViewAR} style={{"width":"80%"}} className="centerComp">View Model</IonButton>
        </>
    )
}

export default AR;