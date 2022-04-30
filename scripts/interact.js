const { BigNumber } = require("ethers");
let { ethers, network } = require("hardhat");
const API_KEY = process.env.NEXT_PUBLIC_API_URL; 
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const contract = require("../artifacts/contracts/DogNftDemo.sol/DogNftDemo.json")


const provider = new ethers.providers.JsonRpcProvider(API_KEY);

const signer = new ethers.Wallet(PRIVATE_KEY,provider);

const dogNftContract = new ethers.Contract(CONTRACT_ADDRESS,contract.abi,signer)

const contractSigner = dogNftContract.connect(signer)

async function main() {
    // let mintPrice = await dogNftContract.mintPrice();
    // console.log("The mintPrice is: " + mintPrice);
    // let isSaleActive = await dogNftContract.saleIsActive() 
    // console.log("isSaleActive " + isSaleActive)
    // await dogNftContract.toggleSaleState()
    // console.log("okkk")
    // console.log("updating mint price.....")
    // const tx = await dogNftContract.changeMintPrice("50000000000000000",{gasLimit: 50000})
    // await tx.wait()
    // mintPrice = await dogNftContract.mintPrice();
    // console.log("new mint price is " + mintPrice)
}
main();








/* m1 in maşn func
    const [owner, addr1, addr2, ...addrs] =  await ethers.getSigners();
    console.log("signer " + JSON.stringify(owner))
    const dogNftDemoContract = await ethers.getContractFactory("DogNftDemo")
    const dogNFT = await dogNftDemoContract.deploy();
    let mintPrice_ = await dogNFT.mintPrice();
   console.log("mp ---> wei" + mintPrice_ + " eth -> " + Web3.utils.fromWei(mintPrice_.toString()))

   console.log("isActive + " + await dogNFT.saleIsActive())
   await dogNFT.toggleSaleState()
   console.log("isActive + " + await dogNFT.saleIsActive())
    await dogNFT.changeMintPrice("40000000000000000")
    mintPrice_ = await dogNFT.mintPrice();
    console.log("mp ---> wei" + mintPrice_ + " eth -> " + Web3.utils.fromWei(mintPrice_.toString()))
   */