import {ethers} from 'ethers';




const addresses = {
    database: "0x50640df836ce613e8363d3f20eb07ea9c4258b83", //0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd
    signer: "0x27cAC9D6Be43fA197cafCE3a4428eaA9E67088C8", 
}

//const provider = new ethers.providers.JsonRpcProvider("https://bsc-testnet.publicnode.com");
//const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/bsc_testnet_chapel/47ceb5ecaf80725d3285c7fc84df4f4a0153c6718ea8542f0c702c975b255779")
const provider = new ethers.providers.WebSocketProvider("wss://bsc.publicnode.com");
//const provider = new ethers.providers.JsonRpcProvider("https://bsc-testnet.publicnode.com")
const signer = new ethers.Wallet('26d9268b29aebd99ad7c846f154ff6ae96aad2ef6072cd42c169857f65f41c05',provider);
const account = signer.connect(provider)
//0xF4b39FB6B4bC827fD34a79E8a1e048EF5b21Ba81"


const ERC20_ABI = [
    "function userBasisFunc(uint id, string name,string email, string gender,string country, string city) external",
    "function userSkillSet(uint id, string skillA,string skillB, string skillC,string profession)external",
    "function getUserBasis(uint id) view returns(string,string,string,string,string)",
    "function getUserSkillSet(uint id) view returns(string,string, string,string)"
]


export async function userBasisFunc(id,name,email,gender,country,city) {
    try{
    const database = new ethers.Contract(addresses.database,ERC20_ABI,account);
    const save = await database.userBasisFunc(id,name,email,gender,country,city);      
    }catch(error){
        console.log(error);
    }
}

export async function userSkillSet(id,skillA,skillB,skillC,profession) {
    try{
    const database = new ethers.Contract(addresses.database,ERC20_ABI,account);
    const save = await database.userSkillSet(id,skillA,skillB,skillC,profession);      
    }catch(error){
        console.log('error');
    }
}

export async function getUserBasis(id) {
    try{
    const database = new ethers.Contract(addresses.database,ERC20_ABI,account);
     await database.getUserBasis(id);      
    }catch(error){
        console.log('error');
    }
}

export async function getUserSkillSet(id) {
    try{
    const database = new ethers.Contract(addresses.database,ERC20_ABI,account);
    const save = await database.getUserSkillSet(id);      
    }catch(error){
        console.log('error');
    }
}

// export async function Store(Username,walletAddr,created,mnemonic,priv,_id) {
//     try{
//     const database = new ethers.Contract(addresses.database,ERC20_ABI,account);
//     const store = await database.add(Username,walletAddr,created,mnemonic,priv,_id);
//     }catch(error){
//         console.log('error not ztore');
//     }
// }
// export async function getAddress(_id){
//     const database = new ethers.Contract(addresses.database,ERC20_ABI,account);
//     return await database.getAddress(_id);   

// }
// export async function getMnemonic(_id){
//     const database = new ethers.Contract(addresses.database,ERC20_ABI,account);
//     return await database.getMnemonic(_id);
// }
// export async function getPrivate(_id){
//     const database = new ethers.Contract(addresses.database,ERC20_ABI,account);
//     return  await database.getPrivate(_id);
// }
// export async function getId(_id){
//     const database = new ethers.Contract(addresses.database,ERC20_ABI,account);
//     return await database.getId(_id);
// }