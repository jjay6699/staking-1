import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { QRCodeSVG } from 'qrcode.react';
import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  Bell,
  ChevronDown,
  ChevronRight,
  Download,
  Eye,
  Home,
  LockKeyhole,
  Plus,
  RefreshCw,
  Repeat2,
  Search,
  Send,
  WalletCards,
  Coins,
  Clock3,
  ShieldCheck,
  TrendingUp,
  X,
} from 'lucide-react';
import './styles.css';
import btcIcon from 'cryptocurrency-icons/svg/color/btc.svg';
import wbtcIcon from 'cryptocurrency-icons/svg/color/wbtc.svg';
import stxIcon from 'cryptocurrency-icons/svg/color/stx.svg';
import ethIcon from 'cryptocurrency-icons/svg/color/eth.svg';
import solIcon from 'cryptocurrency-icons/svg/color/sol.svg';
import usdtIcon from 'cryptocurrency-icons/svg/color/usdt.svg';
import bnbIcon from 'cryptocurrency-icons/svg/color/bnb.svg';
import xrpIcon from 'cryptocurrency-icons/svg/color/xrp.svg';
import dogeIcon from 'cryptocurrency-icons/svg/color/doge.svg';
import adaIcon from 'cryptocurrency-icons/svg/color/ada.svg';
import avaxIcon from 'cryptocurrency-icons/svg/color/avax.svg';
import linkIcon from 'cryptocurrency-icons/svg/color/link.svg';
import dotIcon from 'cryptocurrency-icons/svg/color/dot.svg';
import maticIcon from 'cryptocurrency-icons/svg/color/matic.svg';

const staking = {
  btcBalance: 82.52331,
  totalDays: 365,
  initialElapsedDays: 233,
  anchorDate: '2026-06-04T00:32:47+08:00',
};

const primaryBtcRate = 3.25;
const stakingTerms = [30, 90, 150, 365];
const dayMs = 24 * 60 * 60 * 1000;

const assets = [
  { name: 'Bitcoin', ticker: 'BTC', rate: primaryBtcRate, icon: btcIcon },
  { name: 'Wrapped BTC', ticker: 'WBTC', rate: 2.7, icon: wbtcIcon },
  { name: 'Stacks', ticker: 'STX', rate: 4.31, icon: stxIcon },
];

const walletAssets = [
  {
    name: 'Bitcoin',
    ticker: 'BTC',
    priceId: 'bitcoin',
    balance: 82.52331,
    available: 0,
    icon: btcIcon,
    locked: true,
    network: 'Bitcoin',
    fee: '0.00012 BTC',
    address: 'bc1q9x0mighty7dylank4v8h6p2n5q3z7k0l9r2a6s8c',
  },
  {
    name: 'Ethereum',
    ticker: 'ETH',
    priceId: 'ethereum',
    balance: 0,
    available: 0,
    icon: ethIcon,
    locked: false,
    network: 'Ethereum',
    fee: '0.00210 ETH',
    address: '0x7A91F2c8d4b6E90aD12F4b8A63e927c1D5B0F84a',
  },
  {
    name: 'Solana',
    ticker: 'SOL',
    priceId: 'solana',
    balance: 0,
    available: 0,
    icon: solIcon,
    locked: false,
    network: 'Solana',
    fee: '0.000005 SOL',
    address: '9xQeWvG816bUx9EPfMjDk9qQYzS4MDyLanK2x7N',
  },
  {
    name: 'Tether USD',
    ticker: 'USDT',
    priceId: 'tether',
    balance: 0,
    available: 0,
    icon: usdtIcon,
    locked: false,
    network: 'Ethereum',
    fee: '4.50 USDT',
    address: '0x4f3C2A1d9E8b7a6C5D4e3F2A1B0c9D8E7F6a5B4c',
  },
];

const marketAssets = [
  { name: 'Bitcoin', ticker: 'BTC', priceId: 'bitcoin', icon: btcIcon, balance: staking.btcBalance, fallbackPrice: 65759, change: 2.4 },
  { name: 'Ethereum', ticker: 'ETH', priceId: 'ethereum', icon: ethIcon, balance: 0, fallbackPrice: 1822.95, change: 1.8 },
  { name: 'Solana', ticker: 'SOL', priceId: 'solana', icon: solIcon, balance: 0, fallbackPrice: 72.46, change: 3.6 },
  { name: 'BNB', ticker: 'BNB', priceId: 'binancecoin', icon: bnbIcon, balance: 0, fallbackPrice: 650.24, change: 0.9 },
  { name: 'XRP', ticker: 'XRP', priceId: 'ripple', icon: xrpIcon, balance: 0, fallbackPrice: 0.52, change: -0.7 },
  { name: 'Dogecoin', ticker: 'DOGE', priceId: 'dogecoin', icon: dogeIcon, balance: 0, fallbackPrice: 0.14, change: 1.1 },
  { name: 'Cardano', ticker: 'ADA', priceId: 'cardano', icon: adaIcon, balance: 0, fallbackPrice: 0.62, change: -1.3 },
  { name: 'Avalanche', ticker: 'AVAX', priceId: 'avalanche-2', icon: avaxIcon, balance: 0, fallbackPrice: 28.4, change: 2.0 },
  { name: 'Chainlink', ticker: 'LINK', priceId: 'chainlink', icon: linkIcon, balance: 0, fallbackPrice: 15.2, change: 0.4 },
  { name: 'Polkadot', ticker: 'DOT', priceId: 'polkadot', icon: dotIcon, balance: 0, fallbackPrice: 4.25, change: -0.5 },
  { name: 'Polygon', ticker: 'MATIC', priceId: 'matic-network', icon: maticIcon, balance: 0, fallbackPrice: 0.23, change: 1.6 },
];

function formatBtc(value) {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 5,
    maximumFractionDigits: 5,
  });
}

function formatUsd(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value);
}

function formatRate(rate) {
  if (rate > 0 && rate < 0.01) {
    return '<0.01%';
  }

  return `${rate.toFixed(2)}%`;
}

function formatStakePeriod(days) {
  return days === 365 ? '1 year' : `${days} days`;
}

function formatUnlockDate(timestamp) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(timestamp));
}

function formatRemainingTime(milliseconds) {
  const totalMinutes = Math.max(0, Math.ceil(milliseconds / (60 * 1000)));
  const days = Math.ceil(totalMinutes / (24 * 60));
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const minutes = totalMinutes % 60;

  if (totalMinutes >= 24 * 60) {
    return `${days} days`;
  }

  if (hours <= 0) {
    return `${minutes} min`;
  }

  return `${hours} hrs ${minutes} min`;
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M13.7 10.6 20.3 3h-1.6L13 9.5 8.5 3H3.2l6.9 10-6.9 8h1.6l6-6.9 4.8 6.9h5.3l-7.2-10.4Zm-2.1 2.4-.7-1L5.3 4.2h2.4l4.4 6.3.7 1 5.9 8.4h-2.4L11.6 13Z"
        fill="currentColor"
      />
    </svg>
  );
}

function App() {
  const [now, setNow] = useState(() => Date.now());
  const [expandedTicker, setExpandedTicker] = useState('');
  const [view, setView] = useState('home');
  const [walletFilter, setWalletFilter] = useState('assets');
  const [walletSlideIndex, setWalletSlideIndex] = useState(0);
  const [transferMode, setTransferMode] = useState('send');
  const [selectedTransferTicker, setSelectedTransferTicker] = useState('BTC');
  const [tokenPickerOpen, setTokenPickerOpen] = useState(false);
  const [sendAmount, setSendAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [withdrawNotice, setWithdrawNotice] = useState('');
  const [prices, setPrices] = useState({});
  const [priceError, setPriceError] = useState('');
  const [pricesUpdatedAt, setPricesUpdatedAt] = useState(null);
  const [pricesLoading, setPricesLoading] = useState(false);
  const [tradeFromTicker, setTradeFromTicker] = useState('BTC');
  const [tradeToTicker, setTradeToTicker] = useState('ETH');
  const [tradeAmount, setTradeAmount] = useState('0.25');
  const [tradePickerOpen, setTradePickerOpen] = useState('');
  const [swapPreviewOpen, setSwapPreviewOpen] = useState(false);

  React.useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 60 * 1000);

    return () => window.clearInterval(timer);
  }, []);

  React.useEffect(() => {
    let cancelled = false;

    async function fetchCryptoPrices() {
      setPricesLoading(true);
      try {
        const trackedPriceIds = [...new Set([...walletAssets, ...marketAssets].map((asset) => asset.priceId))].join(',');
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${trackedPriceIds}&vs_currencies=usd`);

        if (!response.ok) {
          throw new Error('Unable to load prices');
        }

        const data = await response.json();
        const nextPrices = [...walletAssets, ...marketAssets].reduce((next, asset) => {
          next[asset.ticker] = data?.[asset.priceId]?.usd;
          return next;
        }, {});

        if (!cancelled) {
          setPrices(nextPrices);
          setPriceError('');
          setPricesUpdatedAt(Date.now());
        }
      } catch (error) {
        if (!cancelled) {
          setPriceError('Live prices are temporarily unavailable.');
        }
      } finally {
        if (!cancelled) {
          setPricesLoading(false);
        }
      }
    }

    fetchCryptoPrices();
    const priceTimer = window.setInterval(fetchCryptoPrices, 5 * 60 * 1000);
    window.refreshCryptoPrices = fetchCryptoPrices;

    return () => {
      cancelled = true;
      window.clearInterval(priceTimer);
      delete window.refreshCryptoPrices;
    };
  }, []);

  const daysSinceAnchor = Math.max(0, (now - new Date(staking.anchorDate).getTime()) / dayMs);
  const elapsedExactDays = Math.min(staking.totalDays, staking.initialElapsedDays + daysSinceAnchor);
  const elapsedDays = Math.min(staking.totalDays, Math.floor(elapsedExactDays));
  const remainingExactDays = Math.max(0, staking.totalDays - elapsedExactDays);
  const remainingDays = Math.ceil(remainingExactDays);
  const progress = (elapsedExactDays / staking.totalDays) * 100;
  const estimatedBtcRewards = staking.btcBalance * (primaryBtcRate / 100) * (remainingExactDays / 365);
  const dailyBtcReward = remainingExactDays > 0 ? estimatedBtcRewards / remainingExactDays : 0;
  const earnedRewards = staking.btcBalance * (primaryBtcRate / 100) * (elapsedExactDays / 365);
  const totalProjectedRewards = staking.btcBalance * (primaryBtcRate / 100) * (staking.totalDays / 365);
  const anchorTime = new Date(staking.anchorDate).getTime();
  const unlockTimestamp = anchorTime + (staking.totalDays - staking.initialElapsedDays) * dayMs;
  const remainingLockMs = Math.max(0, unlockTimestamp - now);
  const isLocked = remainingLockMs > 0;
  const unlockDate = formatUnlockDate(unlockTimestamp);
  const remainingLockTime = formatRemainingTime(remainingLockMs);
  const selectedWalletAsset = walletAssets[walletSlideIndex] ?? walletAssets[0];
  function getDisplayPrice(ticker) {
    const livePrice = prices[ticker];

    if (typeof livePrice === 'number') {
      return livePrice;
    }

    return marketAssets.find((asset) => asset.ticker === ticker)?.fallbackPrice;
  }

  function getTradeAsset(ticker) {
    return marketAssets.find((asset) => asset.ticker === ticker) ?? marketAssets[0];
  }

  function formatTokenAmount(value) {
    if (!Number.isFinite(value)) {
      return '0.000000';
    }

    return value.toLocaleString('en-US', {
      minimumFractionDigits: value >= 1 ? 4 : 6,
      maximumFractionDigits: value >= 1 ? 4 : 8,
    });
  }

  function formatUpdatedTime(timestamp) {
    if (!timestamp) {
      return 'Syncing';
    }

    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date(timestamp));
  }

  const totalWalletUsdValue = walletAssets.reduce((total, asset) => {
    const livePrice = getDisplayPrice(asset.ticker);

    return total + (typeof livePrice === 'number' ? asset.balance * livePrice : 0);
  }, 0);

  function goTo(nextView) {
    setExpandedTicker('');
    setTokenPickerOpen(false);
    setTradePickerOpen('');
    setSwapPreviewOpen(false);
    setWithdrawNotice('');
    setView(nextView);
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'auto' }));
  }

  function estimateReward(rate, days) {
    return staking.btcBalance * (rate / 100) * (days / 365);
  }

  function handleWithdraw() {
    if (isLocked) {
      setWithdrawNotice(`This BTC stake is locked. Unlock and withdrawal will be available after ${unlockDate}. Remaining lock time: ${remainingLockTime}.`);
      return;
    }

    setWithdrawNotice('This stake has completed its lock period and is available to withdraw.');
  }

  function handleTradeTokenChange(side, ticker) {
    setTradePickerOpen('');

    if (side === 'from') {
      setTradeFromTicker(ticker);

      if (ticker === tradeToTicker) {
        const replacement = marketAssets.find((asset) => asset.ticker !== ticker)?.ticker ?? 'ETH';
        setTradeToTicker(replacement);
      }
      return;
    }

    setTradeToTicker(ticker);

    if (ticker === tradeFromTicker) {
      const replacement = marketAssets.find((asset) => asset.ticker !== ticker)?.ticker ?? 'BTC';
      setTradeFromTicker(replacement);
    }
  }

  function flipTradePair() {
    setTradePickerOpen('');
    setSwapPreviewOpen(false);
    setTradeFromTicker(tradeToTicker);
    setTradeToTicker(tradeFromTicker);
  }

  function renderTradeTokenPicker(side, selectedAsset) {
    const selectedTicker = side === 'from' ? tradeFromTicker : tradeToTicker;
    const label = side === 'from' ? 'Token to pay' : 'Token to receive';
    const isOpen = tradePickerOpen === side;

    return (
      <div className="trade-token-picker">
        <button
          className="trade-token-button"
          type="button"
          aria-label={label}
          aria-expanded={isOpen}
          onClick={() => setTradePickerOpen((openSide) => (openSide === side ? '' : side))}
        >
          <img src={selectedAsset.icon} alt="" />
          <span>{selectedAsset.ticker}</span>
          <ChevronDown size={15} />
        </button>

        {isOpen && (
          <div className="trade-token-menu">
            {marketAssets.map((asset) => (
              <button
                className={asset.ticker === selectedTicker ? 'selected' : ''}
                type="button"
                key={asset.ticker}
                onClick={() => handleTradeTokenChange(side, asset.ticker)}
              >
                <img src={asset.icon} alt="" />
                <span>
                  <strong>{asset.ticker}</strong>
                  <em>{asset.name}</em>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  const bottomNav = (
    <nav className="bottom-nav" aria-label="Primary">
      <button className={view === 'home' ? 'active' : ''} type="button" onClick={() => goTo('home')}>
        <Home size={23} />
        <span>Home</span>
      </button>
      <button className={view === 'trade' ? 'active' : ''} type="button" onClick={() => goTo('trade')}>
        <BarChart3 size={23} />
        <span>Trade</span>
      </button>
      <button className="swap-button" type="button" aria-label="Open transfer" onClick={() => goTo('transfer')}>
        <ArrowUpRight size={31} />
      </button>
      <button className={view === 'dashboard' || view === 'details' ? 'active' : ''} type="button" onClick={() => goTo('dashboard')}>
        <Coins size={23} />
        <span>Staking</span>
      </button>
      <button className={view === 'wallet' ? 'active' : ''} type="button" onClick={() => goTo('wallet')}>
        <WalletCards size={23} />
        <span>Wallet</span>
      </button>
    </nav>
  );

  const selectedTransferAsset = walletAssets.find((asset) => asset.ticker === selectedTransferTicker) ?? walletAssets[0];
  const tradeFromAsset = getTradeAsset(tradeFromTicker);
  const tradeToAsset = getTradeAsset(tradeToTicker);
  const tradeFromPrice = getDisplayPrice(tradeFromTicker);
  const tradeToPrice = getDisplayPrice(tradeToTicker);
  const numericTradeAmount = Number(tradeAmount);
  const hasLiveTradePrices = typeof prices[tradeFromTicker] === 'number' && typeof prices[tradeToTicker] === 'number';
  const canQuoteTrade = Number.isFinite(numericTradeAmount) && numericTradeAmount > 0 && typeof tradeFromPrice === 'number' && typeof tradeToPrice === 'number';
  const tradeSlippage = 0.005;
  const networkFeeUsd = 3.8;
  const grossTradeOutput = canQuoteTrade ? (numericTradeAmount * tradeFromPrice) / tradeToPrice : 0;
  const estimatedTradeOutput = grossTradeOutput * (1 - tradeSlippage);
  const minimumTradeOutput = grossTradeOutput * (1 - 0.01);
  const tradeUsdValue = canQuoteTrade ? numericTradeAmount * tradeFromPrice : 0;
  const tradeRate = typeof tradeFromPrice === 'number' && typeof tradeToPrice === 'number' ? tradeFromPrice / tradeToPrice : 0;

  if (view === 'home') {
    return (
      <main className="page-shell">
        <section className="phone" aria-label="Crypto app home">
          <header className="home-header">
            <div className="home-profile">
              <img src="/profile-concept87.svg" alt="Concept 87 profile" />
              <div>
                <span>Welcome back</span>
                <strong>Concept 87 LTD</strong>
              </div>
            </div>
            <button className="icon-button" type="button" aria-label="Notifications">
              <Bell size={20} />
            </button>
          </header>

          <section className="home-portfolio-card">
            <div className="portfolio-topline">
              <span>Total Balance</span>
              <Eye size={15} />
            </div>
            <div className="portfolio-value">
              {totalWalletUsdValue > 0 ? formatUsd(totalWalletUsdValue) : `${formatBtc(staking.btcBalance)} BTC`}
            </div>
            <div className="portfolio-btc-line">
              <span>{formatBtc(staking.btcBalance)} BTC locked</span>
              <strong>{formatRate(primaryBtcRate)} APY</strong>
            </div>
            <div className="home-progress">
              <div>
                <span>1-year staking plan</span>
                <strong>{remainingDays} days left</strong>
              </div>
              <div className="progress-track">
                <div style={{ width: `${progress}%` }} />
              </div>
            </div>
          </section>

          <section className="quick-actions" aria-label="Quick actions">
            <button
              type="button"
              onClick={() => {
                setTransferMode('send');
                goTo('transfer');
              }}
            >
              <Send size={20} />
              <span>Send</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setTransferMode('receive');
                goTo('transfer');
              }}
            >
              <Download size={20} />
              <span>Receive</span>
            </button>
            <button type="button" onClick={() => goTo('wallet')}>
              <WalletCards size={20} />
              <span>Wallet</span>
            </button>
            <button type="button" onClick={() => goTo('dashboard')}>
              <Plus size={20} />
              <span>Stake</span>
            </button>
          </section>

          <section className="home-section">
            <div className="home-section-title">
              <span>Markets</span>
              <button type="button" onClick={() => goTo('trade')}>View All</button>
            </div>
            {marketAssets.map((asset) => {
              const displayPrice = getDisplayPrice(asset.ticker);

              return (
                <article className="market-row" key={asset.ticker}>
                  <span className="asset-icon">
                    <img src={asset.icon} alt={`${asset.name} logo`} />
                  </span>
                  <div className="market-name">
                    <strong>{asset.name}</strong>
                    <span>{asset.ticker}</span>
                  </div>
                  <div className="market-value">
                    <strong>{typeof displayPrice === 'number' ? formatUsd(displayPrice) : 'Loading'}</strong>
                    <span>
                      {asset.balance > 0
                        ? `${asset.ticker === 'BTC' ? formatBtc(asset.balance) : asset.balance.toFixed(5)} ${asset.ticker}`
                        : 'No balance'}
                    </span>
                    <em className={asset.change >= 0 ? 'market-change positive' : 'market-change negative'}>
                      {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(1)}%
                    </em>
                  </div>
                </article>
              );
            })}
          </section>

          <button className="home-staking-card" type="button" onClick={() => goTo('details')}>
            <div>
              <span className="pill locked">
                <LockKeyhole size={13} />
                Active Stake
              </span>
              <h2>{formatBtc(totalProjectedRewards)} BTC projected reward</h2>
              <p>{formatBtc(earnedRewards)} BTC earned so far from the 1-year BTC plan.</p>
            </div>
            <ChevronRight size={22} />
          </button>

          {bottomNav}
        </section>
      </main>
    );
  }

  if (view === 'trade') {
    return (
      <main className="page-shell">
        <section className="phone" aria-label="Crypto swap trading">
          <header className="trade-header">
            <div>
              <span>Trade</span>
              <strong>Swap Crypto</strong>
            </div>
            <button
              className="icon-button"
              type="button"
              aria-label="Refresh live rates"
              onClick={() => window.refreshCryptoPrices?.()}
              disabled={pricesLoading}
            >
              <RefreshCw size={20} className={pricesLoading ? 'spinning' : ''} />
            </button>
          </header>

          <section className="trade-rate-card">
            <div className="trade-rate-top">
              <span className={hasLiveTradePrices ? 'pill success' : 'pill muted'}>
                {hasLiveTradePrices ? 'Live rates' : 'Syncing rates'}
              </span>
              <span>Updated {formatUpdatedTime(pricesUpdatedAt)}</span>
            </div>
            <div className="trade-rate-main">
              <span>1 {tradeFromTicker}</span>
              <strong>
                {tradeRate > 0 ? `${formatTokenAmount(tradeRate)} ${tradeToTicker}` : 'Loading'}
              </strong>
            </div>
            {priceError && <div className="wallet-error">{priceError}</div>}
          </section>

          <section className="swap-card" aria-label="Swap form">
            <div className="swap-field">
              <div className="swap-field-label">
                <span>You pay</span>
                <strong>{typeof tradeFromPrice === 'number' ? formatUsd(tradeFromPrice) : 'Loading'}</strong>
              </div>
              <div className="swap-input-row">
                <input
                  aria-label="Amount to swap"
                  type="number"
                  min="0"
                  inputMode="decimal"
                  value={tradeAmount}
                  onChange={(event) => setTradeAmount(event.target.value)}
                />
                {renderTradeTokenPicker('from', tradeFromAsset)}
              </div>
            </div>

            <button className="pair-flip-button" type="button" aria-label="Flip swap pair" onClick={flipTradePair}>
              <Repeat2 size={20} />
            </button>

            <div className="swap-field">
              <div className="swap-field-label">
                <span>You receive</span>
                <strong>{typeof tradeToPrice === 'number' ? formatUsd(tradeToPrice) : 'Loading'}</strong>
              </div>
              <div className="swap-input-row">
                <output aria-label="Estimated received amount">
                  {canQuoteTrade ? formatTokenAmount(estimatedTradeOutput) : '0.000000'}
                </output>
                {renderTradeTokenPicker('to', tradeToAsset)}
              </div>
            </div>

            <div className="trade-summary">
              <div>
                <span>Trade value</span>
                <strong>{canQuoteTrade ? formatUsd(tradeUsdValue) : 'Loading'}</strong>
              </div>
              <div>
                <span>Max slippage</span>
                <strong>0.50%</strong>
              </div>
              <div>
                <span>Minimum received</span>
                <strong>{canQuoteTrade ? `${formatTokenAmount(minimumTradeOutput)} ${tradeToTicker}` : 'Loading'}</strong>
              </div>
              <div>
                <span>Network estimate</span>
                <strong>{formatUsd(networkFeeUsd)}</strong>
              </div>
            </div>

            <button
              className="primary-transfer-button"
              type="button"
              disabled={!hasLiveTradePrices || !canQuoteTrade}
              onClick={() => setSwapPreviewOpen(true)}
            >
              Preview Swap
            </button>
          </section>

          <section className="home-section">
            <div className="home-section-title">
              <span>Live Markets</span>
              <button type="button" onClick={() => window.refreshCryptoPrices?.()}>Refresh</button>
            </div>
            {marketAssets.slice(0, 6).map((asset) => {
              const displayPrice = getDisplayPrice(asset.ticker);

              return (
                <article className="market-row compact-market-row" key={asset.ticker}>
                  <span className="asset-icon">
                    <img src={asset.icon} alt={`${asset.name} logo`} />
                  </span>
                  <div className="market-name">
                    <strong>{asset.name}</strong>
                    <span>{asset.ticker}</span>
                  </div>
                  <div className="market-value">
                    <strong>{typeof displayPrice === 'number' ? formatUsd(displayPrice) : 'Loading'}</strong>
                    <em className={asset.change >= 0 ? 'market-change positive' : 'market-change negative'}>
                      {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(1)}%
                    </em>
                  </div>
                </article>
              );
            })}
          </section>

          {swapPreviewOpen && (
            <div className="notice-backdrop" role="presentation" onClick={() => setSwapPreviewOpen(false)}>
              <div className="swap-preview-dialog" role="dialog" aria-modal="true" aria-label="Swap preview" onClick={(event) => event.stopPropagation()}>
                <div className="swap-preview-top">
                  <span className="pill success">Live quote</span>
                  <button className="icon-button" type="button" aria-label="Close swap preview" onClick={() => setSwapPreviewOpen(false)}>
                    <X size={19} />
                  </button>
                </div>

                <h2>Preview Swap</h2>

                <div className="swap-preview-route">
                  <div>
                    <span className="asset-icon">
                      <img src={tradeFromAsset.icon} alt={`${tradeFromAsset.name} logo`} />
                    </span>
                    <strong>{formatTokenAmount(numericTradeAmount)} {tradeFromTicker}</strong>
                    <em>{formatUsd(tradeUsdValue)}</em>
                  </div>
                  <span className="swap-preview-arrow">
                    <Repeat2 size={19} />
                  </span>
                  <div>
                    <span className="asset-icon">
                      <img src={tradeToAsset.icon} alt={`${tradeToAsset.name} logo`} />
                    </span>
                    <strong>{formatTokenAmount(estimatedTradeOutput)} {tradeToTicker}</strong>
                    <em>Estimated receive</em>
                  </div>
                </div>

                <div className="swap-preview-details">
                  <div>
                    <span>Rate</span>
                    <strong>1 {tradeFromTicker} = {formatTokenAmount(tradeRate)} {tradeToTicker}</strong>
                  </div>
                  <div>
                    <span>Minimum received</span>
                    <strong>{formatTokenAmount(minimumTradeOutput)} {tradeToTicker}</strong>
                  </div>
                  <div>
                    <span>Slippage</span>
                    <strong>0.50%</strong>
                  </div>
                  <div>
                    <span>Network estimate</span>
                    <strong>{formatUsd(networkFeeUsd)}</strong>
                  </div>
                  <div>
                    <span>Quote updated</span>
                    <strong>{formatUpdatedTime(pricesUpdatedAt)}</strong>
                  </div>
                </div>

                <button className="confirm-swap-button" type="button">
                  Confirm Swap
                </button>
                <button className="secondary-swap-button" type="button" onClick={() => setSwapPreviewOpen(false)}>
                  Adjust Swap
                </button>
              </div>
            </div>
          )}

          {bottomNav}
        </section>
      </main>
    );
  }

  if (view === 'transfer') {
    const canSend = selectedTransferAsset.available > 0 && Number(sendAmount) > 0 && recipientAddress.trim().length > 0;
    const transferWarning = selectedTransferAsset.locked
      ? `${formatBtc(selectedTransferAsset.balance)} ${selectedTransferAsset.ticker} is locked in staking until ${unlockDate}. Available to send: ${selectedTransferAsset.available.toFixed(5)} ${selectedTransferAsset.ticker}.`
      : `Available to send: ${selectedTransferAsset.available.toFixed(5)} ${selectedTransferAsset.ticker}.`;

    return (
      <main className="page-shell">
        <section className="phone" aria-label="Wallet transfer">
          <header className="details-header">
            <button className="icon-button" type="button" aria-label="Back to wallet" onClick={() => goTo('wallet')}>
              <ArrowLeft size={22} />
            </button>
            <div>
              <span>Wallet</span>
              <strong>{transferMode === 'send' ? 'Send Crypto' : 'Receive Crypto'}</strong>
            </div>
            <span className="asset-icon detail-coin">
              <img src={selectedTransferAsset.icon} alt={`${selectedTransferAsset.name} logo`} />
            </span>
          </header>

          <section className="transfer-screen-card">
            <div className="transfer-tabs">
              <button
                className={transferMode === 'send' ? 'selected' : ''}
                type="button"
                onClick={() => {
                  setTokenPickerOpen(false);
                  setTransferMode('send');
                }}
              >
                Send
              </button>
              <button
                className={transferMode === 'receive' ? 'selected' : ''}
                type="button"
                onClick={() => {
                  setTokenPickerOpen(false);
                  setTransferMode('receive');
                }}
              >
                Receive
              </button>
            </div>

            <span className="field-label">Token</span>
            <div className="token-picker">
              <button
                className="token-picker-button"
                type="button"
                aria-expanded={tokenPickerOpen}
                onClick={() => setTokenPickerOpen((open) => !open)}
              >
                <span className="asset-icon">
                  <img src={selectedTransferAsset.icon} alt={`${selectedTransferAsset.name} logo`} />
                </span>
                <span>
                  <strong>{selectedTransferAsset.name}</strong>
                  <em>{selectedTransferAsset.ticker}</em>
                </span>
                {selectedTransferAsset.locked && (
                  <span className="token-lock">
                    <LockKeyhole size={12} />
                    Locked
                  </span>
                )}
                <ChevronDown size={18} />
              </button>

              {tokenPickerOpen && (
                <div className="token-picker-menu">
                  {walletAssets.map((asset) => (
                    <button
                      className={asset.ticker === selectedTransferTicker ? 'selected' : ''}
                      type="button"
                      key={asset.ticker}
                      onClick={() => {
                        setSelectedTransferTicker(asset.ticker);
                        setTokenPickerOpen(false);
                        setSendAmount('');
                        setRecipientAddress('');
                      }}
                    >
                      <span className="asset-icon">
                        <img src={asset.icon} alt={`${asset.name} logo`} />
                      </span>
                      <span>
                        <strong>{asset.name}</strong>
                        <em>{asset.ticker} · {asset.network}</em>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {transferMode === 'send' ? (
              <div className="send-form">
                <label className="field-label" htmlFor="recipient-address">Recipient address</label>
                <input
                  id="recipient-address"
                  type="text"
                  value={recipientAddress}
                  placeholder={`Enter ${selectedTransferAsset.network} address`}
                  onChange={(event) => setRecipientAddress(event.target.value)}
                />

                <label className="field-label" htmlFor="send-amount">Amount</label>
                <div className="amount-row">
                  <input
                    id="send-amount"
                    type="number"
                    min="0"
                    inputMode="decimal"
                    value={sendAmount}
                    placeholder="0.00000"
                    onChange={(event) => setSendAmount(event.target.value)}
                  />
                  <button type="button" onClick={() => setSendAmount(String(selectedTransferAsset.available))}>Max</button>
                </div>

                <div className="transfer-summary">
                  <div>
                    <span>Available</span>
                    <strong>{selectedTransferAsset.available.toFixed(5)} {selectedTransferAsset.ticker}</strong>
                  </div>
                  <div>
                    <span>Network fee</span>
                    <strong>{selectedTransferAsset.fee}</strong>
                  </div>
                  <div>
                    <span>Status</span>
                    <strong>{selectedTransferAsset.locked ? 'Locked' : selectedTransferAsset.available > 0 ? 'Ready' : 'No available balance'}</strong>
                  </div>
                </div>

                <div className="transfer-warning">{transferWarning}</div>
                <button className="primary-transfer-button" type="button" disabled={!canSend}>Review Send</button>
              </div>
            ) : (
              <div className="receive-panel">
                <span className="field-label">Receive address</span>
                <div className="qr-placeholder">
                  <QRCodeSVG
                    value={selectedTransferAsset.address}
                    size={156}
                    bgColor="#ffffff"
                    fgColor="#111111"
                    level="M"
                    includeMargin
                  />
                  <span className="qr-token-badge">
                    <img src={selectedTransferAsset.icon} alt="" />
                  </span>
                </div>
                <div className="receive-address">{selectedTransferAsset.address}</div>
                <div className="transfer-summary">
                  <div>
                    <span>Network</span>
                    <strong>{selectedTransferAsset.network}</strong>
                  </div>
                  <div>
                    <span>Token type</span>
                    <strong>{selectedTransferAsset.ticker}</strong>
                  </div>
                </div>
                <button className="primary-transfer-button" type="button">Copy Address</button>
              </div>
            )}
          </section>

          {bottomNav}
        </section>
      </main>
    );
  }

  if (view === 'wallet') {
    const filteredWalletAssets = walletAssets.filter((asset) => {
      if (walletFilter === 'locked') {
        return asset.locked;
      }

      if (walletFilter === 'available') {
        return !asset.locked;
      }

      return true;
    });

    return (
      <main className="page-shell">
        <section className="phone" aria-label="BTC wallet">
          <header className="wallet-profile">
            <img src="/profile-concept87.svg" alt="Concept 87 profile" />
            <div>
              <span>Wallet</span>
              <strong>Concept 87 LTD</strong>
            </div>
            <a href="https://x.com/MightyDylanK" target="_blank" rel="noreferrer" aria-label="Open MightyDylanK on X">
              <XIcon />
            </a>
          </header>

          <section className="wallet-carousel-card">
            <div className="wallet-slides" style={{ transform: `translateX(-${walletSlideIndex * 100}%)` }}>
              {walletAssets.map((asset) => {
                const livePrice = prices[asset.ticker];
                const slideUsdValue = typeof livePrice === 'number' ? asset.balance * livePrice : null;

                return (
                  <article className="wallet-balance-card wallet-slide" key={asset.ticker}>
                    <div className="wallet-balance-top">
                      <span className="asset-icon wallet-btc-icon">
                        <img src={asset.icon} alt={`${asset.name} logo`} />
                      </span>
                      {asset.locked && (
                        <span className="pill locked">
                          <LockKeyhole size={13} />
                          Locked
                        </span>
                      )}
                    </div>
                    <p>Total {asset.ticker} Balance</p>
                    <div className="wallet-btc-balance">
                      {asset.ticker === 'BTC' ? formatBtc(asset.balance) : asset.balance.toFixed(5)} {asset.ticker}
                    </div>
                    <div className="wallet-usd-balance">
                      {slideUsdValue === null ? 'Loading live USD value...' : formatUsd(slideUsdValue)}
                    </div>
                    <div className="wallet-price-row">
                      <span>{asset.ticker}/USD</span>
                      <strong>{typeof livePrice === 'number' ? formatUsd(livePrice) : 'Loading'}</strong>
                    </div>
                    {asset.locked ? (
                      <button className="wallet-withdraw-button" type="button" onClick={handleWithdraw}>
                        Withdraw
                      </button>
                    ) : (
                      <button className="wallet-withdraw-button secondary" type="button" onClick={() => goTo('transfer')}>
                        Transfer
                      </button>
                    )}
                  </article>
                );
              })}
            </div>

            <div className="wallet-carousel-controls">
              <button
                type="button"
                aria-label="Previous asset"
                onClick={() => setWalletSlideIndex((index) => (index === 0 ? walletAssets.length - 1 : index - 1))}
              >
                ‹
              </button>
              <div className="wallet-dots" aria-label={`${selectedWalletAsset.name} selected`}>
                {walletAssets.map((asset, index) => (
                  <button
                    className={index === walletSlideIndex ? 'active' : ''}
                    type="button"
                    aria-label={`Show ${asset.name}`}
                    key={asset.ticker}
                    onClick={() => setWalletSlideIndex(index)}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Next asset"
                onClick={() => setWalletSlideIndex((index) => (index + 1) % walletAssets.length)}
              >
                ›
              </button>
            </div>

            {priceError && <div className="wallet-error">{priceError}</div>}
          </section>

          <section className="wallet-asset-list">
            <div className="wallet-actions">
              <button className={walletFilter === 'assets' ? 'selected' : ''} type="button" onClick={() => setWalletFilter('assets')}>Assets</button>
              <button className={walletFilter === 'locked' ? 'selected' : ''} type="button" onClick={() => setWalletFilter('locked')}>Locked</button>
              <button className={walletFilter === 'available' ? 'selected' : ''} type="button" onClick={() => setWalletFilter('available')}>Available</button>
            </div>
            <div className="wallet-list-header">
              <span>{walletFilter === 'assets' ? 'Wallet Assets' : walletFilter === 'locked' ? 'Locked Assets' : 'Available Assets'}</span>
              <strong>{filteredWalletAssets.length}</strong>
            </div>
            {filteredWalletAssets.map((asset) => {
              const livePrice = prices[asset.ticker];
              const usdValue = typeof livePrice === 'number' ? asset.balance * livePrice : 0;

              return (
                <article className="wallet-asset-row" key={asset.ticker}>
                  <span className="asset-icon">
                    <img src={asset.icon} alt={`${asset.name} logo`} />
                  </span>
                  <div className="wallet-asset-name">
                    <strong>{asset.name}</strong>
                    <span>{asset.ticker}</span>
                  </div>
                  <div className="wallet-asset-balance">
                    <strong>{asset.ticker === 'BTC' ? formatBtc(asset.balance) : asset.balance.toFixed(5)} {asset.ticker}</strong>
                    <span>{asset.ticker === 'BTC' && usdValue ? formatUsd(usdValue) : formatUsd(0)}</span>
                    {asset.locked && <em>Locked</em>}
                  </div>
                </article>
              );
            })}
          </section>

          {withdrawNotice && (
            <div className="notice-backdrop" role="presentation" onClick={() => setWithdrawNotice('')}>
              <div className="notice-dialog" role="dialog" aria-modal="true" aria-label="Withdrawal status" onClick={(event) => event.stopPropagation()}>
                <span className="pill locked">
                  <LockKeyhole size={13} />
                  Locked
                </span>
                <h2>Withdrawal unavailable</h2>
                <p>{withdrawNotice}</p>
                <button type="button" onClick={() => setWithdrawNotice('')}>Got it</button>
              </div>
            </div>
          )}

          {bottomNav}
        </section>
      </main>
    );
  }

  if (view === 'details') {
    return (
      <main className="page-shell">
        <section className="phone" aria-label="BTC staking details">
          <header className="details-header">
            <button className="icon-button" type="button" aria-label="Back to staking dashboard" onClick={() => goTo('dashboard')}>
              <ArrowLeft size={22} />
            </button>
            <div>
              <span>Staking Details</span>
              <strong>Bitcoin</strong>
            </div>
            <span className="asset-icon detail-coin">
              <img src={btcIcon} alt="Bitcoin logo" />
            </span>
          </header>

          <section className="details-hero">
            <div className="lock-row">
              <span className="pill locked">
                <LockKeyhole size={13} />
                Locked
              </span>
              <span>{formatRate(primaryBtcRate)} APY</span>
            </div>
            <div className="details-balance">{formatBtc(staking.btcBalance)} BTC</div>
            <p>Locked until {unlockDate}</p>

            <div className="progress-block" aria-label={`${elapsedDays} of ${staking.totalDays} staking days completed`}>
              <div className="progress-label">
                <span>Staking progress</span>
                <strong>{Math.round(progress)}%</strong>
              </div>
              <div className="progress-track">
                <div style={{ width: `${progress}%` }} />
              </div>
            </div>
          </section>

          <section className="details-grid">
            <div>
              <span>Currently earned</span>
              <strong>{formatBtc(earnedRewards)} BTC</strong>
            </div>
            <div>
              <span>Rewards left</span>
              <strong>{formatBtc(estimatedBtcRewards)} BTC</strong>
            </div>
            <div>
              <span>Daily reward</span>
              <strong>{formatBtc(dailyBtcReward)} BTC</strong>
            </div>
            <div>
              <span>Total projected</span>
              <strong>{formatBtc(totalProjectedRewards)} BTC</strong>
            </div>
          </section>

          <section className="lock-card">
            <div className="lock-card-title">
              <div>
                <strong>{remainingDays} days left</strong>
                <span>{remainingLockTime} remaining</span>
              </div>
            </div>
            <div className="lock-timeline">
              <div>
                <span>Total period</span>
                <strong>{formatStakePeriod(staking.totalDays)}</strong>
              </div>
              <div>
                <span>Already staked</span>
                <strong>{elapsedDays} days</strong>
              </div>
              <div>
                <span>Unlock date</span>
                <strong>{unlockDate}</strong>
              </div>
            </div>
          </section>

          <section className="withdraw-card">
            <button className="withdraw-button" type="button" onClick={handleWithdraw}>
              Withdraw
            </button>
          </section>

          {withdrawNotice && (
            <div className="notice-backdrop" role="presentation" onClick={() => setWithdrawNotice('')}>
              <div className="notice-dialog" role="dialog" aria-modal="true" aria-label="Withdrawal status" onClick={(event) => event.stopPropagation()}>
                <span className="pill locked">
                  <LockKeyhole size={13} />
                  Locked
                </span>
                <h2>Withdrawal unavailable</h2>
                <p>{withdrawNotice}</p>
                <button type="button" onClick={() => setWithdrawNotice('')}>Got it</button>
              </div>
            </div>
          )}

          {bottomNav}
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <section className="phone" aria-label="BTC staking dashboard">
        <header className="search-row">
          <Search size={22} />
          <span>Search</span>
        </header>

        <button
          className="balance-card balance-card-button"
          type="button"
          onClick={() => goTo('details')}
        >
          <div className="card-title-row">
            <div className="title-wrap">
              <span>Staked BTC Balance</span>
              <Eye size={15} />
            </div>
            <ChevronRight size={20} />
          </div>

          <div className="btc-amount">{formatBtc(staking.btcBalance)} BTC</div>

          <div className="metric-grid">
            <div>
              <p>Total Period</p>
              <strong>{formatStakePeriod(staking.totalDays)}</strong>
            </div>
            <div>
              <p>Already Staked</p>
              <strong>{elapsedDays} days</strong>
            </div>
            <div>
              <p>Days Remaining</p>
              <strong>{remainingDays} days</strong>
            </div>
          </div>

          <div className="progress-block" aria-label={`${elapsedDays} of ${staking.totalDays} staking days completed`}>
            <div className="progress-label">
              <span>Staking progress</span>
              <strong>{Math.round(progress)}%</strong>
            </div>
            <div className="progress-track">
              <div style={{ width: `${progress}%` }} />
            </div>
          </div>
        </button>

        <section className="rewards-card">
          <div className="rewards-header">
            <span>Rewards</span>
            <span className="pill success">Live</span>
          </div>

          <div className="reward-stat primary">
            <Coins size={20} />
            <div>
              <p>Total 1-Year Rewards</p>
              <strong>{formatBtc(totalProjectedRewards)} BTC</strong>
            </div>
          </div>

          <div className="small-stats">
            <div>
              <Clock3 size={18} />
              <span>{formatBtc(estimatedBtcRewards)} BTC left</span>
            </div>
            <div>
              <TrendingUp size={18} />
              <span>{primaryBtcRate.toFixed(2)}% rate</span>
            </div>
          </div>
        </section>

        <section className="staking-list">
          <div className="list-top">
            <span className="pill muted">Available to Stake</span>
          </div>

          {assets.map((asset) => (
            <article className="asset-item" key={asset.ticker}>
              <button
                className="asset-row"
                type="button"
                aria-expanded={expandedTicker === asset.ticker}
                onClick={() => setExpandedTicker((current) => (current === asset.ticker ? '' : asset.ticker))}
              >
                <div className="asset-icon">
                  <img src={asset.icon} alt={`${asset.name} logo`} />
                </div>
                <div className="asset-name">
                  <strong>{asset.name}</strong>
                  <span>{asset.ticker}</span>
                </div>
                <div className="asset-rate">
                  <strong>{formatRate(asset.rate)}</strong>
                  <span>Rewards Rate</span>
                </div>
                <ChevronDown size={17} />
              </button>

              {expandedTicker === asset.ticker && (
                <div className="asset-details">
                  <div className="detail-summary">
                    <div>
                      <span>Daily estimate</span>
                      <strong>{formatBtc(estimateReward(asset.rate, 1))} {asset.ticker}</strong>
                    </div>
                    <div>
                      <span>Base balance</span>
                      <strong>{formatBtc(staking.btcBalance)} {asset.ticker}</strong>
                    </div>
                  </div>

                  <div className="term-grid" aria-label={`${asset.name} staking terms`}>
                    {stakingTerms.map((days) => {
                      const reward = estimateReward(asset.rate, days);
                      const total = staking.btcBalance + reward;

                      return (
                        <div className="term-card" key={days}>
                          <span>{days} days</span>
                          <strong>+{formatBtc(reward)} {asset.ticker}</strong>
                          <small>{formatBtc(total)} total</small>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </article>
          ))}
        </section>

        <section className="action-panel">
          <div>
            <span className="pill muted">Start Staking</span>
            <h2>BTC locked for 1 year</h2>
            <p>Day {elapsedDays} complete. {remainingDays} days remain on the locked balance.</p>
          </div>
          <ShieldCheck size={36} />
        </section>

        {bottomNav}
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
