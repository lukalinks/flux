import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const WalletBalance = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Wallet</Typography>
      
      <Typography variant="body1" gutterBottom>
        Address: 0x1234...5678
      </Typography>
      
      <Typography variant="body1" gutterBottom>
        Balance: 1.234 ETH
      </Typography>
      
      <Button 
        variant="contained" 
        fullWidth 
        sx={{ mt: 2 }}
      >
        Connect Wallet
      </Button>
    </Box>
  );
};

export default WalletBalance; 