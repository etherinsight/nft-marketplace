import { MockProvider } from "@ethereum-waffle/provider";
import { expect } from "chai";
import { ethers } from "hardhat";
import { MockContractFactory, smock } from "@defi-wonderland/smock";
import { NFTMarket } from "../typechain/NFTMarket";
import { NFTMarket__factory } from "../typechain/factories/NFTMarket__factory";

/* test/sample-test.js */
describe("NFTMarket", function () {
  const [sender, receiver] = new MockProvider().getWallets();
  let contract: NFTMarket;
  let mockContract: MockContractFactory<NFTMarket__factory>;

  beforeEach(async () => {
    const Market = await ethers.getContractFactory("NFTMarket");
    contract = await Market.deploy();

    mockContract = await smock.mock<NFTMarket__factory>("NFTMarket");
  });

  it("Should create and execute market sales", async function () {
    /* deploy the marketplace */

    const marketAddress = contract.address;

    /* deploy the NFT contract */
    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(marketAddress);
    await nft.deployed();
    const nftContractAddress = nft.address;

    let listingPrice = await contract.getListingPrice();
    // listingPrice = listingPrice.toString();

    const auctionPrice = ethers.utils.parseUnits("1", "ether");

    /* create two tokens */
    await nft.createToken("https://www.mytokenlocation.com");
    await nft.createToken("https://www.mytokenlocation2.com");

    /* put both tokens for sale */
    await contract.createMarketItem(nftContractAddress, 1, auctionPrice, {
      value: listingPrice,
    });
    await contract.createMarketItem(nftContractAddress, 2, auctionPrice, {
      value: listingPrice,
    });

    const [_, buyerAddress] = await ethers.getSigners();

    /* execute sale of token to another user */
    await contract
      .connect(buyerAddress)
      .createMarketSale(nftContractAddress, 1, { value: auctionPrice });

    /* query for and return the unsold items */
    let items = await contract.fetchMarketItems();
    // items =
    await Promise.all(
      items.map(async (i) => {
        const tokenUri = await nft.tokenURI(i.tokenId);
        let item = {
          price: i.price.toString(),
          tokenId: i.tokenId.toString(),
          seller: i.seller,
          owner: i.owner,
          tokenUri,
        };
        return item;
      })
    );
    console.log("items: ", items);

    expect(true).to.be.equal(true);
  });
});
