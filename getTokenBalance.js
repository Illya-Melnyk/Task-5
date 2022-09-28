import { ethers } from "./ethers-5.6.esm.min.js";

document.getElementById("addToList").addEventListener("click", addToList);
document.getElementById("checkBalanceButton").addEventListener("click", getBalance);

const addressesList = new Array;

function addToList() {
    const holder = document.getElementById("holder").value;
    addressesList.push({ holder });
    
    document.getElementById("holder").value = "";
}

async function getBalance() {
    await window.ethereum.enable();

    let tokenContract;
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();
    
    const tokenAddress = "0x56119ba620e7e05e60D0CE773dA036D5e4b33d00";

    const tokenABI = [
        "function balanceOf(address account) external view returns (uint256)"
    ];

    tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);
    
    

    addressesList.forEach(async (element) => {
        console.log(element.holder, ethers.utils.formatEther(await tokenContract.balanceOf(await element.holder)));
    })
}