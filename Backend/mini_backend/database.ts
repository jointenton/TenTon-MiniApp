export interface UserDetails {
    id:number,
    name:string,
    email:string,
    gender:string,
    city:string,
    country:string,
    skills,
    profession
}

export class UserDetail{
   private userInfo : UserDetails[] = [];

   add(_user){
    this.userInfo.push(_user);
   }
   get(id){
    return this.userInfo.find((t)=> t.id === id);
   }
   update(id,name,email,gender,city,country,skill,profession){
    const index = this.userInfo.findIndex((t)=> t.id === id);
    if (index !== -1) {
        this.userInfo[index] = {
            id, 
            name:name,
            email:email,
            gender:gender,
            city:city,
            country:country,
            skills : skill,
            profession:profession
        }
   }
  }
}