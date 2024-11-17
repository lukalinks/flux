import React, { useState } from 'react';
import { Container, Grid, Card, Typography, Box, Tabs, Tab } from '@mui/material';
import SwapWidget from '../components/SwapWidget';
import NFTGallery from '../components/NFTGallery';
import WalletBalance from '../components/WalletBalance';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Left Sidebar - Wallet Info */}
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, height: '100%' }}>
            <WalletBalance />
          </Card>
        </Grid>

        {/* Main Content Area */}
        <Grid item xs={12} md={9}>
          <Card sx={{ p: 2 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab label="Swap" />
                <Tab label="NFTs" />
                <Tab label="Liquidity" />
                <Tab label="History" />
              </Tabs>
            </Box>

            {/* Swap Tab */}
            {activeTab === 0 && (
              <SwapWidget />
            )}

            {/* NFTs Tab */}
            {activeTab === 1 && (
              <NFTGallery />
            )}

            {/* Liquidity Tab */}
            {activeTab === 2 && (
              <Typography>Liquidity Pool Management Coming Soon</Typography>
            )}

            {/* History Tab */}
            {activeTab === 3 && (
              <Typography>Transaction History Coming Soon</Typography>
            )}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 