import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import { galleryImages } from 'assets/remoteImages';
import { motion } from 'framer-motion';

const DATA = [
  { id:'VX-MIA-101', name:'Brickell Residence Fund', location:'Miami, Florida', type:'Residential', min:'$500', apy:'8.4%', funded:76, occupancy:'96%', riskLevel:'low', status:'Open', img:galleryImages[0], memo:'Class A residential fund in the Brickell financial district. 124 units with strong occupancy history and institutional-grade property management.' },
  { id:'VX-CHI-205', name:'Downtown Office Core', location:'Chicago, Illinois', type:'Commercial', min:'$1,000', apy:'9.1%', funded:63, occupancy:'89%', riskLevel:'medium', status:'Open', img:galleryImages[1], memo:'Premium office tower in Chicago\'s central business district. Multi-tenant lease structure with staggered expiry dates.' },
  { id:'VX-SFO-317', name:'Golden Gate Apartments', location:'San Francisco, California', type:'Multifamily', min:'$750', apy:'7.8%', funded:82, occupancy:'94%', riskLevel:'low', status:'Allocation', img:galleryImages[2], memo:'Waterfront multifamily property with in-unit laundry, parking, and concierge services. Stable tenant base with 94% occupancy.' },
  { id:'VX-AUS-412', name:'Austin Growth Portfolio', location:'Austin, Texas', type:'Mixed-use', min:'$500', apy:'8.7%', funded:69, occupancy:'92%', riskLevel:'low', status:'Open', img:galleryImages[3], memo:'Mixed-use portfolio combining retail ground floor with premium residential units. Located in Austin\'s fastest-growing corridor.' },
  { id:'VX-DAL-518', name:'Distribution Hub I', location:'Dallas, Texas', type:'Logistics', min:'$1,250', apy:'9.6%', funded:58, occupancy:'100%', riskLevel:'medium', status:'Open', img:galleryImages[4], memo:'Last-mile distribution center with 30ft clear height and 42 dock doors. Triple-net lease to a national logistics operator.' },
  { id:'VX-NYC-624', name:'Manhattan Income Tower', location:'New York, New York', type:'Office', min:'$2,000', apy:'8.2%', funded:88, occupancy:'85%', riskLevel:'medium', status:'Priority', img:galleryImages[5], memo:'Class A office tower in Midtown Manhattan. Recent capital improvements and LEED Gold certification. Priority allocation for accredited investors.' },
];

const FILTERS = ['All', 'Residential', 'Commercial', 'Multifamily', 'Mixed-use', 'Logistics', 'Office'];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 16,
      delay: 0.04 * i,
    },
  }),
};

export default function GalleryItems({ onSelectAsset }) {
  const [filter, setFilter] = useState('All');
  const [hoveredId, setHoveredId] = useState(null);

  const items = useMemo(() => filter === 'All' ? DATA : DATA.filter(item => item.type === filter), [filter]);

  return (
    <Box>
      <Stack direction={{ xs:'column', md:'row' }} spacing={2} sx={{ justifyContent:'space-between', alignItems:{ xs:'flex-start', md:'center' }, mb:4 }}>
        <Box>
          <Typography sx={{ fontFamily:'Manrope, sans-serif', fontSize:{ xs:'28px', md:'38px' }, fontWeight:800, color:'var(--text)', letterSpacing:'-.05em', lineHeight:1.02 }}>
            Featured tokenized property drops
          </Typography>
          <Typography sx={{ fontFamily:'Manrope, sans-serif', fontSize:'14px', color:'var(--muted)', mt:1.3, lineHeight:1.8, maxWidth:560 }}>
            The gallery now uses more credible real-estate imagery and a clearer information hierarchy instead of test-looking placeholders.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.2} flexWrap="wrap" useFlexGap>
          {FILTERS.map((f) => (
            <Chip
              key={f}
              label={f}
              onClick={() => setFilter(f)}
              sx={{
                height: 36,
                color: filter === f ? '#081311' : 'var(--text)',
                background: filter === f ? 'linear-gradient(135deg, var(--gold-2), var(--gold))' : 'rgba(255,255,255,.05)',
                border: `1px solid ${filter === f ? 'rgba(215,181,109,.34)' : 'rgba(255,255,255,.08)'}`,
              }}
            />
          ))}
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {items.map((item, index) => (
          <Grid item xs={12} md={6} xl={4} key={item.id}>
            <motion.div
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -8, transition: { type: 'spring', stiffness: 200, damping: 12 } }}
              onHoverStart={() => setHoveredId(item.id)}
              onHoverEnd={() => setHoveredId(null)}
              style={{ cursor: 'pointer' }}
              onClick={() => onSelectAsset?.(item)}
            >
              <Box
                className="vx-card-strong"
                data-tilt
                sx={{
                  overflow:'hidden', height:'100%',
                  transition: 'border-color .3s ease, box-shadow .3s ease',
                  borderColor: hoveredId === item.id ? 'rgba(215,181,109,.5)!important' : undefined,
                  boxShadow: hoveredId === item.id ? '0 28px 90px rgba(215,181,109,.2)!important' : undefined,
                }}
              >
                <Box sx={{ position:'relative', height:260 }}>
                  <motion.div
                    animate={hoveredId === item.id ? { scale: 1.06 } : { scale: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    style={{ height: '100%' }}
                  >
                    <Box component="img" src={item.img} alt={item.name} sx={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  </motion.div>
                  <Box sx={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(8,19,17,.58), rgba(8,19,17,.06) 55%, rgba(8,19,17,.12))' }} />
                  <Stack direction="row" spacing={1} sx={{ position:'absolute', top:16, left:16, right:16, justifyContent:'space-between' }}>
                    <Chip label={item.type} sx={{ height:28, color:'var(--gold-2)', background:'rgba(255,255,255,.08)', border:'1px solid rgba(255,255,255,.12)' }} />
                    <Chip label={item.status} sx={{ height:28, color:'#0a1411', background:'linear-gradient(135deg, var(--gold-2), var(--gold))' }} />
                  </Stack>
                  <Box sx={{ position:'absolute', left:18, bottom:18, right:18 }}>
                    <Typography sx={{ fontFamily:'IBM Plex Mono, monospace', fontSize:'10px', color:'var(--gold-2)', letterSpacing:'0.16em', textTransform:'uppercase', mb:1 }}>{item.id}</Typography>
                    <Typography sx={{ fontFamily:'Manrope, sans-serif', fontSize:'26px', fontWeight:800, color:'var(--text)', lineHeight:1.05, letterSpacing:'-.04em' }}>{item.name}</Typography>
                    <Typography sx={{ fontSize:'14px', color:'var(--muted)', mt:1 }}>{item.location}</Typography>
                  </Box>
                </Box>

                <Box sx={{ p:3 }}>
                  <Grid container spacing={1.2} sx={{ mb:2.2 }}>
                    {[
                      ['Minimum', item.min],
                      ['Target APY', item.apy],
                      ['Funding', `${item.funded}%`],
                    ].map(([k, v]) => (
                      <Grid item xs={4} key={k}>
                        <Box sx={{ p:1.6, borderRadius:'14px', background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.08)' }}>
                          <Typography sx={{ fontSize:'16px', fontWeight:800, color:'var(--text)' }}>{v}</Typography>
                          <Typography sx={{ fontFamily:'IBM Plex Mono, monospace', fontSize:'8px', color:'var(--dim)', letterSpacing:'0.12em', textTransform:'uppercase', mt:0.5 }}>{k}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>

                  <Typography sx={{ fontFamily:'IBM Plex Mono, monospace', fontSize:'9px', color:'var(--dim)', letterSpacing:'0.12em', textTransform:'uppercase', mb:1 }}>Funding progress</Typography>
                  <LinearProgress variant="determinate" value={item.funded} />
                  <Typography sx={{ mt:1, fontSize:'13px', color:'var(--muted)' }}>{item.funded}% of allocation completed</Typography>

                  <Stack direction="row" spacing={1.5} sx={{ mt:3 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={(e) => { e.stopPropagation(); onSelectAsset?.(item); }}
                    >
                      View Asset
                    </Button>
                    <Button variant="outlined" fullWidth sx={{ borderRadius:'999px', borderColor:'rgba(228,211,169,.18)', color:'var(--text)', textTransform:'none', '&:hover':{ borderColor:'rgba(215,181,109,.34)', background:'rgba(255,255,255,.03)' } }}>Tokenize</Button>
                  </Stack>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
