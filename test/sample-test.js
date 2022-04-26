const { expect } = require("chai");
const { ethers ,waffle} = require("hardhat");
const Web3 = require("web3");
const provider = waffle.provider;

const my_addr = "0xbE8D4707B4D9b7A87DE9bAc74A9Fa583ca04BfC1";
describe("Token contract", function () {
    let Minter;
    let minterNFT;

    this.beforeEach(async function () {
        Minter = await ethers.getContractFactory("DogNftDemo")
        minterNFT = await Minter.deploy();
    })
    describe("deployment", function () {
        it("deploy is done succesfully and total supply is 0 initially", async () => {
            //const [owner] = await ethers.getSigners();
            expect(await minterNFT.totalSupply()).to.equal(0)

        })
        it("has a name", async () => {
            expect(await minterNFT.name()).to.equal("DogNftDemo")
        })
        it("has a symbol", async () => {
            const symbol = await minterNFT.symbol()
            expect(symbol).to.equal("DOGNFT")
        })
        it("ownerof func test",async () => {
            try {
                //console.log("ownerof 1 ---> ",await minterNFT.ownerOf(1))
                const address = await minterNFT.ownerOf(1)
                console.log(address)
            } catch (error) {
                console.log("you have not any nfts minted")
            }
        })
        it("balance of the account",async () => {
            try {
                const balanceOfAddr = await minterNFT.getBalance()
                console.log("balance of addrss --> " + balanceOfAddr)
                expect(balanceOfAddr).to.equal(0)
            } catch (error) {
                
            }
        })
    })

    describe("Minting", async () => {
        it("creates a new token", async () => {
            let ethereum_bal = await provider.getBalance(my_addr)
            expect(ethereum_bal).to.equal(0)
            console.log("first my account balance(eth) --> " + ethereum_bal)
            let totalSupply = await minterNFT.totalSupply()
            //await minterNFT.toggleSaleState()
            let baseUri = await minterNFT.baseURI()
            console.log("base uri --> " + baseUri)
            
            let tempTokenUri = `${totalSupply}.json`
            
            console.log("tempTokenrui --> " + tempTokenUri)
            //let tempTokenUri = `${baseUri}${}`
            const result = await minterNFT.mint(1, "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", tempTokenUri,{ value: ethers.utils.parseEther("0.3") })
            console.log("token id --> ", result)
            totalSupply = await minterNFT.totalSupply()
            console.log("total supply after minting --> ", totalSupply)
            expect(totalSupply).to.equal(1)
            const firstNftUri = await minterNFT.tokenURIsMinted(0)
            console.log("first nft uri --> ", firstNftUri)
            console.log("tokenUri(0) --> " + await minterNFT.tokenURI(parseInt(totalSupply-1)))
            expect(await minterNFT.tokenURI(totalSupply-1)).to.equal("https://gateway.pinata.cloud/ipfs/QmbUmggBrbBPPv18gKaBX7xeXM8Vh4qJt3dYvn8eWmjYTH/0.json")
        //    await minterNFT.mint(1, "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "https://gateway.pinata.cloud/ipfs/QmNu2qwi8uQKwZ3Lx1TyFiFrfdzYswRSosjreTFJHvrtqG/1.json", { value: ethers.utils.parseEther("0.5") }) -- error (already minted)
            // console.log("result[0] ---> ",result[0])
            // console.log("result[1] ---> ",result[1])
            let contract_balance = await minterNFT.getBalance()

            console.log("balance ---> " + contract_balance +" type --> "+  typeof contract_balance)
            console.log("balance ether --> " + Web3.utils.fromWei(contract_balance.toString()))
            console.log("result.value --> ",result.value)
            console.log("owner of the token --> ",await minterNFT.ownerOf(totalSupply-1))
            expect(Number((await minterNFT.ownerOf(totalSupply-1)))).to.equal(Number(0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266))
            totalSupply = await minterNFT.totalSupply()
            tempTokenUri = `${totalSupply}.json`
           const res2 = await minterNFT.mint(1, "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", tempTokenUri,{ value: ethers.utils.parseEther("0.3") })
           console.log("result.value2 --> ",res2.value)
           const totalSupply2 = await minterNFT.totalSupply()
           expect(totalSupply2).to.equal(2)
           expect(await minterNFT.tokenURIsMinted(1)).to.equal("https://gateway.pinata.cloud/ipfs/QmbUmggBrbBPPv18gKaBX7xeXM8Vh4qJt3dYvn8eWmjYTH/1.json")
           console.log("id 1 nft metadata --> " + await minterNFT.tokenURIsMinted(1))
           contract_balance = await minterNFT.getBalance()
           console.log("total contract balance -_> " + Web3.utils.fromWei(contract_balance.toString()))
           const ownerBalance = await minterNFT.balanceOf(my_addr)
            ethereum_bal = await provider.getBalance(my_addr)
           console.log("my account balance(nft) --> " + ownerBalance)
           console.log("lsat my account balance(eth) --> " + Web3.utils.fromWei(ethereum_bal.toString()))
           expect(Web3.utils.fromWei(ethereum_bal.toString())).to.equal("0.6")
        })
    })
    
/*
    describe("indexing", async () => {
        it("list nfts", async () => {
            //await minterNFT.toggleSaleState()
            let totalSupply = await minterNFT.totalSupply()
            let baseUri = await minterNFT.baseURI()
            console.log("base uri --> " + baseUri)
            let tempTokenUri1 = `${totalSupply}.json`
            let tempTokenUri2 = `${parseInt(totalSupply+1)}.json`
            let tempTokenUri3 = `${parseInt(totalSupply+2)}.json`
            let tempTokenUri4 = `${parseInt(totalSupply+3)}.json`

            await minterNFT.mint(1, "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",tempTokenUri1,{ value: ethers.utils.parseEther("0.5") })
            await minterNFT.mint(1, "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",tempTokenUri2,{ value: ethers.utils.parseEther("0.5") })
            await minterNFT.mint(1, "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",tempTokenUri3, { value: ethers.utils.parseEther("0.5") })
            await minterNFT.mint(1, "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",tempTokenUri4, { value: ethers.utils.parseEther("0.5") })

             totalSupply = await minterNFT.totalSupply()
            // console.log("total supply --> ", parseInt(totalSupply))
            expect(totalSupply).to.equal(4)
            let expected = ["https://gateway.pinata.cloud/ipfs/QmbUmggBrbBPPv18gKaBX7xeXM8Vh4qJt3dYvn8eWmjYTH/0.json", "https://gateway.pinata.cloud/ipfs/QmbUmggBrbBPPv18gKaBX7xeXM8Vh4qJt3dYvn8eWmjYTH/1.json", "https://gateway.pinata.cloud/ipfs/QmbUmggBrbBPPv18gKaBX7xeXM8Vh4qJt3dYvn8eWmjYTH/2.json", "https://gateway.pinata.cloud/ipfs/QmbUmggBrbBPPv18gKaBX7xeXM8Vh4qJt3dYvn8eWmjYTH/3.json"]
            let result = []
            let temp;
            for (let i = 0; i < totalSupply; i++) {
                temp = await minterNFT.tokenURIsMinted(i)
                console.log("temp uri ---> " + temp)
                result.push(temp)
            }
            // console.log("\n")
            // console.log(result.join(","))
            // console.log("\n")
            // console.log(expected.join(","))
            // console.log("\n")
            expect(result.join(",")).to.equal(expected.join(","))
        })
     })
    */
})