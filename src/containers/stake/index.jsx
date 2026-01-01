import TokenPools from '../../components/stake/TokenPools';
import StakeSteps from '../../components/stake/StakeSteps';
import HowToStake from '../../components/stake/HowToStake';
import { brandImages } from 'assets/remoteImages';
import WalletGate from '../../components/ui/WalletGate';

const APR_DATA = [
  { l:'7-Day Lock', v:'12.5%' },
  { l:'30-Day Lock', v:'24.8%' },
  { l:'90-Day Lock', v:'48.2%' },
];

export default function Stake() {
  return (
    <div style={{ minHeight:'100vh', background:'var(--ink)' }}>
      <div style={{ position:'relative', paddingTop:140, paddingBottom:78, overflow:'hidden' }}>
        <div className="grid-bg" style={{ position:'absolute', inset:0 }} />
        <img src={brandImages.stake} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:.72 }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(100deg, rgba(8,19,17,.58) 40%, rgba(8,19,17,.22) 100%)' }} />

        <div className="vx-container" style={{ position:'relative', zIndex:3 }}>
          <div className="vx-eyebrow" style={{ marginBottom:18 }}>VaultX staking</div>
          <h1 className="vx-title" style={{ fontSize:'clamp(54px,8vw,100px)', maxWidth:760 }}>
            Stake VTX and manage rewards with a cleaner interface.
          </h1>
          <p className="vx-copy" style={{ fontSize:15, maxWidth:560, marginTop:20, marginBottom:40 }}>
            The staking route now feels more aligned with the rest of the product: calmer typography, stronger structure, and a more polished presentation around reward tiers and participation steps.
          </p>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14 }}>
            {APR_DATA.map((a,i)=>(
              <div key={a.l} className="vx-card fadeInUp" style={{ padding:'20px 22px', animationDelay:`${i*.1}s` }}>
                <div className="mono" style={{ fontSize:8, color:'var(--gold-2)', letterSpacing:'.18em', textTransform:'uppercase', marginBottom:8 }}>{a.l}</div>
                <div style={{ fontSize:40, fontWeight:800, color:'var(--text)', letterSpacing:'-.04em', lineHeight:1 }}>{a.v}</div>
                <div className="mono" style={{ fontSize:8, color:'var(--dim)', letterSpacing:'.1em', marginTop:6 }}>APR</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="vx-container" style={{ padding:'0 0 100px' }}>
        <WalletGate title="Connect wallet to use staking" description="Staking pools and token approvals are inactive until wallet connection. This keeps the frontend aligned with contract-required account context.">
          <div style={{ display:'grid', gridTemplateColumns:'minmax(0,1fr) 430px', gap:34, alignItems:'start' }}>
            <div>
          <div className="vx-card-strong" style={{ borderRadius:24, overflow:'hidden', marginBottom:28 }}>
            <div style={{ position:'relative', height:220 }}>
              <img src={brandImages.stake} alt="Staking" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(8,19,17,.32),transparent)' }}/>
              <div style={{ position:'absolute', bottom:18, left:20 }}>
                <div className="mono" style={{ fontSize:8, color:'var(--gold-2)', letterSpacing:'.18em', textTransform:'uppercase', marginBottom:6 }}>Staking rewards pool</div>
                <div style={{ fontSize:24, fontWeight:800, color:'var(--text)', letterSpacing:'-.03em' }}>250,000,000 VTX reserved</div>
              </div>
            </div>
          </div>

          <h3 style={{ fontSize:28, fontWeight:800, letterSpacing:'-.03em', margin:'0 0 16px' }}>How to stake</h3>
          <StakeSteps />
          <div style={{ marginTop:28 }}><HowToStake /></div>
        </div>

            <div>
              <h3 style={{ fontSize:28, fontWeight:800, letterSpacing:'-.03em', margin:'0 0 16px' }}>Staking pool</h3>
              <TokenPools />
            </div>
          </div>
        </WalletGate>
      </div>
      <style>{`@media(max-width:980px){.vx-container[style*='repeat(3,1fr)']{grid-template-columns:1fr!important}.vx-container[style*='430px']{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
