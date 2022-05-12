import React, { useState } from "react";
import { Map, Overlay} from "pigeon-maps";
import { IonFab, IonFabButton} from "@ionic/react";
import "./SelectGymMap.css"
import { stamenToner } from 'pigeon-maps/providers'
export function SelectGymMap() {


  const image:string="https://www.pngfind.com/pngs/m/219-2197153_gym-building-sport-training-svg-png-free-.png"
  const queryString=window.location.search
  const   urlParams = new URLSearchParams(queryString);
  const name=urlParams.get('name')
  const address=urlParams.get('address')
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
  const href:string="http://localhost:3000/AddGym?name="+name+"&address="+address+"&latitude="+center[0]+"&longitude="+center[1];


  return (
    <div>
    <Map
     provider={stamenToner}
     height={800}
     center={[center[0],center[1]]} 
     zoom={zoom} 
     onBoundsChanged={({ center, zoom }) => { 
       setCenter(center) 
       setZoom(zoom) 
     }} >
       <Overlay anchor={[center[0],center[1]]} offset={[30,30]} >
          <img src={image} width={80} height={80} alt='building icon' />
        </Overlay>
    </Map>
    <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton href={href} class="SelectGymMapButton">
            Select
          </IonFabButton>
        </IonFab>
    </div>
  );
} 