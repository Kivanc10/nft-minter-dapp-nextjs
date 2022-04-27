const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_API_URL);
const creator_address = process.env.NEXT_CONTRACT_CREATOR_ADDRESS
const contract = require("../artifacts/contracts/DogNftDemo.sol/DogNftDemo.json");
const contractAddress = process.env.CONTRACT_ADDRESS;
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

import axios from "axios"



export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const obj = {
        status: "",
        address: addressArray[0],
      };

      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😞" + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://metamask.io/download.html"
            >
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "",
        };
      } else {
        return {
          address: "",
          status: "😞",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😞" + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://metamask.io/download.html"
            >
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

// Contract Methods

export const getMaxMintAmount = async () => {
  const result = await nftContract.methods.maxMint().call();
  return result;
};

export const getTotalSupply = async () => {
  const result = await nftContract.methods.totalSupply().call();
  console.log("total supply " + result)
  return result;
};

export const getNftPrice = async () => {
  const result = await nftContract.methods.mintPrice().call();
  console.log("result --> ")
  console.log(result)
  const resultEther = web3.utils.fromWei(result, "ether");
  return resultEther;
};

export const getSaleState = async () => {
  const result = await nftContract.methods.saleIsActive().call();
  console.log("get sale state " + result)
  return result;
};

export const activateSale = async () => {
  if (window.ethereum.selectedAddress) {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    const account = accounts[0];
    console.log("account --> " + account + " env acc -> " + process.env.NEXT_CONTRACT_CREATOR_ADDRESS)
    if (Number(account) !== Number(creator_address)) {
      return {
        ok_status: false,
        state: undefined,
        info: "you are not cretor of the contract"
      }
    } else {
      await nftContract.methods.toggleSaleState().call()
      let state = await getSaleState()
      console.log("updated state --> " + state)
      return {
        state,
        ok_status: true,
        info: "success , make the function external in contract file"
      }
    }
  } else {
    return {
      ok_status: false,
      state: undefined,
      info: "Please connect your wallet first"
    }
  }


}

export const getMintedNftsUrl = async () => {
  let mintedUrls = await nftContract.methods.baseURI().call()
  console.log("minted urls")
  console.log(mintedUrls)
}

export const mintNFT = async (mintAmount) => {
  if (!window.ethereum.selectedAddress) {
    return {
      success: false,
      status: (
        <p>
          🦊 Connect to Metamask using{" "}
          <span className="px-2 text-purple-600">Connect Wallet</span> button.
        </p>
      ),
    };
  }
  let totalSupply = await nftContract.methods.totalSupply().call()
  let tempTokenUri = `${totalSupply}.json`
  //set up your Ethereum transaction
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    value: parseInt(web3.utils.toWei("0.03", "ether") * mintAmount).toString(
      16
    ), // hex
    gasLimit: "0",
    data: nftContract.methods.mint(mintAmount, window.ethereum.selectedAddress, tempTokenUri).encodeABI(), //make call to NFT smart contract
  };
  //sign the transaction via Metamask
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://rinkeby.etherscan.io/tx/" +
        txHash,
    };
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    };
  }
};


export const getNftsMintedBySelectedAddress = async () => {
  let totalSupply = await nftContract.methods.totalSupply().call()
  if (window.ethereum.selectedAddress) {
    if (totalSupply > 0) {
      let result = []
      for (let i = 0; i < totalSupply; i++) {
        try {
          let temp = await nftContract.methods.ownerOf(i).call() // window.ethereum.selectedAddress
          result.push(temp)
          console.log("result --> ")
          console.log(result)
        } catch (error) {
          return {
            status: "an error occured while get nft",
            totalSupply,
            last: [],
            ok: false
          }
        }
      }
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const account = accounts[0];
      console.log("interact address ", account)
      let last = []
      result.forEach((e, i) => {
        if (Number(result[i]) === Number(account)) {
          last.push(i)
        }
      })
      if (last.length > 0) {
        return {
          last,
          status: "You can show your nfts",
          totalSupply,
          ok: true
        }
      }
      return {
        last: [],
        status: "You have not any nfts minted",
        totalSupply,
        ok: false
      }
    } else {
      return {
        status: "There is no nft minted",
        totalSupply: 0,
        last: [],
        ok: false
      }
    }
  } else {
    return {
      last: [],
      status: "please connect to metamask",
      totalSupply,
      ok: false
    }
  }
}

export const getNftsDataForMinter = async () => {
  const BASE_URL_TO_MINT = await nftContract.methods.baseURI().call()
  const { last, ok, status } = await getNftsMintedBySelectedAddress()
  let toReturn = []
  if (!ok) {
    return {
      status: status,
      ok: false,
      toReturn: []
    }
  } else {
    for (let i = 0; i < last.length; i++) {
      let tempId = parseInt(i)
      try {
        let res = await axios.get(`${BASE_URL_TO_MINT}${tempId}.json`)
        let tempJson = await res.data
        toReturn.push(tempJson)
      } catch (error) {
        return {
          status: "an error occured while get nft data",
          ok: false,
          toReturn: []
        }
      }
    }
    return {
      toReturn,
      ok: true,
      status: "nft data has been fetched succesfully"
    }
  }
}

export const getBalance = async () => {
  if(window.ethereum.selectedAddress) {
    let balance = await nftContract.methods.balanceOf(window.ethereum.selectedAddress).call()
    return balance
  }
  return undefined
  
}