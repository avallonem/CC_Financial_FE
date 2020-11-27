import React from 'react';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';



/*
  async componentDidMount() {
    // Create a web3 connection


  }

  // Load the accounts token and ether balances.
  async loadAccountBalances(account) {
  const balance = await this.state.token.balanceOf(account);
  this.setState({ tokenBalance: balance.toNumber() });

  const ethBalance = await this.web3.eth.getBalance(account);
  this.setState({ ethBalance: ethBalance });
}
*/

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const Budget = ({ className, ...rest }) => {
  const classes = useStyles();
  const [balance,setBalance]=useState('0')
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const Web3 = require("web3")
  useEffect(() => {
  const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
  web3.eth.getBalance("0x3Cad7A778818cd988f6546E32A6e7Dbf8e5c6AeB", function(err, result) {
    if (err) {
      console.log(err)
    } else {
      console.info("ETH "+web3.utils.fromWei(result, "ether") );
      setBalance("ETH "+ web3.utils.fromWei(result, "ether") );
      setIsLoaded(true);
    }
  })
}, [])

if (error) {
  return <div>Error: {error.message}</div>;
} else if (!isLoaded) {
  return <div>Loading...</div>;
} else {
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              TOTAL AMOUNT AVAILABLE
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {balance}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        
      </CardContent>
    </Card>
  );
};
}
Budget.propTypes = {
  className: PropTypes.string
};

export default Budget;
