import { useNavigate } from 'react-router-dom';
import vaultxMark from 'assets/images/vaultx-mark.svg';

const LINKS = {
  Platform: ['Presale', 'Marketplace', 'Staking', 'Swap'],
  Product: ['Gallery', 'Account', 'Transactions', 'Security Review'],
  Company: ['About', 'Partners', 'Contact'],
};

export default function Footer() {
  const navigate = useNavigate();
  const go = (item) => {
    const routes = { Presale:'/presale', Marketplace:'/gallery', Staking:'/stake', Swap:'/swap', Gallery:'/gallery', Account:'/account', Transactions:'/transactions', About:'/about', Contact:'/contact' };
    if (routes[item]) navigate(routes[item]);
  };

  return (
    <footer style={{ borderTop:'1px solid rgba(215,181,109,.14)', background:'rgba(6,14,12,.94)', padding:'60px 0 28px' }}>
      <div className="vx-container">
        <div style={{ display:'grid', gridTemplateColumns:'1.4fr repeat(3,1fr)', gap:34, marginBottom:38 }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
              <img src={vaultxMark} alt="VaultX" style={{ width:46, height:46, borderRadius:14 }} />
              <div>
                <div style={{ fontSize:22, fontWeight:800, color:'var(--text)', letterSpacing:'-.04em' }}>Vault<span style={{ color:'var(--gold-2)' }}>X</span></div>
                <div className="mono" style={{ fontSize:8, color:'var(--gold)', letterSpacing:'.24em', textTransform:'uppercase', marginTop:4 }}>Tokenized Real Assets</div>
              </div>
            </div>
            <p className="vx-copy" style={{ maxWidth:350, margin:0 }}>
              A redesigned RWA dApp interface for presale participation, token utility, gallery discovery, and investor-facing product presentation.
            </p>
          </div>
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group}>
              <div className="mono" style={{ fontSize:10, fontWeight:700, color:'var(--gold-2)', letterSpacing:'.14em', textTransform:'uppercase', marginBottom:16 }}>{group}</div>
              {items.map(item => (
                <button key={item} onClick={() => go(item)} style={{ display:'block', background:'transparent', color:'var(--muted)', padding:'7px 0', cursor:'pointer', fontSize:14, textAlign:'left' }}
                  onMouseOver={e => e.currentTarget.style.color='var(--text)'} onMouseOut={e => e.currentTarget.style.color='var(--muted)'}>
                  {item}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop:'1px solid rgba(215,181,109,.10)', paddingTop:20, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
          <div className="mono" style={{ fontSize:10, color:'var(--dim)', letterSpacing:'.08em' }}>© 2026 VAULTX PROTOCOL. ALL RIGHTS RESERVED.</div>
          <div className="mono" style={{ fontSize:10, color:'var(--dim)', letterSpacing:'.08em' }}>Imagery refreshed for a more professional product presentation.</div>
        </div>
      </div>
      <style>{`@media(max-width:840px){footer .vx-container>div:first-child{grid-template-columns:1fr 1fr!important}}@media(max-width:560px){footer .vx-container>div:first-child{grid-template-columns:1fr!important}}`}</style>
    </footer>
  );
}
