import Web3 from "web3";
const web3 = new Web3(Web3.givenProvider);
//const web3 = new Web3(window.web3.currentProvider());
// var Web3 = require("web3");
//var web3 = new Web3();

window.addEventListener("load", async () => {
  // Modern dapp browsers...
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
      //await window.eth_requestAccounts;
    } catch (error) {
      // User denied account access...
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
  }
  // Non-dapp browsers...
  else {
    console.log(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
});

export default web3;