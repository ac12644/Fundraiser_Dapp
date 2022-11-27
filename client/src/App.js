import React, { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import NewFundraiser from "./NewFundraiser";
import Home from "./Home";
import Receipts from "./Receipts";
import FundraiserFactoryContract from "./contracts/FundraiserFactory.json";
import getWeb3 from "./getWeb3";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const App = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    web3: null,
    accounts: null,
    contract: null,
  });
  const [storageValue, setStorageValue] = useState(0);

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = FundraiserFactoryContract.networks[networkId];
        const instance = new web3.eth.Contract(
          FundraiserFactoryContract.abi,
          deployedNetwork && deployedNetwork.address
        );
        setState({ web3, accounts, contract: instance });
      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract.
              Check console for details.`
        );
        console.error(error);
      }
    };
    init();
  }, []);

  const runExample = async () => {
    const { accounts, contract } = state;
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Fundraiser Dapp
          </Typography>
          <Button href="/" color="inherit">
            Home
          </Button>
          <Button href="/new" color="inherit">
            Create Fundraiser
          </Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/new" element={<NewFundraiser />} />
        <Route path="/receipts" element={<Receipts />} />
      </Routes>
    </div>
  );
};

export default App;
