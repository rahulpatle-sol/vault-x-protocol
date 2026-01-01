import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import SwapCard from '../../components/swap/SwapCard';
import oneInch from 'assets/images/partners/1inch.svg';
import { brandImages } from 'assets/remoteImages';
import WalletGate from '../../components/ui/WalletGate';

export default function Swap() {
  return (
    <Box sx={{ minHeight:'100vh', background:'var(--bg)' }}>
      <Box sx={{ position:'relative', overflow:'hidden', pt:{ xs:12, md:18 }, pb:{ xs:6, md:10 }, borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
        <Box component="img" src={brandImages.swap} alt="" sx={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:.72, pointerEvents:'none' }} />
        <Box sx={{ position:'absolute', inset:0, background:'linear-gradient(100deg, rgba(8,19,17,.58) 42%, rgba(8,19,17,.20) 100%)', pointerEvents:'none' }} />
        <Container maxWidth="xl" sx={{ position:'relative' }}>
          <Typography sx={{ fontFamily:'"IBM Plex Mono",monospace', fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--gold-2)', mb:1.5 }}>VaultX protocol</Typography>
          <Typography sx={{ fontFamily:'Manrope, sans-serif', fontSize:{ xs:'38px', md:'66px' }, fontWeight:800, color:'var(--text)', lineHeight:1.03, letterSpacing:'-.05em', mb:3 }}>
            Swap tokens with a cleaner cross-chain interface.
          </Typography>
          <Typography sx={{ fontFamily:'Manrope, sans-serif', fontSize:'15px', color:'var(--muted)', lineHeight:1.85, maxWidth:560 }}>
            This route has been visually aligned with the rest of the redesign so the swap experience feels like part of the same serious product rather than a separate template.
          </Typography>
        </Container>
      </Box>

      <Box sx={{ py:{ xs:8, md:12 } }}>
        <Container maxWidth="xl">
          <WalletGate title="Connect wallet to open swap" description="Swap execution and quote modules are disabled until wallet connection so the UI does not pretend to be connected to an account.">
          <Grid container spacing={6} alignItems="start">
            <Grid item xs={12} md={5}>
              <SwapCard chain="eth" />
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mt:3, justifyContent:'center' }}>
                <Typography sx={{ fontFamily:'"IBM Plex Mono",monospace', fontSize:'10px', color:'var(--dim)', letterSpacing:'0.1em', textTransform:'uppercase' }}>Powered by</Typography>
                <a href="https://1inch.exchange/#/" target="_blank" rel="noreferrer">
                  <img src={oneInch} alt="1Inch" width="80" style={{ opacity:0.7, filter:'brightness(2)' }} />
                </a>
              </Stack>
            </Grid>
            <Grid item xs={12} md={7}>
              <Box sx={{ borderRadius:'24px', overflow:'hidden', border:'1px solid rgba(228,211,169,.14)', mb:4, background:'#12231f' }}>
                <Box component="img" src={brandImages.swap} alt="Property" sx={{ width:'100%', height:260, objectFit:'cover', display:'block' }} />
                <Box sx={{ p:'20px 24px', background:'#0d1b18', borderTop:'1px solid rgba(255,255,255,0.05)' }}>
                  <Typography sx={{ fontFamily:'"IBM Plex Mono",monospace', fontSize:'9px', color:'var(--gold-2)', letterSpacing:'0.14em', textTransform:'uppercase', mb:0.6 }}>Trade VTX</Typography>
                  <Typography sx={{ fontFamily:'Manrope, sans-serif', fontSize:'24px', fontWeight:800, color:'var(--text)', letterSpacing:'-.03em' }}>Best-rate swaps via 1inch aggregation</Typography>
                </Box>
              </Box>
              <Grid container spacing={2}>
                {[
                  { label:'Networks', val:'ETH & BSC' },
                  { label:'Aggregator', val:'1inch DEX' },
                  { label:'Slippage', val:'0.5% default' },
                  { label:'Gas', val:'Optimized' },
                ].map(({ label, val }) => (
                  <Grid item xs={6} key={label}>
                    <Box sx={{ p:'16px 18px', background:'#12231f', border:'1px solid rgba(228,211,169,.14)', borderRadius:'18px' }}>
                      <Typography sx={{ fontFamily:'"IBM Plex Mono",monospace', fontSize:'9px', color:'var(--dim)', letterSpacing:'0.12em', textTransform:'uppercase', mb:0.5 }}>{label}</Typography>
                      <Typography sx={{ fontFamily:'Manrope, sans-serif', fontSize:'20px', fontWeight:800, color:'var(--gold-2)' }}>{val}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          </WalletGate>
        </Container>
      </Box>
    </Box>
  );
}
