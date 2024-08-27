// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract Events {

   struct Job{
     bytes jobType;
     string skill;
     string salary;
     string organization;
     string description;
   }

   struct Bounty{
    bytes bountyType;
    string skill;
    string reward;
    string organization;
    string description;
   }
   Job[] public Jobs;
   Bounty[] public  Bounties;

   mapping(bytes => Bounty[]) allSBounties;
   mapping(bytes => Job[]) allSJobs;
   mapping(uint =>mapping(bytes => Job[])) userJobs;
   mapping(uint =>mapping(bytes => Bounty[])) userBounty;

   function addJob(string memory skill,string memory salary,
   string memory organization,string memory desc)external {
    bytes memory jobtype = bytes(skill);
     Job memory jobs = Job(jobtype,skill,salary,organization,desc);
     Jobs.push(jobs);
     allSJobs[jobtype].push(jobs);
   }
   function addBounty(string memory skill,string memory reward,
   string memory organization,string memory desc)external {
    bytes memory bountyType = bytes(skill);
     Bounty memory bounty = Bounty(bountyType,skill,reward,organization,desc);
     Bounties.push(bounty);
     allSBounties[bountyType].push(bounty);
   }
   function getJobs(string memory skill,uint count) external view returns(string memory,string memory,string memory,string memory){
     bytes memory skillType = bytes(skill);
     Job[] memory jobs = allSJobs[skillType];
     return (jobs[count].skill,jobs[count].salary,jobs[count].organization,jobs[count].description);
   }
    function getBountry(string memory skill) external view returns(string memory,string memory,string memory,string memory){
     bytes memory bountyType = bytes(skill);
     Bounty[] memory jobs = allSBounties[bountyType];
     return (jobs[1].skill,jobs[2].reward,jobs[3].organization,jobs[4].description);
   }
   function applyJobs(uint id,string memory skill) external {
      bytes memory skillType = bytes(skill);
      Job[] memory jobs = allSJobs[skillType];
      for(uint i=0;i<jobs.length;i++){
        userJobs[id][skillType].push(jobs[i]);
      }
   }
    function applyBounty(uint id,string memory skill) external {
      bytes memory skillType = bytes(skill);
      Bounty[] memory jobs = allSBounties[skillType];
      for(uint i=0;i<jobs.length;i++){
        userBounty[id][skillType].push(jobs[i]);
      }
   }
   function getUserJobs(uint id,uint count,string memory skill) external view returns(string memory,string memory,string memory,string memory){
     bytes memory skillType = bytes(skill);
     Job[] memory jobs = userJobs[id][skillType];
    return(jobs[count].skill,jobs[count].salary,jobs[count].organization,jobs[count].description); 
   }
   function getUserBounty(uint id,uint count,string memory skill) external view returns(string memory,string memory,string memory,string memory){
     bytes memory skillType = bytes(skill);
     Bounty[] memory jobs = userBounty[id][skillType];
    return(jobs[count].skill,jobs[count].reward,jobs[count].organization,jobs[count].description); 
   }
} 