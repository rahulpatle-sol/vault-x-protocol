import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NFTBalance from 'components/NFTBalance';
import WalletGate from '../../components/ui/WalletGate';
import { brandImages } from 'assets/remoteImages';

export default function NFTs() {
  return (
    <Box sx={{ minHeight:'100vh', pt:12, pb:10 }}>
      <Container maxWidth="xl">
        <Box className="vx-card-strong" sx={{ position:'relative', overflow:'hidden', p:{ xs:3, md:5 }, mb:4 }}>
          <Box component="img" src={brandImages.galleryHero} alt="" sx={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:.72 }} />
          <Box sx={{ position:'absolute', inset:0, background:'linear-gradient(100deg, rgba(8,19,17,.58) 36%, rgba(8,19,17,.20) 100%)' }} />
          <Box sx={{ position:'relative' }}>
            <Box className="vx-eyebrow" sx={{ mb:2 }}>Tokenized assets</Box>
            <Typography sx={{ fontFamily:'Manrope, sans-serif', fontSize:{ xs:38, md:58 }, fontWeight:800, letterSpacing:'-.055em', lineHeight:1, color:'var(--text)' }}>Your RWA NFT holdings</Typography>
            <Typography className="vx-copy" sx={{ mt:2, maxWidth:560 }}>View asset-backed NFTs held by your connected wallet in a cleaner, more production-looking dashboard screen.</Typography>
          </Box>
        </Box>
        <Box className="vx-card" sx={{ p:{ xs:2, md:3 } }}>
          <WalletGate title="Connect wallet to view holdings" description="NFT holdings are wallet-specific, so this module stays inactive until a wallet is connected."><NFTBalance /></WalletGate>
        </Box>
      </Container>
    </Box>
  );
}
