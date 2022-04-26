// require("dotenv").config();
// require("@nomiclabs/hardhat-etherscan");
// require("@nomiclabs/hardhat-waffle");

// // This is a sample Hardhat task. To learn how to create your own go to
// // https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

// // You need to export an object to set up your config
// // Go to https://hardhat.org/config/ to learn more

// /**
//  * @type import('hardhat/config').HardhatUserConfig
//  */
require('dotenv').config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
const { NEXT_PUBLIC_API_URL, PRIVATE_KEY } = process.env;


// module.exports = {
//   solidity: "0.7.3",
//   defaultNetwork: "ropsten",
//   networks: {
//     hardhat: {},
//     ropsten: {
//       url: NEXT_PUBLIC_API_URL,
//       accounts: [`0x${PRIVATE_KEY}`]
//     }
//   },
// };

// 0x249F5fF0D0A4604912e2C27107cb5c22d8eD8dE1

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.7.3"
};
