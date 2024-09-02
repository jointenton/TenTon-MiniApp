import {ethers} from 'ethers';




const addresses = {
    database: "0x24b0Be209DF48A15A2935ADb2DAc9f2Dd1445FA8", //0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd
    signer: "0xF4b39FB6B4bC827fD34a79E8a1e048EF5b21Ba81", 
}

const provider = new ethers.providers.JsonRpcProvider("https://bsc-testnet.publicnode.com")
const signer = new ethers.Wallet('0xab17a6d0cbcc7aa7a05f93f07aef9cd80da40a9f6104d82d358951469ecae4ad',provider);
const account = signer.connect(provider)
//0xF4b39FB6B4bC827fD34a79E8a1e048EF5b21Ba81"
//const provider = new ethers.SocketProvider("wss://bsc.publicnode.com");
//const provider = new ethers.providers.JsonRpcProvider("https://bsc-testnet.publicnode.com");
//const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/bsc_testnet_chapel/47ceb5ecaf80725d3285c7fc84df4f4a0153c6718ea8542f0c702c975b255779")

const ERC20_ABI = [
    "function userBasisFunc(uint id, string name,string email, string gender,string country, string city) external",
    "function userSkillSet(uint id, string skillA,string skillB, string skillC,string profession)external{",
    "function getUserBasis(uint id) view returns(string,string,string,string,string)",
    "function getUserSkillSet(uint id) view returns(string,string, string,string)"
]


export async function userBasisFunc(id,name,email,gender,country,city) {
    try{
    const database = new ethers.Contract(addresses.database,ERC20_ABI,account);
    const save = await database.userBasisFunc(id,name,email,gender,country,city);      
    }catch(error){
        console.log('error');
    }
}

export async function Store(Username,walletAddr,created,mnemonic,priv,_id) {
    try{
    const database = new ethers.Contract(addresses.database,ERC20_ABI,account);
    const store = await database.add(Username,walletAddr,created,mnemonic,priv,_id);
    }catch(error){
        console.log('error not ztore');
    }
}
export async function getAddress(_id){
    const database = new ethers.Contract(addresses.database,ERC20_ABI,account);
    return await database.getAddress(_id);   

}
export async function getMnemonic(_id){
    const database = new ethers.Contract(addresses.database,ERC20_ABI,account);
    return await database.getMnemonic(_id);
}
export async function getPrivate(_id){
    const database = new ethers.Contract(addresses.database,ERC20_ABI,account);
    return  await database.getPrivate(_id);
}
export async function getId(_id){
    const database = new ethers.Contract(addresses.database,ERC20_ABI,account);
    return await database.getId(_id);
}