import React from 'react';
import './BadgeImage.css'
import Bronze from '../../badges/rank/bronze.png'
import Gold from '../../badges/rank/gold.png'
import Silver from '../../badges/rank/silver.png'

import bicep from '../../badges/emblem/bicep.png'
import clean from '../../badges/emblem/clean.png'
import cycle from '../../badges/emblem/cycle.png'
import dumbell from '../../badges/emblem/dumbell.png'
import gym from '../../badges/emblem/gym.png'
import pullup from '../../badges/emblem/pullup.png'
import running from '../../badges/emblem/run.png'
import situp from '../../badges/emblem/situp.png'
import treadmill from '../../badges/emblem/treadmill.png'


export const BadgeImage=(props:{Badgerank:string,BadgeEmblem:string,idRank:string,idEmblem:string})=>{

    let emblem;
    let rank;
    if(props.Badgerank==="b"){
        rank=Bronze;
    }
    else if(props.Badgerank==="s")
    {
        rank=Silver
    }
    else{
        rank=Gold
    }

    switch(props.BadgeEmblem){
        case "bicep":
            emblem=bicep;
            break;
        case "clean":
            emblem=clean;
            break;
        case "cycle":
            emblem=cycle;
            break;
        case "dumbell":
            emblem=dumbell;
            break;
        case "gym":
            emblem=gym;
            break;
        case "pullup":
            emblem=pullup;
            break;
        case "running":
            emblem=running;
            break;
        case "situp":
            emblem=situp;
            break;
        case "treadmill":
            emblem=treadmill;
            break;
        default:
            emblem=bicep;
        }

   
    return (
        <div>
            <img  id={props.idEmblem} src={emblem} alt = ''/>  
            <img id={props.idRank} src={rank} alt = ''/>  
        </div>
    );}

export default BadgeImage;