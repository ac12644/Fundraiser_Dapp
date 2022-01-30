const SimpleStorageContract = artifacts.require("SimpleStorage");
const FundraiserFactoryContract = artifacts.require("FundraiserFactory");

module.exports = function (deployer) {

    deployer.deploy (SimpleStorageContract);
    deployer.deploy (FundraiserFactoryContract);
}