import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';

const NFTGallery = () => {
  // Mock NFT data
  const nfts = [
    { id: 1, name: 'NFT #1', image: 'https://placeholder.com/150' },
    { id: 2, name: 'NFT #2', image: 'https://placeholder.com/150' },
    // Add more NFTs
  ];

  return (
    <Grid container spacing={2}>
      {nfts.map((nft) => (
        <Grid item xs={12} sm={6} md={4} key={nft.id}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={nft.image}
              alt={nft.name}
            />
            <CardContent>
              <Typography variant="h6">{nft.name}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default NFTGallery; 