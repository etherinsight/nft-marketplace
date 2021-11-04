# Project Setup

This project is a clone of nader's nft marketplace 
https://dev.to/dabit3/building-scalable-full-stack-apps-on-ethereum-with-polygon-2cfb

To get the project running run:

```shell
npm install
npx hardhat node

```
In a seperate terminal run the next two commands. The hardhat node must be running at the same time as the npm node for the app to work correctly. Also check that the output of the hardhat run deploy command matches with the config.js file.

```shell
npx hardhat run scripts/deploy.js --network localhost
npm run dev
```
