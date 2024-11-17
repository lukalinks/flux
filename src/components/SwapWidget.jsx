import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, Typography } from '@mui/material';

const SwapWidget = () => {
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('USDT');
  const [amount, setAmount] = useState('');

  const handleSwap = () => {
    // Implement swap logic here
    console.log('Swapping tokens...');
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>Swap Tokens</Typography>
      
      <TextField
        select
        fullWidth
        label="From"
        value={fromToken}
        onChange={(e) => setFromToken(e.target.value)}
        sx={{ mb: 2 }}
      >
        <MenuItem value="ETH">ETH</MenuItem>
        <MenuItem value="USDT">USDT</MenuItem>
        <MenuItem value="USDC">USDC</MenuItem>
      </TextField>

      <TextField
        fullWidth
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        select
        fullWidth
        label="To"
        value={toToken}
        onChange={(e) => setToToken(e.target.value)}
        sx={{ mb: 2 }}
      >
        <MenuItem value="ETH">ETH</MenuItem>
        <MenuItem value="USDT">USDT</MenuItem>
        <MenuItem value="USDC">USDC</MenuItem>
      </TextField>

      <Button 
        variant="contained" 
        fullWidth 
        onClick={handleSwap}
      >
        Swap
      </Button>
    </Box>
  );
};

export default SwapWidget; 