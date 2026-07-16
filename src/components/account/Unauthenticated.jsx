import { Fragment, useState } from 'react';
import { RiWalletLine } from 'react-icons/ri';
import WalletProviders from './NetworkWalletProviders';

export default function Unauthenticated() {
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="vx-btn"
        style={{
          minHeight: 40,
          padding: '0 20px',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.04em',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: '"Plus Jakarta Sans", sans-serif',
        }}
      >
        <RiWalletLine size={15} />
        Connect Wallet
      </button>
      <WalletProviders walletProvidersDialogOpen={open} handleWalletProvidersDialogToggle={() => setOpen(false)} />
    </Fragment>
  );
}
