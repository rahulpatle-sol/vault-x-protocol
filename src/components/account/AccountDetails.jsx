import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { FiCopy, FiLogOut, FiX, FiCheck } from 'react-icons/fi';
import { useState, useCallback } from 'react';
import { getEllipsisTxt } from '../../helpers/formatters.js';
import { getExplorer } from '../../helpers/networks.js';
import { useWalletConnector } from './WalletConnector.jsx';

const resetLocalStorage = () => {
  localStorage.removeItem('wallet');
  localStorage.removeItem('connected');
};

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    });
  }, [text]);
  return (
    <IconButton onClick={copy} sx={{
      color: copied ? '#70B58B' : 'var(--dim)', borderRadius: '8px',
      width: 32, height: 32,
      border: '1px solid rgba(255,255,255,0.06)',
      '&:hover': { color: 'var(--text)', borderColor: 'rgba(215,181,109,0.2)' },
    }}>
      {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
    </IconButton>
  );
}

const AccountDetails = ({ accountDetailsDialogOpen, handleAccountDetailsDialogToggle, data }) => {
  const { logoutWalletConnector } = useWalletConnector();

  const handleLogout = () => {
    logoutWalletConnector();
    handleAccountDetailsDialogToggle();
    resetLocalStorage();
  };

  const Row = ({ label, children }) => (
    <Box sx={{ py: 1.5, borderBottom: '1px solid var(--border)' }}>
      <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--dim)', mb: 0.75 }}>
        {label}
      </Typography>
      {children}
    </Box>
  );

  return (
    <Dialog
      open={accountDetailsDialogOpen}
      onClose={handleAccountDetailsDialogToggle}
      PaperProps={{
        sx: {
          background: 'var(--surface)',
          border: '1px solid var(--border-strong)',
          borderRadius: '22px',
          boxShadow: '0 32px 90px rgba(0,0,0,0.5)',
          overflow: 'hidden',
          maxWidth: 400,
          width: '100%',
        },
      }}
      fullWidth maxWidth="xs"
    >
      <Box sx={{ height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), var(--green), transparent)' }} />

      <DialogTitle sx={{ px: 3, pt: 2.5, pb: 0 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '22px', fontWeight: 700, color: 'var(--text)' }}>
              My Wallet
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.5 }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: '#4eca8b', boxShadow: '0 0 6px #4eca8b' }} />
              <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '9px', color: '#4eca8b', letterSpacing: '0.1em' }}>
                Connected
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={handleAccountDetailsDialogToggle} sx={{
            color: 'var(--dim)', border: '1px solid var(--border)', borderRadius: '10px',
            width: 34, height: 34, flexShrink: 0,
            '&:hover': { color: 'var(--text)', borderColor: 'rgba(215,181,109,0.24)' },
          }}>
            <FiX size={16} />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pt: 1 }}>
        <Row label="Address">
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Link
              href={`${getExplorer(data.chainId)}/address/${data.account}`}
              underline="none"
              target="_blank"
              rel="noreferrer"
              sx={{
                fontFamily: '"IBM Plex Mono", monospace', fontSize: '13px', color: 'var(--gold)',
                display: 'flex', alignItems: 'center', gap: 0.5,
                '&:hover': { color: 'var(--gold-2)' },
              }}
            >
              {getEllipsisTxt(data.account, 8)}
              <HiOutlineExternalLink size={12} />
            </Link>
            <CopyBtn text={data.account} />
          </Stack>
        </Row>

        <Row label="ETH Balance">
          <Typography sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '26px', fontWeight: 600, color: 'var(--text)' }}>
            {data.balance} <Box component="span" sx={{ fontSize: '14px', color: 'var(--gold)' }}>ETH</Box>
          </Typography>
        </Row>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          fullWidth
          startIcon={<FiLogOut size={14} />}
          onClick={handleLogout}
          sx={{
            border: '1px solid rgba(224,92,92,0.25)',
            color: '#e05c5c',
            borderRadius: '10px',
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '10px', letterSpacing: '0.1em',
            py: 1.2, fontWeight: 600,
            '&:hover': { background: 'rgba(224,92,92,0.08)', borderColor: 'rgba(224,92,92,0.5)' },
          }}
        >
          Disconnect Wallet
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AccountDetails;
