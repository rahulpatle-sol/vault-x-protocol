import { useWeb3React } from '@web3-react/core';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { RiShieldCheckLine } from 'react-icons/ri';
import Account from '../account';
import { getChainIdFromLibrary, getNetworkMeta } from '../../config/contracts';

export default function WalletGate({ title, description, children, requireWallet = true }) {
  const { account, library } = useWeb3React();
  const connected = Boolean(account && library);
  const chainId = getChainIdFromLibrary(library);
  const network = getNetworkMeta(chainId);

  if (!requireWallet || connected) {
    return (
      <Box>
        {connected && (
          <Box sx={{ mb: 2.5, p: 2, borderRadius: '18px', background: '#10211d', border: '1px solid rgba(112,181,139,.22)' }}>
            <Stack direction={{ xs:'column', sm:'row' }} spacing={1.2} justifyContent="space-between" alignItems={{ xs:'flex-start', sm:'center' }}>
              <Box>
                <Typography sx={{ fontFamily:'IBM Plex Mono, monospace', fontSize:10, letterSpacing:'.16em', color:'var(--green-2)', textTransform:'uppercase' }}>
                  Wallet connected
                </Typography>
                <Typography sx={{ mt:.5, color:'var(--muted)', fontSize:13 }}>Network: {network.name}</Typography>
              </Box>
              <Typography sx={{ fontFamily:'IBM Plex Mono, monospace', fontSize:11, color:'var(--gold-2)', wordBreak:'break-all' }}>{account}</Typography>
            </Stack>
          </Box>
        )}
        {children}
      </Box>
    );
  }

  return (
    <Box className="vx-card-strong" sx={{ p: { xs: 3, md: 4 }, textAlign: 'center' }}>
      <Box sx={{
        width: 76, height: 76, borderRadius: '24px', mx: 'auto', mb: 2.5,
        display: 'grid', placeItems: 'center',
        background: 'linear-gradient(135deg, rgba(215,181,109,.2), rgba(112,181,139,.14))',
        border: '1px solid rgba(215,181,109,.18)',
      }}>
        <RiShieldCheckLine size={34} color="var(--gold-2)" />
      </Box>
      <Typography sx={{ fontFamily:'Manrope, sans-serif', fontSize:{ xs: 28, md: 34 }, fontWeight:800, color:'var(--text)', letterSpacing:'-.045em' }}>
        {title || 'Connect wallet to continue'}
      </Typography>
      <Typography sx={{ color:'var(--muted)', lineHeight:1.8, mt:1.5, mb:3, maxWidth:620, mx:'auto' }}>
        {description || 'This feature is disabled until your wallet is connected. Connect a browser wallet first, then the contract panel and actions will become available.'}
      </Typography>
      <Box sx={{ display:'flex', justifyContent:'center' }}>
        <Account />
      </Box>
    </Box>
  );
}
