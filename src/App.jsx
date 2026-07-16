import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { AnimatePresence, motion } from 'framer-motion';
import ScrollProvider from './providers/ScrollProvider';
import use3DTilt from './hooks/use3DTilt';

import Home from './containers/home';
import About from './containers/about';
import Gallery from './containers/gallery';
import Transactions from './containers/transactions';
import NFTs from './containers/nfts';
import Swap from './containers/swap';
import Presale from './containers/pre-sale';
import Mint from './containers/mint';
import Stake from './containers/stake';
import Contact from './containers/contact';
import Compliance from './containers/compliance';
import NotFound from './containers/NotFound';
import Ramper from './components/Ramper';
import ERC20Balance from './components/ERC20Balance';
import CustomCursor from './components/ui/CustomCursor';

import Footer from './components/layout/Footer';
import MainNavigation from './components/layout/Header/MainNavigation';

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  },
};

function AnimatedPage({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
        <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
        <Route path="/swap" element={<AnimatedPage><Swap /></AnimatedPage>} />
        <Route path="/gallery" element={<AnimatedPage><Gallery /></AnimatedPage>} />
        <Route path="/erc20balance" element={<AnimatedPage><ERC20Balance /></AnimatedPage>} />
        <Route path="/onramp" element={<AnimatedPage><Ramper /></AnimatedPage>} />
        <Route path="/transactions" element={<AnimatedPage><Transactions /></AnimatedPage>} />
        <Route path="/nfts" element={<AnimatedPage><NFTs /></AnimatedPage>} />
        <Route path="/presale" element={<AnimatedPage><Presale /></AnimatedPage>} />
        <Route path="/pre-sale" element={<Navigate to="/presale" replace />} />
        <Route path="/mint" element={<AnimatedPage><Mint /></AnimatedPage>} />
        <Route path="/stake" element={<AnimatedPage><Stake /></AnimatedPage>} />
        <Route path="/contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
        <Route path="/compliance" element={<AnimatedPage><Compliance /></AnimatedPage>} />
        <Route path="*" element={<AnimatedPage><NotFound /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => {
  const { library, account } = useWeb3React();
  use3DTilt();

  useEffect(() => {
    if (library) localStorage.setItem('connected', true);
  }, [library, account]);

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <CustomCursor />
      <ScrollProvider>
        <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <MainNavigation />
          <main style={{ flex: 1 }}>
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </ScrollProvider>
    </BrowserRouter>
  );
};

export default App;
