import { getUserBasis, getUserSkillSet, userBasisFunc, userSkillSet } from "./tenton_user";

export async function signUp(id,name,email,gender,country, city) {
    await userBasisFunc(id,name,email,gender,country,city);
}
export async function logIn(id){
    const info : any = await getUserBasis(id);
    if(info === null || info[0] === ''){
        console.log('NOT REGISTERED');
    }
}
//export async function userSkillSet(id,skillA,skillB,skillC,profession)
export async function registerSkillSet(id,skillA,skillB,skillC,profession){
    await userSkillSet(id,skillA,skillB,skillC,profession);
}
export async function getSkillSet(id){
    const info:any = await getUserSkillSet(id)
    if(info === null || info[0] === ''){
        console.log('SKILL SET UNREGISTERED');
    }
}
signUp(193,'Mona','mona@gmail.com','Male','Nigeria','Lagos');