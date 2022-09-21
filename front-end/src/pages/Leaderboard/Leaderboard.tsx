import {IonContent, IonHeader, IonLabel, IonLoading, IonPage, IonSegment, IonSegmentButton, IonText, useIonViewDidEnter} from '@ionic/react';
import React, {  useState } from 'react';
import { ToolBar } from '../../components/toolbar/Toolbar';
import './Leaderboard.css';
import LeaderboardValues from '../../components/LeaderBoardSwiper/LeaderBoardValues/LeaderboardValues';
import axios from "axios";


const Leaderboard: React.FC = () =>{
    const [overall, setOverall] = useState(new Array<any>());
    const [cardio, setcardio] = useState(new Array<any>());
    const [strength, setstrength] = useState(new Array<any>());
    const [type, setType] = useState('overall');
    const [loading, setLoading] = useState<boolean>(false);



    const choosePage = () => {
        switch(type) {
    
            case "overall":   return <LeaderboardValues scores={overall} ></LeaderboardValues>
            case "cardio":   return <LeaderboardValues scores={cardio}></LeaderboardValues>
            case "strength": return <LeaderboardValues scores={strength}></LeaderboardValues>    
            default:      return <LeaderboardValues scores={overall}></LeaderboardValues>
        }
    }
    const segmentChanged = (e: any)=>{
        setType(e.detail.value);
     }
     useIonViewDidEnter(()=>
    {
        var gymid=sessionStorage.getItem("gid");
        var index:number;
        var Overall:any=[];
        var Cardio:any=[];
        var Strength:any=[];

        

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
        setLoading(true)
        axios.get(process.env["REACT_APP_GYM_KING_API"]+`/leaderboard/score/${gymid}`)
        .then(response =>response.data)
        .then(response =>{
            let results=response;
            
            console.log(results)
            setLoading(false)

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
                    bflag2=inArray(results[i].username,Strength)
                    assign(results[i].username,getpoints(results[i].count,results[i].badgename),bflag2,index,Strength)   
                }
                assign(results[i].username,getpoints(results[i].count,results[i].badgename),bflag,index,Overall)

               
            }
            Overall.sort((a:any,b:any)=>{ return b.points-a.points})
            Cardio.sort((a:any,b:any)=>{ return b.points-a.points})
            Strength.sort((a:any,b:any)=>{ return b.points-a.points})
            setOverall(Overall)
            setcardio(Cardio)
            setstrength(Strength)
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
    },[])

    return(
        <IonPage >
            <IonHeader>
                <ToolBar></ToolBar>
            </IonHeader>
            <br></br>
            <IonContent fullscreen className='Content'>
                <IonText className='PageTitle center'>Leaderboard</IonText>
                <IonSegment onIonChange={segmentChanged} value={type}>
                    <IonSegmentButton value="overall" >
                        <IonLabel>Overall</IonLabel>
                        
                    </IonSegmentButton>
                    <IonSegmentButton value="cardio">
                        <IonLabel>Cardio</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="strength">
                        <IonLabel>Strength</IonLabel>
                    </IonSegmentButton>
                </IonSegment>
                <br></br>
                <div>
                {
                   choosePage()
                }
                </div>
                
                <IonLoading 
                    isOpen={loading}
                    message={"Loading"}
                    spinner={"circles"}
                    onDidDismiss={() => setLoading(false)}
                    cssClass={"spinner"}
                    
                />
            </IonContent>
        </IonPage>
    )

}

export default Leaderboard;

