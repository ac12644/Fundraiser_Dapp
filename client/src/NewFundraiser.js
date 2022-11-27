import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import detectEthereumProvider from "@metamask/detect-provider";
import FundraiserFactoryContract from "./contracts/FundraiserFactory.json";
import Web3 from "web3";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const NewFundraiser = () => {
  const [labelWidth, setLabelWidth] = React.useState(0);
  const labelRef = React.useRef(null);
  const [web3, setWeb3] = useState(null);
  const classes = useStyles();
  const [name, setFundraiserName] = useState(null);
  const [url, setFundraiserWebsite] = useState(null);
  const [description, setFundraiserDescription] = useState(null);
  const [imageURL, setImage] = useState(null);
  const [beneficiary, setAddress] = useState(null);
  const [custodian, setCustodian] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState(null);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const provider = await detectEthereumProvider();
      const web3 = new Web3(provider);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = FundraiserFactoryContract.networks[networkId];
      const accounts = await web3.eth.getAccounts();
      const instance = new web3.eth.Contract(
        FundraiserFactoryContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      setWeb3(web3);
      setContract(instance);
      setAccounts(accounts);
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    const provider = await detectEthereumProvider();
    const web3 = new Web3(provider);
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = FundraiserFactoryContract.networks[networkId];
    const accounts = await web3.eth.getAccounts();
    const instance = new web3.eth.Contract(
      FundraiserFactoryContract.abi,
      deployedNetwork && deployedNetwork.address
    );
    await contract.methods
      .createFundraiser(name, url, imageURL, description, beneficiary)
      .send({ from: accounts[0] });
    alert("Successfully created fundraiser");
  };

  return (
    <div className="main-container">
      <h2>Create a New Fundraiser</h2>
      <label>Name</label>
      <TextField
        id="outlined-bare"
        className={classes.textField}
        placeholder="Fundraiser Name"
        margin="normal"
        onChange={(e) => setFundraiserName(e.target.value)}
        variant="outlined"
        inputProps={{ "aria-label": "bare" }}
      />
      <label>Website</label>
      <TextField
        id="outlined-bare"
        className={classes.textField}
        placeholder="Fundraiser Website"
        margin="normal"
        onChange={(e) => setFundraiserWebsite(e.target.value)}
        variant="outlined"
        inputProps={{ "aria-label": "bare" }}
      />
      <label>Description</label>
      <TextField
        id="outlined-bare"
        className={classes.textField}
        placeholder="Fundraiser Description"
        margin="normal"
        onChange={(e) => setFundraiserDescription(e.target.value)}
        variant="outlined"
        inputProps={{ "aria-label": "bare" }}
      />
      <label>Image</label>
      <TextField
        id="outlined-bare"
        className={classes.textField}
        placeholder="Fundraiser Image Address"
        margin="normal"
        onChange={(e) => setImage(e.target.value)}
        variant="outlined"
        inputProps={{ "aria-label": "bare" }}
      />
      <label>Address</label>
      <TextField
        id="outlined-bare"
        className={classes.textField}
        placeholder="Fundraiser Ehtereum Address"
        margin="normal"
        onChange={(e) => setAddress(e.target.value)}
        variant="outlined"
        inputProps={{ "aria-label": "bare" }}
      />

      {/* 
              The custodian address is another Ethereum address that either the beneficiary 
              con‐ trols directly or someone operating on behalf of the beneficiary will own. 
              This address can interact with a DApp, and it is this address that will be given 
              the ability to issue the transaction that will transfer funds collected by the 
              Fundraiser contract to the beneficiary address.
            
            */}
      <label>Custodian</label>
      <TextField
        id="outlined-bare"
        className={classes.textField}
        placeholder="Fundraiser Custodian Eth Address"
        margin="normal"
        onChange={(e) => setCustodian(e.target.value)}
        variant="outlined"
        inputProps={{ "aria-label": "bare" }}
      />

      <Button
        onClick={handleSubmit}
        variant="contained"
        className={classes.button}
      >
        Submit
      </Button>
    </div>
  );
};
export default NewFundraiser;
