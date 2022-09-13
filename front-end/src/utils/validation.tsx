export const onlyLetters =(str:string) =>{
    return /[^a-zA-Z]/.test(str);
}

export const onlyAlphanumericAndUnderscore =(str:string) =>{
    return /^[A-Za-z][A-Za-z0-9_]{0,39}$/.test(str);
}

export const validEmail = (str:string)=>{
    return /\S+@\S+\.\S+/.test(str);
}

export const validPhone = (str:string)=>{
    return str.length===10
}
