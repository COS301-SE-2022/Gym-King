
import { IonSlides, IonSlide, IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";
import React, {  useRef, useState } from 'react';

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

import BadgeCanvas from "../BadgeCanvas/BadgeCanvas";

import './BadgeSlider.css';
import AR from "../AR/AR";
// Optional parameters to pass to the swiper instance.
// See http://idangero.us/swiper/api/ for valid options.
const slideOpts = {
  initialSlide: 0,
  speed: 400,

  
};

export const value={
    value: "bronze-bicep"
}
export interface BadgeInputProps {
    name: string;
    component?: JSX.Element;
  }

export const BadgeSlider: React.FC<BadgeInputProps> = () => {
    
    const mySlides1 = useRef<any>(null);
    const mySlides2 = useRef<any>(null);

    const [activeRank,setActvieRank] = useState(Bronze);
    const [activeEmblem,setActvieEmblem] = useState(bicep);

    
    const [activeARRank,setActvieARRank] = useState("b");
    const [activeAREmblem,setActvieAREmblem] = useState("bicep");

    const [activeRankId,setActvieRankId] = useState(0);
    const [activeEmblemId,setActvieEmblemId] = useState(0);
    const setBadgeIcon = async () => {
        localStorage.setItem('badgeIcon', activeRankId+"-"+activeEmblemId);
    }
    const handleRankChange = async () => {
        const swiper = await mySlides1.current.getSwiper();
        await setActvieRankId(swiper.activeIndex)
        if(swiper.activeIndex===0){
            setActvieRank(Bronze);
        }else if(swiper.activeIndex===1){
            setActvieRank(Silver);
        }else{
            setActvieRank(Gold);
        }
        await setActvieARRank( encodeRank() )
        await setBadgeIcon();
    };

    const handleEmblemChange = async () => {
        const swiper = await mySlides2.current.getSwiper();
        await setActvieEmblemId(swiper.activeIndex)
        if(swiper.activeIndex===0){
            setActvieEmblem(bicep);
        }else if(swiper.activeIndex===1){
            setActvieEmblem(clean);
        }else if(swiper.activeIndex===2){
            setActvieEmblem(cycle);
        }else if(swiper.activeIndex===3){
            setActvieEmblem(dumbell);
        }else if(swiper.activeIndex===4){
            setActvieEmblem(gym);
        }else if(swiper.activeIndex===5){
            setActvieEmblem(pullup);
        }else if(swiper.activeIndex===6){
            setActvieEmblem(running);
        }else if(swiper.activeIndex===7){
            setActvieEmblem(situp);
        }else{
            setActvieEmblem(treadmill);
        }
        await setActvieAREmblem( encodeEmblem() )
        await setBadgeIcon();
    };

    const encodeRank=() =>{
        const swiper =  mySlides1.current.getSwiper();
        if(swiper.activeIndex===0){
            return "b"
        }else if(swiper.activeIndex===1){
            return "s"
        }else{
            return "g"
        }

    }    
    const encodeEmblem=() =>{
        const swiper =  mySlides2.current.getSwiper();
        if(swiper.activeIndex===0){
            return "bicep"
        }else if(swiper.activeIndex===1){
            return "clean"
        }else if(swiper.activeIndex===2){
            return "cycle"
        }else if(swiper.activeIndex===3){
            return "dumbell"
        }else if(swiper.activeIndex===4){
            return "gym"
        }else if(swiper.activeIndex===5){
            return "pullup"
        }else if(swiper.activeIndex===6){
            return "run"
        }else if(swiper.activeIndex===7){
            return "situp"
        }else{
            return "treadmill"
        }
    }
    setBadgeIcon();
    return (
        <>
        
        <IonCard>
        <IonCardHeader>
            <IonCardTitle className='inputHeading' class ="ion-text-center">Create Badge Icon</IonCardTitle> 


        </IonCardHeader>
        
            <IonSlides 
                options={slideOpts}
                ref={mySlides1}
                onIonSlideDidChange={handleRankChange} 
            >
            <IonSlide><img id = "Bronze" src={Bronze} width={10} height={10} alt='' /></IonSlide>
            <IonSlide><img id = "Silver"  src={Silver} width={10} height={10} alt='' /></IonSlide>
            <IonSlide><img id = "Gold"  src={Gold} width={10} height={10} alt='' /></IonSlide>
            </IonSlides>
        

            <IonSlides
                options={slideOpts}
                ref={mySlides2}
                onIonSlideDidChange={handleEmblemChange}
            >
            <IonSlide><img id = "bicep"  src={bicep} width={10} height={10} alt='' /></IonSlide>
            <IonSlide><img id = "clean"  src={clean} width={10} height={10} alt='' /></IonSlide>
            <IonSlide><img id = "cycle"  src={cycle} width={10} height={10} alt='' /></IonSlide>
            <IonSlide><img id = "dumbell"  src={dumbell} width={10} height={10} alt='' /></IonSlide>
            <IonSlide><img id = "gym"  src={gym} width={10} height={10} alt='' /></IonSlide>
            <IonSlide><img id = "pullup"  src={pullup} width={10} height={10} alt='' /></IonSlide>
            <IonSlide><img id = "run"  src={running} width={10} height={10} alt='' /></IonSlide>
            <IonSlide><img id = "situp"  src={situp} width={10} height={10} alt='' /></IonSlide>
            <IonSlide><img id = "treadmill"  src={treadmill} width={10} height={10} alt='' /></IonSlide>
            </IonSlides>
        </IonCard>
        <BadgeCanvas rank={activeRank} emblem = {activeEmblem}/>
        <AR rank={activeARRank} emblem={activeAREmblem} ></AR>

    </>
    );
};

export default BadgeSlider;