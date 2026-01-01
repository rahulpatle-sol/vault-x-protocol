import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import GalleryItems from '../../components/gallery/GalleryItems';
import { brandImages } from 'assets/remoteImages';

const PageHero = ({ img, eyebrow, title, sub }) => (
  <Box sx={{ position:'relative', overflow:'hidden', pt:{ xs:12, md:16 }, pb:{ xs:6, md:10 }, borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
    <Box component="img" src={img} alt="" sx={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:.72, pointerEvents:'none' }} />
    <Box sx={{ position:'absolute', inset:0, background:'linear-gradient(100deg, rgba(8,19,17,.58) 34%, rgba(8,19,17,.22) 100%)', pointerEvents:'none' }} />
    <Container maxWidth="xl" sx={{ position:'relative' }}>
      <Typography sx={{ fontFamily:'"IBM Plex Mono",monospace', fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--gold-2)', mb:1.5 }}>{eyebrow}</Typography>
      <Typography sx={{ fontFamily:'Manrope, sans-serif', fontSize:{ xs:'38px', md:'62px' }, fontWeight:800, color:'var(--text)', lineHeight:1.03, letterSpacing:'-.05em', mb:2 }}>
        {title}
      </Typography>
      <Typography sx={{ fontFamily:'Manrope, sans-serif', fontSize:'15px', color:'var(--muted)', maxWidth:560, lineHeight:1.8 }}>{sub}</Typography>
    </Container>
  </Box>
);

export default function Gallery() {
  return (
    <Box sx={{ minHeight:'100vh', background:'var(--bg)' }}>
      <PageHero
        img={brandImages.galleryHero}
        eyebrow="VaultX — Asset gallery"
        title={<>Curated tokenized assets<br />for the <Box component="em" sx={{ fontStyle:'normal', color:'var(--gold-2)' }}>RWA marketplace.</Box></>}
        sub="Marketplace cards, gallery modules, and supporting visuals have been upgraded to feel more like a real product presentation and less like a placeholder demo."
      />
      <Box sx={{ py:{ xs:6, md:10 } }}>
        <Container maxWidth="xl">
          <GalleryItems />
        </Container>
      </Box>
    </Box>
  );
}
