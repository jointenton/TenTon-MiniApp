import { UserDetail, UserDetails } from "./database";

const userData = new UserDetail();

export function signUp(id,name,email,gender,city,country,skill,profession){
    const userEntry : UserDetails = {
        id:id,
        name:name,
        email:email,
        gender:gender,
        city:city,
        country:country,
        skills:skill,
        profession:profession
    }
    userData.add(userEntry)
}
export function signIn(id){
    return userData.get(id);
}
export function updateId(id,name,email,gender,city,country,skill,profession){
   userData.update(id,name,email,gender,city,country,skill,profession)
}
