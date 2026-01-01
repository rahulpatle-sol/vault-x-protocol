import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ERC20Transfers from 'components/ERC20Transfers';
import WalletGate from '../../components/ui/WalletGate';
import { brandImages } from 'assets/remoteImages';

export default function Transactions() {
  return (
    <Box sx={{ minHeight:'100vh', pt:12, pb:10 }}>
      <Container maxWidth="xl">
        <Box className="vx-card-strong" sx={{ position:'relative', overflow:'hidden', p:{ xs:3, md:5 }, mb:4 }}>
          <Box component="img" src={brandImages.transactions} alt="" sx={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:.72 }} />
          <Box sx={{ position:'absolute', inset:0, background:'linear-gradient(100deg, rgba(8,19,17,.58) 36%, rgba(8,19,17,.20) 100%)' }} />
          <Box sx={{ position:'relative', zIndex:1 }}>
            <Typography className="mono" sx={{ color:'var(--gold-2)', letterSpacing:'.18em', textTransform:'uppercase', fontSize:'10px' }}>Account activity</Typography>
            <Typography sx={{ fontFamily:'Manrope, sans-serif', fontSize:{ xs:38, md:58 }, fontWeight:800, letterSpacing:'-.055em', lineHeight:1, color:'var(--text)', mt:1 }}>Wallet transactions</Typography>
            <Typography className="vx-copy" sx={{ mt:2, maxWidth:560 }}>Review your latest ERC-20 activity in a cleaner VaultX dashboard layout with a more polished visual hierarchy.</Typography>
          </Box>
        </Box>
        <Box className="vx-card" sx={{ p:{ xs:2, md:3 } }}>
          <WalletGate title="Connect wallet to load transactions" description="Transaction history is account-specific and remains disabled until a wallet is connected."><ERC20Transfers /></WalletGate>
        </Box>
      </Container>
    </Box>
  );
}
