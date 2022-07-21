
import { IonSlides, IonSlide, IonCard, IonCardHeader, IonCardTitle, useIonViewDidEnter } from "@ionic/react";
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
    bIcon?: string;
  }

export const BadgeSlider: React.FC<BadgeInputProps> = ( inp ) => {
    
    const mySlides1 = useRef<any>(null);
    const mySlides2 = useRef<any>(null);

    const [activeRank,setActvieRank] = useState(Bronze);
    const [activeEmblem,setActvieEmblem] = useState(bicep);

    
    const [activeARRank,setActvieARRank] = useState("b");
    const [activeAREmblem,setActvieAREmblem] = useState("bicep");

    const [activeRankId,setActvieRankId] = useState(0);
    const [activeEmblemId,setActvieEmblemId] = useState(0);
    const setBadgeIcon = async () => {
        localStorage.setItem('badgeIcon', activeARRank+"_"+activeAREmblem);
        console.log(activeARRank+"_"+activeAREmblem);
        console.log(activeRankId)
        console.log(activeEmblemId)
    }
    const handleRankChange = async () => {
        const swiper =  await mySlides1.current.getSwiper();
        setActvieRankId(swiper.activeIndex)
        if(swiper.activeIndex===0){
            setActvieRank(Bronze);
            setActvieARRank("b");
        }else if(swiper.activeIndex===1){
            setActvieRank(Silver);
            setActvieARRank("s");
        }else{
            setActvieRank(Gold);
            setActvieARRank("g");
        }
    };

    const handleEmblemChange = async () => {
        const swiper = await mySlides2.current.getSwiper();
        setActvieEmblemId(swiper.activeIndex)
        if(swiper.activeIndex===0){
            setActvieEmblem(bicep);
            setActvieAREmblem("bicep");
        }else if(swiper.activeIndex===1){
            setActvieEmblem(clean);
            setActvieAREmblem("clean");
        }else if(swiper.activeIndex===2){
            setActvieEmblem(cycle);
            setActvieAREmblem("cycle");
        }else if(swiper.activeIndex===3){
            setActvieEmblem(dumbell);
            setActvieAREmblem("dumbell");
        }else if(swiper.activeIndex===4){
            setActvieEmblem(gym);
            setActvieAREmblem("gym");
        }else if(swiper.activeIndex===5){
            setActvieEmblem(pullup);
            setActvieAREmblem("pullup");
        }else if(swiper.activeIndex===6){
            setActvieEmblem(running);
            setActvieAREmblem("run");
        }else if(swiper.activeIndex===7){
            setActvieEmblem(situp);
            setActvieAREmblem("situp");
        }else{
            setActvieEmblem(treadmill);
            setActvieAREmblem("treadmill");
        }
    };

    /**
     * @brief this function checks if the inputed values a valid ranks and emblems respectively
     * @param rank - "bronze", "gold", "silver" ,etc
     * @param emblem - "bicep" ,"clean" , etc
     * @returns boolean 
     */
    const validInputs = (rank:string, emblem:string) =>{
        const embID:string[] = ["bicep","clean","cycle","dumbell","gym","pullup","run", "situp","treadmill"];
        const rankID:string[] = ["b","s","g"];

        let count = 0;
        const swiper2 = mySlides2.current.getSwiper();
        const swiper1 = mySlides1.current.getSwiper();

        let valid = false;

        embID.forEach(element => {
            if(emblem === element) {
                valid = true
                swiper2.activeIndex = count
                console.log(swiper2.activeIndex)
                
            }
            count++;
        });

        if(!valid) return false

        valid = false
        count = 0;
        rankID.forEach(element => {
            if(rank === element) {
                valid = true
                swiper1.activeIndex=(count)
                console.log(swiper1.activeIndex)
            }
            count++;
        });

        return valid
    }
    /**
     * @brief this loop waits for the get request from Edit Badge to complete.
     * @param waiting - session storage variable 
     * @param timeout - to kill any potential infinte loop
     * @result will initalize the badge slider to that of the badge you want to edit
     */
    const setInitailCallbackLoop = async (timeout:number = 0) => {
        // not waiting
        if(sessionStorage.getItem("waiting")==="false"){
            setInital()
        }
        // is waiting
        else{
            // havent hit timeout yet
            if(timeout<10){
                // sleep 0.5 seconds
                setTimeout(() => {  console.log("World!"); }, 500);
                // recusive loop
                setInitailCallbackLoop(timeout+1);
            }
        }
        return
    }
    /**
     * @brief this function will set the badge canvas item to the badge icon of the preselected badge
     * @param bIcon - input prop to determine how to construct the badge icon 
     * @result sets badge icon states
     */
    const setInital=  () => {
        console.log("setInital Badge Icon Fired")

        let bIcon = sessionStorage.getItem("bi");
        // check if there is a predefined badge
        if(bIcon && bIcon!=='' ){
            console.log(bIcon)

            // split the icon id into its rank and emblem
            let split = bIcon.split("_")
            console.log(split[0]);
            console.log(split[1]);

            // check if its inputs are vaild and set the swiper component
            if(validInputs(split[0], split[1])){
                const embID:string[] = ["bicep","clean","cycle","dumbell","gym","pullup","run", "situp","treadmill"];
                
                const emb:any[] = [bicep,clean,cycle,dumbell,gym,pullup,running, situp,treadmill];
                let r:any;
                if(split[0]==="b") r = Bronze;
                else if(split[0]==="s") r = Silver;
                else  r = Gold;

                console.log(split[0]);
                console.log(split[1]);
                // set the badge canvas
                setActvieRank(r);
                setActvieARRank(split[0]);
                setActvieEmblem(emb[embID.indexOf(split[1])]);
                setActvieAREmblem(split[1]);
                setBadgeIcon()
            }
        }
    }

    useIonViewDidEnter(setInitailCallbackLoop)
    return (
        <>
        
        
        <IonCard class="glassForm">
        <IonCardHeader color="primary">
            <IonCardTitle className='inputHeading' class ="ion-text-center">Create Badge Icon</IonCardTitle> 
        </IonCardHeader>
    <BadgeCanvas name={inp.name}rank={activeRank} emblem = {activeEmblem}/>
            <IonSlides 
                options={slideOpts}
                ref={mySlides1}
                onIonSlideWillChange={()=>{handleRankChange(); handleEmblemChange()}} 
                onIonSlideDidChange={()=>{setBadgeIcon()} }
            >
            <IonSlide><img id = "Bronze" src={Bronze} width={10} height={10} alt='' /></IonSlide>
            <IonSlide><img id = "Silver"  src={Silver} width={10} height={10} alt='' /></IonSlide>
            <IonSlide><img id = "Gold"  src={Gold} width={10} height={10} alt='' /></IonSlide>
            </IonSlides>
        

            <IonSlides
                options={slideOpts}
                ref={mySlides2}
                onIonSlideWillChange={()=>{handleRankChange() ;handleEmblemChange()}} 
                onIonSlideDidChange={setBadgeIcon}
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
        <br></br>
        <AR rank={activeARRank} emblem={activeAREmblem} ></AR>

    </>
    );
};

export default BadgeSlider;