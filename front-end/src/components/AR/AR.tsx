
import {IonButton, IonCard} from '@ionic/react';
import React, { useState } from "react";
import './AR.css';



//===============================================================================================================================================//
//DEVICE TYPE FUNCTIONS
//===============================================================================================================================================//


const AR: React.FC = () => {
    var selectedARanimation = 0;
    var ar_Android_Links = [
        "https://www.bizarapp1.co.za/BizarLMS/NWU/Models/Eagi/android/AR0.glb"
    ]
    
    var ar_iOS_Links = [
        "https://www.bizarapp1.co.za/BizarLMS/NWU/Models/Eagi/ios/AR0.usdz",
    ]
    
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
    
    
    
    
    const ViewAR = () =>{  
        console.log("ViewAR Clicked") ;                 
        if(IsiOS() && selectedARanimation>=0 && selectedARanimation<ar_iOS_Links.length){
            const anchor = document.createElement('a');
            anchor.setAttribute('rel', 'ar');
            anchor.appendChild(document.createElement('img'));
            
            console.log("isiOS:");
            anchor.setAttribute('href', ar_iOS_Links[0] + "#canonicalWebPageURL=https://link.to.website.html");
            anchor.click(); 
        }
        else if (IsAndroid() && selectedARanimation>=0 && selectedARanimation<ar_Android_Links.length){
            var href = "intent://arvr.google.com/scene-viewer/1.0?";
            href+="file=" + ar_Android_Links[0];
            href+="&mode=ar_only#Intent;";
            href+="scheme=https;package=com.google.ar.core;";
            href+="action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;";
            href+="end;";
    
            console.log("isAndroid:" + href);
            const anchor = document.createElement('a');
            anchor.appendChild(document.createElement('img'));
            anchor.setAttribute('href', href);
            anchor.click();
        }
    }


    return (
        
        <>
            <IonCard>
                <IonButton color='primary' onClick={ViewAR}>Accept</IonButton>

            </IonCard>
        </>
    )
}

export default AR;