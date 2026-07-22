/* ============== Slider ============== */
(function initSlider() {
  const slides = document.querySelectorAll('#slider .slide');
  const dots = document.querySelectorAll('#sliderDots .slider-dot');
  const prev = document.getElementById('slidePrev');
  const next = document.getElementById('slideNext');
  if (!slides.length) return;
  let idx = 0;
  let timer;
  function go(i) {
    idx = (i + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('active', k === idx));
    dots.forEach((d, k) => d.classList.toggle('active', k === idx));
  }
  function autoplay() {
    clearInterval(timer);
    timer = setInterval(() => go(idx + 1), 5000);
  }
  prev.addEventListener('click', () => { go(idx - 1); autoplay(); });
  next.addEventListener('click', () => { go(idx + 1); autoplay(); });
  dots.forEach(d => d.addEventListener('click', () => { go(+d.dataset.i); autoplay(); }));
  autoplay();
})();

/* ============== Benchmark table — exact numbers from paper Table 1 ============== */
// Eval-Car-Train (top): T_C→C, T_C→L, T_C→S
const ROWS = [
  // Eval-Car-Train: exact values from Table 1.
  { method: "DepthSplat (12v)", fam: "feed-fwd", tr: "V_C", te: "T_C→C", psnr: 18.05, ssim: 0.33, lpips: 0.28 },
  { method: "DepthSplat (12v)", fam: "feed-fwd", tr: "V_C", te: "T_C→L", psnr: 17.13, ssim: 0.31, lpips: 0.36 },
  { method: "DepthSplat (12v)", fam: "feed-fwd", tr: "V_C", te: "T_C→S", psnr: 14.39, ssim: 0.25, lpips: 0.40 },
  { method: "MonoSplat (12v)", fam: "feed-fwd", tr: "V_C", te: "T_C→C", psnr: 18.43, ssim: 0.42, lpips: 0.26 },
  { method: "MonoSplat (12v)", fam: "feed-fwd", tr: "V_C", te: "T_C→L", psnr: 18.24, ssim: 0.38, lpips: 0.29 },
  { method: "MonoSplat (12v)", fam: "feed-fwd", tr: "V_C", te: "T_C→S", psnr: 15.71, ssim: 0.28, lpips: 0.33 },
  { method: "MVSplat (12v)", fam: "feed-fwd", tr: "V_C", te: "T_C→C", psnr: 16.33, ssim: 0.42, lpips: 0.44 },
  { method: "MVSplat (12v)", fam: "feed-fwd", tr: "V_C", te: "T_C→L", psnr: 14.08, ssim: 0.38, lpips: 0.45 },
  { method: "MVSplat (12v)", fam: "feed-fwd", tr: "V_C", te: "T_C→S", psnr: 12.88, ssim: 0.35, lpips: 0.54 },
  { method: "DroneSplat", fam: "dynamic", tr: "V_C", te: "T_C→C", psnr: 21.25, ssim: 0.74, lpips: 0.45 },
  { method: "DroneSplat", fam: "dynamic", tr: "V_C", te: "T_C→L", psnr: 19.50, ssim: 0.70, lpips: 0.45 },
  { method: "DroneSplat", fam: "dynamic", tr: "V_C", te: "T_C→S", psnr: 17.19, ssim: 0.67, lpips: 0.48 },
  { method: "3DGS", fam: "static", tr: "V_C", te: "T_C→C", psnr: 24.22, ssim: 0.71, lpips: 0.38 },
  { method: "3DGS", fam: "static", tr: "V_C", te: "T_C→L", psnr: 22.52, ssim: 0.69, lpips: 0.39 },
  { method: "3DGS", fam: "static", tr: "V_C", te: "T_C→S", psnr: 16.78, ssim: 0.64, lpips: 0.47 },
  { method: "NeRF", fam: "static", tr: "V_C", te: "T_C→C", psnr: 20.93, ssim: 0.64, lpips: 0.42 },
  { method: "NeRF", fam: "static", tr: "V_C", te: "T_C→L", psnr: 19.38, ssim: 0.58, lpips: 0.47 },
  { method: "NeRF", fam: "static", tr: "V_C", te: "T_C→S", psnr: 15.73, ssim: 0.52, lpips: 0.59 },
  { method: "DesireGS", fam: "dynamic", tr: "V_C", te: "T_C→C", psnr: 25.96, ssim: 0.69, lpips: 0.23 },
  { method: "DesireGS", fam: "dynamic", tr: "V_C", te: "T_C→L", psnr: 24.31, ssim: 0.61, lpips: 0.31 },
  { method: "DesireGS", fam: "dynamic", tr: "V_C", te: "T_C→S", psnr: 19.48, ssim: 0.55, lpips: 0.34 },
  { method: "PVG", fam: "dynamic", tr: "V_C", te: "T_C→C", psnr: 27.01, ssim: 0.72, lpips: 0.20 },
  { method: "PVG", fam: "dynamic", tr: "V_C", te: "T_C→L", psnr: 25.44, ssim: 0.64, lpips: 0.28 },
  { method: "PVG", fam: "dynamic", tr: "V_C", te: "T_C→S", psnr: 20.23, ssim: 0.58, lpips: 0.31 },

  // Eval-Drone-Train: exact values from Table 1.
  { method: "DepthSplat (12v)", fam: "feed-fwd", tr: "V_D", te: "T_D→D", psnr: 16.78, ssim: 0.49, lpips: 0.45 },
  { method: "DepthSplat (12v)", fam: "feed-fwd", tr: "V_D", te: "T_D→C", psnr: 9.09, ssim: 0.16, lpips: 0.52 },
  { method: "DepthSplat (12v)", fam: "feed-fwd", tr: "V_D", te: "T_D→S", psnr: 7.87, ssim: 0.14, lpips: 0.56 },
  { method: "MonoSplat (12v)", fam: "feed-fwd", tr: "V_D", te: "T_D→D", psnr: 18.54, ssim: 0.38, lpips: 0.47 },
  { method: "MonoSplat (12v)", fam: "feed-fwd", tr: "V_D", te: "T_D→C", psnr: 10.21, ssim: 0.25, lpips: 0.49 },
  { method: "MonoSplat (12v)", fam: "feed-fwd", tr: "V_D", te: "T_D→S", psnr: 8.32, ssim: 0.23, lpips: 0.52 },
  { method: "MVSplat (12v)", fam: "feed-fwd", tr: "V_D", te: "T_D→D", psnr: 16.50, ssim: 0.37, lpips: 0.54 },
  { method: "MVSplat (12v)", fam: "feed-fwd", tr: "V_D", te: "T_D→C", psnr: 9.20, ssim: 0.20, lpips: 0.54 },
  { method: "MVSplat (12v)", fam: "feed-fwd", tr: "V_D", te: "T_D→S", psnr: 7.06, ssim: 0.18, lpips: 0.56 },
  { method: "DroneSplat", fam: "dynamic", tr: "V_D", te: "T_D→D", psnr: 16.43, ssim: 0.53, lpips: 0.64 },
  { method: "DroneSplat", fam: "dynamic", tr: "V_D", te: "T_D→C", psnr: 12.16, ssim: 0.51, lpips: 0.71 },
  { method: "DroneSplat", fam: "dynamic", tr: "V_D", te: "T_D→S", psnr: 12.33, ssim: 0.50, lpips: 0.72 },
  { method: "3DGS", fam: "static", tr: "V_D", te: "T_D→D", psnr: 29.13, ssim: 0.86, lpips: 0.22 },
  { method: "3DGS", fam: "static", tr: "V_D", te: "T_D→C", psnr: 10.36, ssim: 0.44, lpips: 0.52 },
  { method: "3DGS", fam: "static", tr: "V_D", te: "T_D→S", psnr: 11.42, ssim: 0.43, lpips: 0.46 },
  { method: "NeRF", fam: "static", tr: "V_D", te: "T_D→D", psnr: 21.30, ssim: 0.65, lpips: 0.67 },
  { method: "NeRF", fam: "static", tr: "V_D", te: "T_D→C", psnr: 11.01, ssim: 0.34, lpips: 0.56 },
  { method: "NeRF", fam: "static", tr: "V_D", te: "T_D→S", psnr: 11.54, ssim: 0.35, lpips: 0.61 },
  { method: "DesireGS", fam: "dynamic", tr: "V_D", te: "T_D→D", psnr: 26.84, ssim: 0.76, lpips: 0.40 },
  { method: "DesireGS", fam: "dynamic", tr: "V_D", te: "T_D→C", psnr: 12.01, ssim: 0.44, lpips: 0.60 },
  { method: "DesireGS", fam: "dynamic", tr: "V_D", te: "T_D→S", psnr: 13.05, ssim: 0.43, lpips: 0.55 },
  { method: "PVG", fam: "dynamic", tr: "V_D", te: "T_D→D", psnr: 28.12, ssim: 0.80, lpips: 0.37 },
  { method: "PVG", fam: "dynamic", tr: "V_D", te: "T_D→C", psnr: 12.65, ssim: 0.47, lpips: 0.57 },
  { method: "PVG", fam: "dynamic", tr: "V_D", te: "T_D→S", psnr: 13.82, ssim: 0.46, lpips: 0.52 },
];

const TABS = {
  car: { label: "Eval-Car-Train", filter: r => r.tr === "V_C", sort: "psnr", asc: false },
  drone: { label: "Eval-Drone-Train", filter: r => r.tr === "V_D", sort: "psnr", asc: false },
};

const COL_DEF = {
  rank:   { label: "#",       help: "",                  num: false, sortable: false },
  method: { label: "Method",  help: "approach",          num: false, sortable: false },
  fam:    { label: "Type",    help: "category",          num: false, sortable: false },
  te:     { label: "Test set",help: "X→Y",               num: false, sortable: false },
  psnr:   { label: "PSNR ↑",  help: "pixel, dB",         num: true,  sortable: true,  asc: false },
  ssim:   { label: "SSIM ↑",  help: "structural",        num: true,  sortable: true,  asc: false },
  lpips:  { label: "LPIPS ↓", help: "perceptual",        num: true,  sortable: true,  asc: true  },
};

(function initBench() {
  const tabsEl = document.getElementById('benchTabs');
  const table = document.getElementById('benchTable');
  const filterFam = document.getElementById('filterFam');
  const filterTe = document.getElementById('filterTe');
  const filterSearch = document.getElementById('filterSearch');
  const benchCount = document.getElementById('benchCount');
  if (!table) return;

  let activeTab = "car";
  let sortKey = "psnr";
  let sortAsc = false;

  // populate filters
  const uniq = (k) => Array.from(new Set(ROWS.map(r => r[k])));
  uniq("fam").forEach(v => filterFam.insertAdjacentHTML('beforeend', `<option>${v}</option>`));
  // test sets — populated dynamically per tab
  function syncTestFilter() {
    filterTe.innerHTML = '<option value="all">all</option>';
    const tests = Array.from(new Set(ROWS.filter(TABS[activeTab].filter).map(r => r.te)));
    tests.forEach(v => filterTe.insertAdjacentHTML('beforeend', `<option>${v}</option>`));
  }
  syncTestFilter();

  function tagFor(fam) {
    const map = { "baseline": "tag-dist", "feed-fwd": "tag-ssl", "static": "tag-sup", "dynamic": "tag-vla" };
    return `<span class="tag-train ${map[fam] || 'tag-sup'}">${fam}</span>`;
  }

  const cols = ["rank", "method", "fam", "te", "psnr", "ssim", "lpips"];

  function render() {
    const tab = TABS[activeTab];
    let rows = ROWS.filter(tab.filter);
    const fam = filterFam.value, tev = filterTe.value;
    const q = filterSearch.value.trim().toLowerCase();
    if (fam !== "all") rows = rows.filter(r => r.fam === fam);
    if (tev !== "all") rows = rows.filter(r => r.te === tev);
    if (q) rows = rows.filter(r => r.method.toLowerCase().includes(q));

    if (sortKey && COL_DEF[sortKey].num) {
      rows = [...rows].sort((a, b) => (a[sortKey] - b[sortKey]) * (sortAsc ? 1 : -1));
    }

    // best per (test-set, metric) — so each test-column has its own winner
    const bestByTest = {};
    rows.forEach(r => {
      if (!bestByTest[r.te]) bestByTest[r.te] = {};
      ["psnr", "ssim", "lpips"].forEach(k => {
        const asc = COL_DEF[k].asc;
        if (bestByTest[r.te][k] === undefined) bestByTest[r.te][k] = r[k];
        else bestByTest[r.te][k] = asc ? Math.min(bestByTest[r.te][k], r[k]) : Math.max(bestByTest[r.te][k], r[k]);
      });
    });

    let thead = "<tr>";
    cols.forEach(c => {
      const def = COL_DEF[c];
      const sortable = def.sortable;
      const sorted = sortKey === c;
      const ind = sortable ? `<span class="sort-ind">${sorted ? (sortAsc ? "▲" : "▼") : "↕"}</span>` : "";
      thead += `<th data-col="${c}" class="${sorted ? 'sorted' : ''}" ${sortable ? 'data-sortable="1"' : ''}>${def.label}${ind}${def.help ? `<span class="col-help">${def.help}</span>` : ""}</th>`;
    });
    thead += "</tr>";
    table.querySelector('thead').innerHTML = thead;

    let tbody = "";
    if (!rows.length) {
      tbody = `<tr><td colspan="${cols.length}" style="text-align:center; padding:36px; color:#8b94a8;">No entries match.</td></tr>`;
    } else {
      rows.forEach((r, i) => {
        let tr = "<tr>";
        cols.forEach(c => {
          if (c === "rank") tr += `<td class="mono-cell">${String(i + 1).padStart(2, '0')}</td>`;
          else if (c === "method") tr += `<td class="name-cell">${r.method}</td>`;
          else if (c === "fam") tr += `<td>${tagFor(r.fam)}</td>`;
          else if (c === "te") tr += `<td class="mono-cell">${r.te}</td>`;
          else {
            const v = r[c];
            const isBest = bestByTest[r.te] && v === bestByTest[r.te][c];
            const fmt = (c === "psnr") ? v.toFixed(2) : v.toFixed(2);
            tr += `<td class="num-cell ${isBest ? 'best' : ''}">${fmt}</td>`;
          }
        });
        tr += "</tr>";
        tbody += tr;
      });
    }
    table.querySelector('tbody').innerHTML = tbody;
    benchCount.textContent = `${rows.length} ${rows.length === 1 ? 'entry' : 'entries'}`;

    table.querySelectorAll('thead th[data-sortable]').forEach(th => {
      th.addEventListener('click', () => {
        const c = th.dataset.col;
        if (sortKey === c) sortAsc = !sortAsc;
        else { sortKey = c; sortAsc = COL_DEF[c].asc; }
        render();
      });
    });
  }

  tabsEl.querySelectorAll('.bench-tab').forEach(t => {
    t.addEventListener('click', () => {
      tabsEl.querySelectorAll('.bench-tab').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      activeTab = t.dataset.tab;
      sortKey = TABS[activeTab].sort;
      sortAsc = TABS[activeTab].asc;
      syncTestFilter();
      render();
    });
  });

  [filterFam, filterTe].forEach(el => el.addEventListener('change', render));
  filterSearch.addEventListener('input', render);

  render();
})();

/* ============== Copy bib ============== */
(function copyBib() {
  const btn = document.getElementById('copyBib');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const text = document.getElementById('bib').innerText;
    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = "copied ✓";
      setTimeout(() => btn.textContent = "copy", 1500);
    });
  });
})();


/* ============== Samples scene tabs ============== */
(function initSamples() {
  const tabs = document.querySelectorAll('#sceneTabs .samples-tab');
  const meta = document.getElementById('sceneMeta');
  const sampleImages = document.querySelectorAll('#samplesGrid img[data-sample]');
  const SCENES = {
    seq10: {
      meta: 'frame 000010 · car + scooty + drone synchronized',
      car: 'assets/images/seq10_car_front_000010.jpg',
      scooty: 'assets/images/seq10_scooty_front_000010.jpg',
      drone: 'assets/images/seq10_drone_000010.jpg',
    },
    seq12: {
      meta: 'frame 000010 · car + scooty + drone synchronized',
      car: 'assets/images/seq12_car_front_000010.jpg',
      scooty: 'assets/images/seq12_scooty_front_000010.jpg',
      drone: 'assets/images/seq12_drone_000010.jpg',
    },
    seq37: {
      meta: 'frame 000010 · car + scooty + drone synchronized',
      car: 'assets/images/seq37_car_front_000010.jpg',
      scooty: 'assets/images/seq37_scooty_front_000010.jpg',
      drone: 'assets/images/seq37_drone_000010.jpg',
    },
  };
  if (!tabs.length) return;

  function setScene(scene) {
    const data = SCENES[scene];
    if (!data) return;
    if (meta) meta.textContent = data.meta;
    sampleImages.forEach(img => {
      const key = img.dataset.sample;
      const nextSrc = data[key];
      if (!nextSrc) return;
      img.src = nextSrc;
      img.alt = `${scene} ${key} sample frame 000010`;
    });
  }

  tabs.forEach(t => t.addEventListener('click', () => {
    tabs.forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    setScene(t.dataset.scene);
  }));

  const lightbox = document.createElement('div');
  lightbox.className = 'sample-lightbox';
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.innerHTML = '<button type="button" class="sample-lightbox-close" aria-label="Close preview">×</button><img alt=""><span class="sample-lightbox-caption"></span>';
  document.body.appendChild(lightbox);
  const lightboxImg = lightbox.querySelector('img');
  const lightboxCaption = lightbox.querySelector('.sample-lightbox-caption');
  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.removeAttribute('src');
  };
  sampleImages.forEach(img => {
    img.tabIndex = 0;
    img.addEventListener('click', () => {
      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = img.closest('.sample-tile')?.querySelector('.sample-cap-name')?.textContent || img.alt;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
    });
    img.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        img.click();
      }
    });
  });
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox || e.target.classList.contains('sample-lightbox-close')) closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });
  setScene(Array.from(tabs).find(tab => tab.classList.contains('active'))?.dataset.scene || 'seq10');
})();

/* ============== Viewer scene state ============== */
(function initViewer() {
  const sceneTabs = document.querySelectorAll('#viewerTabs .viewer-tab');
  const camTabs = document.querySelectorAll('#viewerCams .viewer-cam');
  const rvScene = document.getElementById('rvScene');
  const rvCam = document.getElementById('rvCam');
  const iframe = document.getElementById('splatViewer');
  const SCENES = {
    seq10: { label: 'seq10', query: 'seq10' },
    seq12: { label: 'seq12', query: 'seq12' },
    seq37: { label: 'seq37', query: 'seq37' },
  };
  const CAMS = {
    V_C: 'V_C · car forward',
    V_S: 'V_S · scooty forward',
    V_D: 'V_D · drone aerial',
    free: 'free orbit',
  };
  let activeScene = Array.from(sceneTabs).find(tab => tab.classList.contains('active'))?.dataset.vscene || 'seq10';
  let activeCam = Array.from(camTabs).find(tab => tab.classList.contains('active'))?.dataset.cam || 'free';

  function syncViewer() {
    const scene = SCENES[activeScene] || SCENES.seq10;
    if (rvScene) rvScene.textContent = scene.label;
    if (rvCam) rvCam.textContent = CAMS[activeCam] || CAMS.free;
    if (iframe) {
      const params = new URLSearchParams({
        scene: scene.query,
        cam: activeCam,
      });
      const nextSrc = `3dgs-viewer.html?v=8&${params.toString()}`;
      if (iframe.getAttribute('src') !== nextSrc) iframe.setAttribute('src', nextSrc);
    }
  }

  sceneTabs.forEach(t => t.addEventListener('click', () => {
    sceneTabs.forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    activeScene = t.dataset.vscene || activeScene;
    syncViewer();
  }));

  camTabs.forEach(t => t.addEventListener('click', () => {
    camTabs.forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    activeCam = t.dataset.cam || activeCam;
    syncViewer();
  }));

  syncViewer();
})();
