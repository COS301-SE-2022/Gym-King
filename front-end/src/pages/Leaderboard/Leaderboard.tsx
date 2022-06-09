import {IonContent, IonHeader, IonPage, IonText} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { ToolBar } from '../../components/toolbar/Toolbar';

import './Leaderboard.css';
import {LeaderboardSwiper} from '../../components/LeaderBoardSwiper/LeaderboardSwiper'

const Leaderboard: React.FC = () =>{
    const [overall, setOverall] = useState(new Array<any>());
    const [cardio, setcardio] = useState(new Array<any>());
    const [strength, setstrength] = useState(new Array<any>());
    useEffect(()=>
    {
        var gymid="lttD"
        var index:number;
        var Overall:any=[];
        var Cardio:any=[];
        var Strenght:any=[];
        function assign(username:string,points:number,flag:boolean,i:number,arr:any[])
        {
            if(flag)
            {
                arr[i]={
                        username,
                        'points':arr[i].points+points }
            }
            else
            {
                arr.push({
                    username,
                    points
                })
            }
        }
        function getpoints(count:number,badgename:string)
        {
            if (badgename.toLowerCase().includes("Bronze".toLowerCase()))
            {
                let val:number=count*50;
                return val
            }
            else if (badgename.toLowerCase().includes("Silver".toLowerCase()))
            {
                let val:number=count*100;
                return val;
            }
            else
            {
                let val:number=count*150;
                return val;
            }
        }
        function inArray(name:string,arr:any[])
        {   
            let bflag=false;
            for(let j=0;j<arr.length;j++)
                {
                    if(name===arr[j].username)
                    {
                        bflag=true;
                        index=j;
                        break;
                    }
                }
            return bflag;
        }
        fetch(`https://gym-king.herokuapp.com/leaderboard/score?gid=${gymid}`,{
            "method":"GET"
        })
        .then(response =>response.json())
        .then(response =>{
            let results=response.results;
            
            console.log(results)

            for(let i=0;i<results.length;i++)
            {
                index=-1;
                let bflag:boolean=inArray(results[i].username,Overall) 
                let bflag2:boolean=false;
                if (results[i].activitytype.toLowerCase().includes("Cardio".toLowerCase()))
                {
                    bflag2=inArray(results[i].username,Cardio)
                    assign(results[i].username,getpoints(results[i].count,results[i].badgename),bflag2,index,Cardio)

                }
                else
                {
                    bflag2=inArray(results[i].username,Strenght)
                    assign(results[i].username,getpoints(results[i].count,results[i].badgename),bflag2,index,Strenght)   
                }
                assign(results[i].username,getpoints(results[i].count,results[i].badgename),bflag,index,Overall)

               
            }
            Overall.sort((a:any,b:any)=>{ return b.points-a.points})
            Cardio.sort((a:any,b:any)=>{ return b.points-a.points})
            Strenght.sort((a:any,b:any)=>{ return b.points-a.points})
            setOverall(Overall)
            setcardio(Cardio)
            setstrength(Strenght)
        })
        .catch(err => {console.log(err)})
    },[])

    return(
        <IonPage >
            <IonHeader>
                <ToolBar></ToolBar>
            </IonHeader>
            <br></br>
            <IonContent fullscreen className='Content'>
                <IonText className='PageTitle center'>Leaderboard</IonText>
                <LeaderboardSwiper overall={overall} cardio={cardio} strength={strength} ></LeaderboardSwiper>  
            </IonContent>
        </IonPage>
    )
        

}

export default Leaderboard;