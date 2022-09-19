export const onlyLetters =(str:string) =>{
    return /[^a-zA-Z]/.test(str);
}

export const onlyLettersAndSpaces = (str:string)=>{
    return /[^a-zA-Z ]/.test(str);
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

export const validPassword = (str:string)=>{
    return /(?=.{8,})(?=.*?[^\w\s])(?=.*?[0-9])(?=.*?[A-Z]).*?[a-z].*/.test(str)
}

export const matchingPasswords = (str1:string, str2:string)=>{
    return str1===str2
}