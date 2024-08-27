// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract TenTon {
   struct Basis{
      uint id;
      string name;
      string email;
      string gender;
      string country;
      string city;
   }
   struct Skills{
      uint id;
      string skillA;
      string skillB;
      string skillC;
      string profession;
   }
   address admin;

   mapping(uint => Basis) userBasis;
   mapping(uint => Skills) userSkill;

    constructor(){
      admin = msg.sender;
    }

    modifier OnlyDev(){
     require(msg.sender == admin,"ERROR NOT AN ADMIN");
     _;
    }
    
   function userBasisFunc(uint id, string memory name,string memory email, string memory gender
   , string memory country, string memory city
   ) external {
     Basis memory _uB = Basis(id,name,email,gender,country,city);
     userBasis[id] = _uB;
   }
   function userSkillSet(uint id, string memory skillA,string memory skillB, string memory skillC,string memory profession)external{
    Skills memory uS = Skills(id,skillA,skillB,skillC,profession);
    userSkill[id]= uS; 
   }
   function getUserBasis(uint id) external view returns(string memory,string memory,string memory,string memory,string memory){
     Basis memory uB = userBasis[id];
    return (uB.name,uB.email,uB.gender,uB.country,uB.city);
   }
   function getUserSkillSet(uint id) external view returns(string memory,string memory, string memory,string memory){
     Skills memory uS = userSkill[id];
     return (uS.skillA,uS.skillB,uS.skillC,uS.profession);
   }
}