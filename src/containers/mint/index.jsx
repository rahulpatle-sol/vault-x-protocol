import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import MintCard from '../../components/mint/MintCard';
import WalletGate from '../../components/ui/WalletGate';
import { brandImages } from 'assets/remoteImages';

export default function Mint() {
  return (
    <Box sx={{ minHeight:'100vh', pt:12, pb:10 }}>
      <Container maxWidth="xl">
        <Box className="vx-card-strong" sx={{ position:'relative', overflow:'hidden', p:{ xs:3, md:5 }, mb:4 }}>
          <Box component="img" src={brandImages.mint} alt="" sx={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:.72 }} />
          <Box sx={{ position:'absolute', inset:0, background:'linear-gradient(100deg, rgba(8,19,17,.58) 36%, rgba(8,19,17,.20) 100%)' }} />
          <Box sx={{ position:'relative' }}>
            <Box className="vx-eyebrow" sx={{ mb:2 }}>Asset minting</Box>
            <Typography sx={{ fontFamily:'Manrope, sans-serif', fontSize:{ xs:38, md:58 }, fontWeight:800, letterSpacing:'-.055em', lineHeight:1, color:'var(--text)' }}>Mint VaultX property NFTs</Typography>
            <Typography className="vx-copy" sx={{ mt:2, maxWidth:560 }}>A cleaner minting screen for tokenized real-estate NFT allocation with better visual alignment to the rest of the platform.</Typography>
          </Box>
        </Box>
        <Box className="vx-card" sx={{ p:{ xs:2, md:4 } }}>
          <Typography sx={{ fontFamily:'Manrope, sans-serif', fontWeight:800, mb:3, textAlign:'center', fontSize:24, color:'var(--gold-2)' }}>Mint your NFT</Typography>
          <WalletGate title="Connect wallet to mint" description="Minting is disabled until your wallet is connected. This prevents users from opening token/NFT functions before the account context is ready."><MintCard /></WalletGate>
        </Box>
      </Container>
    </Box>
  );
}
