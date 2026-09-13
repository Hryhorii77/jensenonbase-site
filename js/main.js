function fmtUsd(n) {
  if (n === null || n === undefined || isNaN(n)) return "—";
  if (n >= 1e6) return "$" + (n / 1e6).toFixed(2) + "M";
  if (n >= 1e3) return "$" + (n / 1e3).toFixed(1) + "K";
  return "$" + n.toFixed(2);
}

function fmtPrice(n) {
  if (n === null || n === undefined || isNaN(n)) return "—";
  if (n === 0) return "$0.00";
  if (n >= 1) return "$" + n.toFixed(4);
  // Show enough leading decimals to see the first significant digits, no exponent notation.
  const decimals = Math.min(20, Math.ceil(-Math.log10(n)) + 3);
  return "$" + n.toFixed(decimals);
}

async function loadTicker() {
  const mcEl = document.getElementById("tick-mc");
  const liqEl = document.getElementById("tick-liq");
  const volEl = document.getElementById("tick-vol");
  const priceEl = document.getElementById("tick-price");
  if (!mcEl) return;
  try {
    const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${JENSEN.ca}`);
    const data = await res.json();
    const pairs = (data && data.pairs) || [];
    if (!pairs.length) return;
    const pair = pairs.sort((a, b) => (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0))[0];
    mcEl.textContent = fmtUsd(pair.fdv || pair.marketCap);
    liqEl.textContent = fmtUsd(pair.liquidity?.usd);
    volEl.textContent = fmtUsd(pair.volume?.h24);
    priceEl.textContent = fmtPrice(pair.priceUsd ? Number(pair.priceUsd) : null);
  } catch (e) {
    // leave placeholders as "—"; no live data yet
  }
}

function wireSocials() {
  const tg = document.querySelectorAll("[data-tg]");
  const tw = document.querySelectorAll("[data-tw]");
  tg.forEach((el) => {
    if (JENSEN.telegram) {
      el.href = JENSEN.telegram;
      el.classList.remove("btn-disabled");
      el.classList.add("btn-ghost");
      el.removeAttribute("aria-disabled");
      el.textContent = el.textContent.replace(/\s*—\s*soon$/i, "").trim();
    } else {
      el.addEventListener("click", (e) => e.preventDefault());
    }
  });
  tw.forEach((el) => {
    if (JENSEN.twitter) {
      el.href = JENSEN.twitter;
      el.classList.remove("btn-disabled");
      el.classList.add("btn-ghost");
      el.removeAttribute("aria-disabled");
      el.textContent = el.textContent.replace(/\s*—\s*soon$/i, "").trim();
    } else {
      el.addEventListener("click", (e) => e.preventDefault());
    }
  });
}

function wireLinks() {
  document.querySelectorAll("[data-buy]").forEach((el) => (el.href = JENSEN.uniswapUrl));
  document.querySelectorAll("[data-basescan]").forEach((el) => (el.href = JENSEN.basescanToken));
  document.querySelectorAll("[data-dex]").forEach((el) => (el.href = JENSEN.dexscreenerUrl));
  document.querySelectorAll("[data-dex-token]").forEach((el) => (el.href = JENSEN.dexscreenerTokenUrl));
  document.querySelectorAll("[data-afterbook]").forEach((el) => (el.href = JENSEN.afterbookUrl));
  document.querySelectorAll("[data-launch-tx]").forEach((el) => (el.href = JENSEN.basescanLaunchTx));
  document.querySelectorAll("[data-nvdac]").forEach((el) => (el.href = JENSEN.basescanNvdac));
  document.querySelectorAll("[data-bankr]").forEach((el) => (el.href = JENSEN.bankrUrl));
  document.querySelectorAll("[data-vest-addr]").forEach((el) => (el.href = JENSEN.basescanVestBeneficiary));
  document.querySelectorAll("[data-pool-manager]").forEach((el) => (el.href = JENSEN.basescanPoolManager));
  document.querySelectorAll("[data-ca-text]").forEach((el) => (el.textContent = JENSEN.ca));
}

function wireDataRowCopy() {
  document.querySelectorAll(".data-row").forEach((row) => {
    const valueEl = row.querySelector(".dr-value");
    const btn = row.querySelector(".copy-btn");
    if (!valueEl || !btn) return;
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(valueEl.textContent.trim());
        const original = btn.textContent;
        btn.textContent = "Copied";
        setTimeout(() => (btn.textContent = original), 1500);
      } catch (e) {
        /* clipboard unavailable */
      }
    });
  });
}

function wireCopyButton() {
  const btn = document.getElementById("copy-ca");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(JENSEN.ca);
      const original = btn.textContent;
      btn.textContent = "Copied";
      setTimeout(() => (btn.textContent = original), 1500);
    } catch (e) {
      /* clipboard unavailable */
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  wireLinks();
  wireSocials();
  wireCopyButton();
  wireDataRowCopy();
  loadTicker();
});
