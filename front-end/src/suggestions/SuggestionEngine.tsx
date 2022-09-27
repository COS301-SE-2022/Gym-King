export const hello=""



const common = (a1:string[], a2:string[])=>{
    let common = 0;
    a1.forEach(el1 => {
        console.log ("El1:" + el1)
        a2.forEach((el2)=>{
            console.log ( "El2:" + el2)
            if(el1===el2)
            {   common++
                console.log(common)
            }
        })
    });

    return common
}

export const similarityBetweenUsers = (B1:any, B2:any, N1:any, N2:any) =>{
    let similarity = (common(B1,B2) +common(N1,N2)-common(B1,N2)-common(B2,N1))
    let union =  (B1.concat(B2)).concat(N1.concat(N2))
    similarity= similarity / union.length
    console.log(similarity)
}

