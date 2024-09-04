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
    "function addJob(string skill,string salary,string organization,string desc)external",
    "function addBounty(string skill,string reward,string organization,string desc)externa",
    "function getJobs(string skill,uint count) view returns(string,string,string,string)",
    "function getBountry(string skill) view returns(string,string,string,string)",
    "function applyJobs(uint id,string skill) external",
    "function applyBounty(uint id,string skill) external",
    "function getUserJobs(uint id,uint count,string skill) view returns(string,string,string,string)",
    "function getUserBounty(uint id,uint count,string skill) view returns(string,string ,string,string)"
]


export async function addJob(skill,salary,organization,desc) {
    try{
    const database = new ethers.Contract(addresses.database,ERC20_ABI,account);
    const save = await database.addJob(skill,salary,organization,desc);
        
    }catch(error){
        console.log('error');
    }
}

export async function addBounty(skill,salary,organization,desc) {
    try{
    const database = new ethers.Contract(addresses.database,ERC20_ABI,account);
    const save = await database.addBounty(skill,salary,organization,desc);
        
    }catch(error){
        console.log('error');
    }
}

export async function getJobs(skill,salary,organization,desc) {
    try{
    const database = new ethers.Contract(addresses.database,ERC20_ABI,account);
    const save = await database.getJobs(skill,salary,organization,desc);
        
    }catch(error){
        console.log('error');
    }
}

export async function getBountry(skill,salary,organization,desc) {
    try{
    const database = new ethers.Contract(addresses.database,ERC20_ABI,account);
    const save = await database.getBounty(skill,salary,organization,desc);
        
    }catch(error){
        console.log('error');
    }
}

export async function applyJobs(skill,salary,organization,desc) {
    try{
    const database = new ethers.Contract(addresses.database,ERC20_ABI,account);
    const save = await database.applyJobs(skill,salary,organization,desc);
        
    }catch(error){
        console.log('error');
    }
}

export async function applyBounty(skill,salary,organization,desc) {
    try{
    const database = new ethers.Contract(addresses.database,ERC20_ABI,account);
    const save = await database.applyBounty(skill,salary,organization,desc);
        
    }catch(error){
        console.log('error');
    }
}

export async function getUserJobs(skill,salary,organization,desc) {
    try{
    const database = new ethers.Contract(addresses.database,ERC20_ABI,account);
    const save = await database.getUserJobs(skill,salary,organization,desc);
        
    }catch(error){
        console.log('error');
    }
}

export async function getUserBounty(skill,salary,organization,desc) {
    try{
    const database = new ethers.Contract(addresses.database,ERC20_ABI,account);
    const save = await database.getUserBounty(skill,salary,organization,desc);
        
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