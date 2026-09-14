// Single source of truth for links/handles/token facts. Every value here should be
// independently verifiable on Basescan/Dexscreener — this page's whole pitch is receipts.
const JENSEN = {
  name: "JENSEN",
  ticker: "JENSEN",
  chain: "base",
  chainId: 8453,
  standard: "ERC-20",
  decimals: 18,
  totalSupply: "100,000,000,000",
  ca: "0x84856D2a71e5D47535AC58B57729351766e89ba3",
  poolId: "0xf3f004a3cdd48f6d7cb3176712a203de15017114d5eeb00921a05b022bd39851",
  poolManager: "0x498581fF718922c3f8e6A244956aF099B2652b2b",
  hookAddress: "0xBDF938149ac6a781F94FAa0ed45E6A0e984c6544",

  nvdac: {
    ca: "0xb20000000000000000000078ee7ce2fE4908108C",
    decimals: 8,
  },

  deployDate: "11 Sep 2026",
  launchMechanism: "Bankr scheduled multicurve, Uniswap v4",
  launchTx: "0x3d5d60e1ed09775ea13ffc6d8bfb7d2596ef5157778cee8eb649c818033bdb8b",

  // Verified directly from the launch tx's event log on Basescan (not the generic
  // Bankr default) — see VestingScheduleCreated / VestingAllocated / Transfer events.
  supplyToPool: "85,000,000,000",
  supplyToPoolPct: "85%",
  vestedAmount: "15,000,000,000",
  vestedPct: "15%",
  vestBeneficiary: "0xc59b0c072f73ceEA3Dc354031165501c0Ff25023",
  vestCliffDays: 30,
  vestDurationDays: 365,

  telegram: "https://t.me/jensenonbase",
  twitter: "https://x.com/hryhorii77",
  // Real posts only — each URL is embedded live via X's own widget, not a screenshot.
  // Add more as they come in; leave empty and the "no wall yet" message shows instead.
  communityPosts: ["https://x.com/hryhorii77/status/2099261384890388591"],
  afterbookUrl: "https://afterbook-lake.vercel.app",
  bankrUrl: "https://bankr.bot/",
};

JENSEN.basescanToken = `https://basescan.org/token/${JENSEN.ca}`;
JENSEN.basescanLaunchTx = `https://basescan.org/tx/${JENSEN.launchTx}`;
JENSEN.basescanNvdac = `https://basescan.org/token/${JENSEN.nvdac.ca}`;
JENSEN.basescanVestBeneficiary = `https://basescan.org/address/${JENSEN.vestBeneficiary}`;
JENSEN.basescanPoolManager = `https://basescan.org/address/${JENSEN.poolManager}`;
JENSEN.dexscreenerUrl = `https://dexscreener.com/${JENSEN.chain}/${JENSEN.poolId}`;
JENSEN.dexscreenerTokenUrl = `https://dexscreener.com/${JENSEN.chain}/${JENSEN.ca}`;
// Dexscreener's own chart panel gets stuck on "Loading pair..." for this specific
// pool (confirmed on dexscreener.com itself, not an embed-only issue) — GeckoTerminal
// renders real candles for the same pool, so that's what's actually embedded.
JENSEN.chartEmbedUrl = `https://www.geckoterminal.com/${JENSEN.chain}/pools/${JENSEN.poolId}?embed=1&info=0&swaps=0`;
// This pool is JENSEN/NVDAc, not JENSEN/WETH — routing without an explicit
// inputCurrency lets Uniswap default to WETH and often fails to find a route.
JENSEN.uniswapUrl = `https://app.uniswap.org/swap?outputCurrency=${JENSEN.ca}&inputCurrency=${JENSEN.nvdac.ca}&chain=${JENSEN.chain}`;
// Primary buy CTA goes to the Dexscreener pair page first — it shows the correct
// pair before anyone routes into a swap, so people don't land on the wrong pool.
JENSEN.buyUrl = JENSEN.dexscreenerUrl;
