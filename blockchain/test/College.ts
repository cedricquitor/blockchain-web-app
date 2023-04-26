import { ethers } from "hardhat";
import { expect } from "chai";
import { College } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("College contract", function () {
  let college: College;
  let deployer: SignerWithAddress;

  before("should deploy", async () => {
    [deployer] = await ethers.getSigners();
    const CollegeFactory = await ethers.getContractFactory("College");
    college = await CollegeFactory.deploy();
    await college.deployed();
  });

  it("should mint an NFT", async () => {
    const tx = await college.mint(deployer.address, 1, 1, []);
    await tx.wait();
    expect(await college.hasUserMinted()).to.equal(true);
  });

  it("should reject minting another NFT", async () => {
    await expect(college.mint(deployer.address, 1, 1, [])).to.be.rejectedWith(
      "User has already minted an NFT!"
    );
  });

  it("should burn an NFT", async () => {
    const tx = await college.burn(deployer.address, 1, 1);
    await tx.wait();
    expect(await college.hasUserMinted()).to.equal(false);
  });

  it("should allow re-minting after burning an NFT", async () => {
    const tx = await college.mint(deployer.address, 4, 1, []);
    await tx.wait();
    expect(await college.hasUserMinted()).to.equal(true);
  });
});
