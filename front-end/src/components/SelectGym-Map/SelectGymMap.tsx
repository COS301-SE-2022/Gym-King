import React, { useState } from "react";
import { Map} from "pigeon-maps";
import { IonFab, IonFabButton} from "@ionic/react";
import "./SelectGymMap.css"

export function SelectGymMap() {


 
  const queryString=window.location.search
  const urlParams = new URLSearchParams(queryString);
  const name=urlParams.get('name')
  var y:number
  var x:number
  var latitude=urlParams.get('latitude')
  if(!latitude)
  { y=-25.7545 }
  else
  { y=parseFloat(latitude) }

  var longitude=urlParams.get('longitude')
  if(!longitude)
  { x= 28.2314 }
  else
  { x=parseFloat(longitude)}

  const [center, setCenter] = useState([y,x])
  const [zoom, setZoom] = useState(19)
  const href:string="http://localhost:3000/AddGym?name="+name+"&latitude="+center[0]+"&longitude="+center[1];


  return (
    <div>
    <Map
     height={800}
     center={[center[0],center[1]]} 
     zoom={zoom} 
     onBoundsChanged={({ center, zoom }) => { 
       setCenter(center) 
       setZoom(zoom) 
     }} >
    </Map>
    <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton href={href} class="SelectGymMapButton">
            Select
          </IonFabButton>
        </IonFab>
    </div>
  );
}