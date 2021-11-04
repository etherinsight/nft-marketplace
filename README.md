# Project Setup

This project is a clone of nader's nft marketplace 
https://dev.to/dabit3/building-scalable-full-stack-apps-on-ethereum-with-polygon-2cfb

To get the project running run:

```shell
npm install
npx hardhat node

```
Set your browser's metamask to localhost and Import one of the accounts private keys as listed.
In a seperate terminal run the next two commands. The hardhat node must be running when you run the deploy script. 


```shell
npx hardhat run scripts/deploy.js --network localhost
npm run dev
```
