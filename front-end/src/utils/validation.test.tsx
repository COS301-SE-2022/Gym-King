jest.setTimeout(25000)
import {onlyLetters,onlyLettersAndSpaces,onlyAlphanumericAndUnderscore,validEmail,validPhone,validPassword,matchingPasswords} from './validation'
test('renders without crashing', async() => {
    expect(() => onlyLetters("")).not.toThrow();
    expect(() => onlyLettersAndSpaces("")).not.toThrow();
    expect(() => onlyAlphanumericAndUnderscore("")).not.toThrow();
    expect(() => validEmail("")).not.toThrow();
    expect(() => validPhone("")).not.toThrow();
    expect(() => validPassword("")).not.toThrow();
    expect(() => matchingPasswords("","")).not.toThrow();
});

test('renders without crashing', async() => {
    expect(() => onlyLetters("test")).toBeTruthy()
    expect(() => onlyLetters("123")).not.toBeTruthy()
    expect(() => onlyLettersAndSpaces("adsf sdf")).toBeTruthy()
    expect(() => onlyLettersAndSpaces("adsf sdf123")).not.toBeTruthy()
    expect(() => onlyAlphanumericAndUnderscore("1s_")).toBeTruthy()
    expect(() => onlyAlphanumericAndUnderscore("&")).not.toBeTruthy()
    expect(() => validEmail("test@icloud.com")).toBeTruthy()
    expect(() => validEmail("test")).not.toBeTruthy()
    expect(() => validPhone("sdfsf")).not.toBeTruthy()
    expect(() => validPhone("0192876542")).toBeTruthy()
    expect(() => validPhone("01928542")).not.toBeTruthy()
    expect(() => validPassword("1234")).not.toBeTruthy()
    expect(() => validPassword("$upaSecret5")).toBeTruthy();
    expect(() => matchingPasswords("123","123")).toBeTruthy()    
    expect(() => matchingPasswords("123","12322")).not.toBeTruthy()
});


