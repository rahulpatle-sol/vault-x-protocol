import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { brandImages } from 'assets/remoteImages';

const VAULTX_PUBLIC_ADDRESS = '0xBb569C738f56348B21a84D520f679fe41Fd01cc5';

const CONTACT_BLOCKS = [
  {
    title: 'Partnership inquiries',
    desc: 'For RWA sourcing, ecosystem partnerships, and strategic collaboration around tokenized assets.',
  },
  {
    title: 'Product and technical review',
    desc: 'For presale flow review, frontend integration, contract verification, and deployment readiness questions.',
  },
  {
    title: 'Investor information',
    desc: 'For platform positioning, token utility, asset discovery workflow, and public product materials.',
  },
];

export default function Contact() {
  const copyAddress = () => navigator?.clipboard?.writeText(VAULTX_PUBLIC_ADDRESS);

  return (
    <Box sx={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Box sx={{ position: 'relative', pt: { xs: 13, md: 18 }, pb: { xs: 7, md: 10 }, overflow: 'hidden' }}>
        <Box component="img" src={brandImages.dashboard} alt="VaultX contact" sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: .72 }} />
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg, rgba(8,19,17,.62) 0%, rgba(8,19,17,.24) 100%)' }} />
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography className="mono" sx={{ color: 'var(--gold-2)', letterSpacing: '.18em', textTransform: 'uppercase', fontSize: '10px', mb: 2 }}>
            VaultX contact
          </Typography>
          <Typography sx={{ fontFamily: 'Manrope, sans-serif', color: 'var(--text)', fontSize: { xs: 42, md: 72 }, fontWeight: 800, letterSpacing: '-.06em', lineHeight: .98, maxWidth: 760 }}>
            Contact the VaultX platform desk.
          </Typography>
          <Typography className="vx-copy" sx={{ mt: 3, maxWidth: 620, fontSize: 16 }}>
            Use this page as the public contact and verification layer for VaultX. The styling now matches the rest of the platform instead of using a separate template look.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Box className="vx-card-strong" sx={{ p: { xs: 3, md: 4 }, height: '100%' }}>
              <Typography className="mono" sx={{ color: 'var(--gold-2)', letterSpacing: '.16em', textTransform: 'uppercase', fontSize: 10, mb: 2 }}>
                Public VaultX address
              </Typography>
              <Typography sx={{ fontFamily: 'Manrope, sans-serif', fontSize: { xs: 26, md: 34 }, fontWeight: 800, color: 'var(--text)', letterSpacing: '-.04em', mb: 2 }}>
                Verify before interacting.
              </Typography>
              <Typography className="vx-copy" sx={{ mb: 3 }}>
                This public VaultX address is shown for contact and contract-reference use. Always confirm deployed addresses against the official project materials before sending funds.
              </Typography>
              <Box sx={{ p: 2.2, borderRadius: '18px', background: '#13231f', border: '1px solid rgba(215,181,109,.22)', wordBreak: 'break-all', mb: 3 }}>
                <Typography className="mono" sx={{ color: 'var(--gold-2)', fontSize: 13, lineHeight: 1.8 }}>{VAULTX_PUBLIC_ADDRESS}</Typography>
              </Box>
              <Button variant="contained" onClick={copyAddress}>Copy address</Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Grid container spacing={2}>
              {CONTACT_BLOCKS.map((item) => (
                <Grid item xs={12} key={item.title}>
                  <Box className="vx-card card-lift" sx={{ p: { xs: 2.5, md: 3 }, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '160px 1fr' }, gap: 2.5, alignItems: 'center' }}>
                    <Box sx={{ borderRadius: '18px', minHeight: 104, backgroundImage: `url(${brandImages.hero})`, backgroundSize: 'cover', backgroundPosition: 'center', border: '1px solid rgba(215,181,109,.18)' }} />
                    <Box>
                      <Typography sx={{ fontFamily: 'Manrope, sans-serif', fontSize: 22, fontWeight: 800, color: 'var(--text)', letterSpacing: '-.03em', mb: .8 }}>{item.title}</Typography>
                      <Typography className="vx-copy">{item.desc}</Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
