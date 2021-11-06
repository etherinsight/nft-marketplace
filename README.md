# Project Setup

This project is a clone of nader's nft marketplace 
https://dev.to/dabit3/building-scalable-full-stack-apps-on-ethereum-with-polygon-2cfb

To get the project running run:

```shell
npm install
npx hardhat node

```
Set your browser's metamask to localhost and Import an account using a private key listed.
In a seperate terminal run the next two commands. The hardhat node must be running when you run the deploy script. 


```shell
npx hardhat run scripts/deploy.ts --network localhost
npm run dev
```
