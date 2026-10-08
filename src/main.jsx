import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "../styles.css";

const chartPeriods = {
  week: {
    total: "₹12,84,000",
    change: "18.6%",
    axis: ["₹4L", "₹3L", "₹2L", "₹1L", "₹0"],
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    values: [125000, 158000, 142000, 225000, 176000, 264000, 194000],
    max: 400000,
  },
  month: {
    total: "₹48,29,400",
    change: "14.8%",
    axis: ["₹7L", "₹5.25L", "₹3.5L", "₹1.75L", "₹0"],
    labels: ["1–3", "4–6", "7–9", "10–12", "13–15", "16–18", "19–21", "22–24", "25–27", "28–31"],
    values: [420000, 480000, 390000, 520000, 450000, 610000, 430000, 570000, 459400, 500000],
    max: 700000,
  },
  year: {
    total: "₹5,26,82,000",
    change: "22.3%",
    axis: ["₹75L", "₹56.25L", "₹37.5L", "₹18.75L", "₹0"],
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    values: [3300000, 3700000, 4050000, 3850000, 4480000, 4690000, 4270000, 5100000, 4930000, 5660000, 5250000, 3402000],
    max: 7500000,
  },
};

const topProducts = [
  { name: "Nova Pro Max", category: "Smartphones", revenue: "₹1,24,80,000", sold: 124, icon: "phone", tone: "lime", progress: 82 },
  { name: "AirBeat Pro", category: "Audio", revenue: "₹8,64,000", sold: 108, icon: "headphones", tone: "blue", progress: 64 },
  { name: "PowerBank 20K", category: "Accessories", revenue: "₹5,25,000", sold: 105, icon: "battery", tone: "peach", progress: 49 },
  { name: "Nova Lite", category: "Smartphones", revenue: "₹4,95,000", sold: 45, icon: "phone", tone: "purple", progress: 38 },
  { name: "FastCharge 30W", category: "Accessories", revenue: "₹3,20,000", sold: 80, icon: "charger", tone: "yellow", progress: 27 },
];

const initialOrders = [
  { id: "#TL-2847", name: "Alex Morgan", email: "alex.morgan@email.com", initials: "AM", tone: "lilac", date: "Oct 08, 2026", products: <>Nova Pro Max <span className="more-products">+1</span></>, amount: "₹1,24,800.00", status: "Delivered" },
  { id: "#TL-2846", name: "Jamie Taylor", email: "jamie.t@email.com", initials: "JT", tone: "peach", date: "Oct 08, 2026", products: "AirBeat Pro", amount: "₹17,900.00", status: "Processing" },
  { id: "#TL-2845", name: "Sam Patel", email: "sam.patel@email.com", initials: "SP", tone: "mint", date: "Oct 07, 2026", products: <>PowerBank 20K <span className="more-products">+2</span></>, amount: "₹24,500.00", status: "Shipped" },
  { id: "#TL-2844", name: "Lee Chen", email: "lee.chen@email.com", initials: "LC", tone: "blue", date: "Oct 07, 2026", products: "Nova Lite", amount: "₹54,900.00", status: "Delivered" },
  { id: "#TL-2843", name: "Riley Kim", email: "riley.kim@email.com", initials: "RK", tone: "yellow", date: "Oct 06, 2026", products: "FastCharge 30W", amount: "₹3,900.00", status: "Cancelled" },
];

function Icon({ name, className = "" }) {
  return <svg className={className} aria-hidden="true"><use href={`#i-${name}`} /></svg>;
}

function IconLibrary() {
  const icons = {
    grid: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></>,
    box: <><path d="m12 3 9 5v9l-9 5-9-5V8l9-5Z" /><path d="m3.5 8.5 8.5 5 8.5-5M12 13.5V22M7.5 5.5l9 5" /></>,
    orders: <><path d="M8 4h12v17H5V7l3-3Z" /><path d="M8 4v4H5m4 4h7m-7 4h7" /></>,
    users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.8 20c.5-3.5 2.6-5.2 6.2-5.2s5.7 1.7 6.2 5.2M16 5a3.5 3.5 0 0 1 0 6.8m2.2 3c1.8.6 2.8 2.3 3 5.2" /></>,
    chart: <path d="M3 3v18h18M7 14l4-4 4 3 6-7" />,
    settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.5-1.8-.6a8 8 0 0 1-1.6.9l-.4 1.9h-3l-.4-1.9a8 8 0 0 1-1.6-.9l-1.8.6-1.4-2.5 1.5-1.2a7 7 0 0 1 0-1.9l-1.5-1.2 1.4-2.5 1.8.6a8 8 0 0 1 1.6-.9l.4-1.9h3l.4 1.9a8 8 0 0 1 1.6.9l1.8-.6 1.4 2.5-1.5 1.2a7 7 0 0 1 0 1.9Z" transform="translate(-1 -1)" /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
    bell: <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 13h4" />,
    phone: <><rect x="6" y="2" width="12" height="20" rx="2.5" /><path d="M10 5h4m-3 14h2" /></>,
    headphones: <><path d="M3 14v-3a9 9 0 0 1 18 0v3" /><rect x="3" y="13" width="5" height="8" rx="2" /><rect x="16" y="13" width="5" height="8" rx="2" /></>,
    battery: <><rect x="3" y="7" width="17" height="10" rx="2" /><path d="M23 10v4m-15-5-2 4h4l-1 3 4-5h-4l1-2" /></>,
    charger: <path d="M7 8V3m10 5V3M5 8h14v3a7 7 0 0 1-7 7v3m-4-13v3a4 4 0 0 0 8 0V8" />,
    "arrow-up": <path d="M7 17 17 7M7 7h10v10" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    download: <path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4" />,
  };

  return (
    <svg className="icon-library" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {Object.entries(icons).map(([name, paths]) => <symbol key={name} id={`i-${name}`} viewBox="0 0 24 24">{paths}</symbol>)}
    </svg>
  );
}

function Brand() {
  return (
    <a className="brand" href="#dashboard" aria-label="TechLite dashboard home">
      <span className="brand-mark"><svg viewBox="0 0 36 36" fill="none" aria-hidden="true"><rect x="8" y="4" width="20" height="28" rx="6" stroke="currentColor" strokeWidth="2.2" /><path d="M14 8h8m-5 19h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><circle cx="29" cy="9" r="4" fill="#B8EE65" /></svg></span>
      <span className="brand-name">Tech<span>Lite</span><small>SMART MOBILE STORE</small></span>
    </a>
  );
}

function Sidebar({ open, activeNav, setActiveNav, close, orderCount }) {
  const navItems = [
    ["dashboard", "Dashboard", "grid"],
    ["products", "Products", "box", "48"],
    ["orders", "Orders", "orders", orderCount],
    ["customers", "Customers", "users"],
    ["reports", "Reports", "chart"],
  ];

  return (
    <>
      <div className={`sidebar-backdrop${open ? " open" : ""}`} onClick={close} />
      <aside className={`sidebar${open ? " open" : ""}`}>
        <Brand />
        <div className="nav-caption">WORKSPACE</div>
        <nav className="sidebar-nav" aria-label="Main navigation">
          {navItems.map(([id, label, icon, count]) => (
            <a key={id} className={`nav-item${activeNav === id ? " active" : ""}`} href={`#${id}`} onClick={() => { setActiveNav(id); close(); }}>
              <Icon name={icon} /><span>{label}</span>{count && <span className={`nav-count${id === "orders" ? " order-count" : ""}`}>{count}</span>}
            </a>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card"><div className="help-spark">✳</div><strong>Need a hand?</strong><p>Our support team is always happy to help.</p><a href="mailto:support@techlite.example">Get support <span>→</span></a></div>
          <a className={`nav-item settings-link${activeNav === "settings" ? " active" : ""}`} href="#settings" onClick={() => { setActiveNav("settings"); close(); }}><Icon name="settings" /><span>Settings</span></a>
          <div className="sidebar-profile"><div className="profile-avatar">AD</div><div className="profile-copy"><strong>Admin</strong><small>Store administrator</small></div><span className="profile-menu" aria-hidden="true">···</span></div>
        </div>
      </aside>
    </>
  );
}

function Topbar({ openMenu, notify }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="icon-button menu-toggle" onClick={openMenu} type="button" aria-label="Open navigation"><Icon name="menu" /></button>
        <div className="breadcrumb"><span>Workspace</span><span className="crumb-slash">/</span><strong>Dashboard</strong></div>
      </div>
      <div className="topbar-actions">
        <div className="store-status"><span /> Store is live</div><span className="topbar-divider" />
        <button className="icon-button notification-button" onClick={() => notify("You’re all caught up on store notifications.")} type="button" aria-label="Notifications"><Icon name="bell" /><i /></button>
        <span className="topbar-divider profile-divider" />
        <button className="user-menu" onClick={() => notify("Signed in as Admin · Store administrator")} type="button" aria-label="Account: Admin"><span className="user-avatar">AD</span><span className="user-name">Admin</span><span className="chevron">⌄</span></button>
      </div>
    </header>
  );
}

function MetricCard({ label, value, note, trend, icon, tone, spark, sales }) {
  return (
    <article className={`metric-card${sales ? " sales-metric" : ""}`}>
      <div className="metric-top"><span className="metric-label">{label}</span><span className={`metric-icon icon-${tone}`}>{icon === "rupee" ? <span>₹</span> : <Icon name={icon} />}</span></div>
      <div className="metric-value">{value}{sales && <span className="decimal">.00</span>}</div>
      <div className="metric-foot"><span className="trend-pill"><Icon name="arrow-up" /> {trend}</span><span>vs. last month</span><span className="metric-note">{note}</span></div>
      <div className={`metric-sparkline spark-${spark}`} aria-hidden="true"><svg viewBox="0 0 114 33" preserveAspectRatio="none"><path d="M1 27 C13 22 15 24 24 19S37 25 47 16s15 8 26 0 14 5 24-4 10-1 16-9 9 4 15-1" /></svg></div>
    </article>
  );
}

function Metrics() {
  return (
    <section className="metrics-grid" aria-label="Store summary">
      <MetricCard label="Total products" value="248" note="12 added this month" trend="12.5%" icon="box" tone="lime" spark="lime" />
      <MetricCard label="Total orders" value="1,429" note="64 orders this week" trend="8.2%" icon="orders" tone="blue" spark="blue" />
      <MetricCard label="Total customers" value="892" note="37 new customers" trend="6.4%" icon="users" tone="peach" spark="peach" />
      <MetricCard label="Total sales" value="₹5,26,82,000" note="+₹6,23,000 this month" trend="14.8%" icon="rupee" tone="purple" spark="purple" sales />
    </section>
  );
}

function SalesChart() {
  const [period, setPeriod] = useState("week");
  const [hovered, setHovered] = useState(null);
  const data = chartPeriods[period];
  const points = useMemo(() => data.values.map((value, index) => ({
    x: 4 + (index / (data.values.length - 1)) * 709,
    y: 8 + 228 - (value / data.max) * 228,
    value,
    label: data.labels[index],
  })), [data]);
  const baseline = 236;
  const linePoints = points.map(({ x, y }) => `${x},${y}`).join(" ");
  const areaPath = `M ${points[0].x} ${baseline} L ${points.map(({ x, y }) => `${x} ${y}`).join(" L ")} L ${points.at(-1).x} ${baseline} Z`;

  return (
    <article className="panel sales-panel">
      <div className="panel-heading">
        <div><span className="panel-kicker">SALES OVERVIEW</span><h2>Sales performance</h2><p>Track your store revenue over time.</p></div>
        <label className="period-select-wrap"><select value={period} onChange={(event) => { setPeriod(event.target.value); setHovered(null); }} aria-label="Sales chart period"><option value="week">This week</option><option value="month">This month</option><option value="year">This year</option></select><span>⌄</span></label>
      </div>
      <div className="chart-summary"><strong>{data.total}</strong><span><span className="change-arrow">↗</span> {data.change} <span className="change-muted">vs. previous period</span></span></div>
      <div className="chart-wrap">
        <div className="chart-y-labels" aria-hidden="true">{data.axis.map((label) => <span key={label}>{label}</span>)}</div>
        <div className="chart-scroll">
          <svg className="sales-chart" viewBox="0 0 720 242" preserveAspectRatio="none" role="img" aria-label={`Sales performance this ${period}`}>
            <defs><linearGradient id="sales-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#a7ca77" stopOpacity=".3" /><stop offset="100%" stopColor="#a7ca77" stopOpacity=".015" /></linearGradient></defs>
            {data.axis.map((label, index) => <line key={label} className="chart-gridline" x1="4" y1={8 + index * 57} x2="713" y2={8 + index * 57} />)}
            <path className="chart-area" d={areaPath} />
            <polyline className="chart-line" points={linePoints} />
            {points.map((point) => <circle key={point.label} className="chart-point" cx={point.x} cy={point.y} r="3.5" tabIndex="0" role="button" aria-label={`${point.label}: ₹${point.value.toLocaleString("en-IN")}`} onMouseEnter={() => setHovered(point)} onMouseLeave={() => setHovered(null)} onFocus={() => setHovered(point)} onBlur={() => setHovered(null)}><title>{point.label}: ₹{point.value.toLocaleString("en-IN")}</title></circle>)}
          </svg>
          <div className="chart-x-labels">{data.labels.map((label) => <span key={label}>{label}</span>)}</div>
        </div>
        {hovered && <div className="chart-tooltip visible" style={{ left: `${Math.max(37, Math.min((hovered.x / 720) * 100, 90))}%`, top: `${Math.max(0, (hovered.y / 242) * 100 - 18)}%` }}>{hovered.label}<strong>₹{hovered.value.toLocaleString("en-IN")}</strong></div>}
      </div>
      <div className="chart-legend"><span className="legend-dot" /><span>Revenue</span><span className="legend-period">Updated just now</span></div>
    </article>
  );
}

function TopProducts() {
  return (
    <article className="panel products-panel">
      <div className="panel-heading compact-heading"><div><span className="panel-kicker">WHAT’S MOVING</span><h2>Top products</h2><p>Your best performers this month.</p></div><button className="more-button" type="button" aria-label="More top products options">···</button></div>
      <div className="top-product-list">
        {topProducts.map((product) => <div className="top-product" key={product.name}>
          <div className={`product-thumb thumb-${product.tone}`}><Icon name={product.icon} /></div>
          <div className="top-product-info"><strong>{product.name}</strong><span>{product.category}</span></div>
          <div className="product-performance"><strong>{product.revenue}</strong><span><i style={{ width: `${product.progress}%` }} /></span><small>{product.sold} sold</small></div>
        </div>)}
      </div>
      <a className="panel-link" href="#products">View all products <span>→</span></a>
    </article>
  );
}

function OrdersTable({ notify }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const statuses = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];
  const visibleOrders = initialOrders.filter((order) => {
    const matchesQuery = `${order.id} ${order.name} ${order.email} ${order.status}`.toLowerCase().includes(query.trim().toLowerCase());
    return matchesQuery && (status === "All" || order.status === status);
  });

  function cycleStatus() {
    setStatus((current) => statuses[(statuses.indexOf(current) + 1) % statuses.length]);
  }

  return (
    <section className="panel orders-panel" id="orders">
      <div className="orders-heading">
        <div className="panel-heading compact-heading"><div><span className="panel-kicker">THE LATEST</span><h2>Recent orders <span className="orders-count">5</span></h2><p>Keep up with what your customers are buying.</p></div></div>
        <div className="order-tools">
          <label className="table-search"><Icon name="search" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search orders..." aria-label="Search orders" /></label>
          <button className="filter-button" onClick={cycleStatus} type="button">{status === "All" ? "All orders" : status} <span>⌄</span></button>
          <a className="panel-link all-orders-link" href="#orders">View all <span>→</span></a>
        </div>
      </div>
      <div className="table-scroll">
        <table>
          <thead><tr><th>ORDER ID</th><th>CUSTOMER</th><th>DATE</th><th>PRODUCTS</th><th>AMOUNT</th><th>STATUS</th><th><span className="sr-only">Order options</span></th></tr></thead>
          <tbody>
            {visibleOrders.map((order) => <tr key={order.id}>
              <td className="order-id">{order.id}</td>
              <td><div className="customer-cell"><span className={`customer-avatar avatar-${order.tone}`}>{order.initials}</span><span><strong>{order.name}</strong><small>{order.email}</small></span></div></td>
              <td className="date-cell">{order.date}</td><td>{order.products}</td><td className="amount-cell">{order.amount}</td>
              <td><span className={`status-pill status-${order.status.toLowerCase()}`}><i />{order.status}</span></td>
              <td><button className="row-menu" onClick={() => notify(`Order ${order.id} selected.`)} aria-label={`Options for order ${order.id}`} type="button">···</button></td>
            </tr>)}
            {visibleOrders.length === 0 && <tr><td className="no-orders-cell" colSpan="7">No orders match your search.</td></tr>}
          </tbody>
        </table>
      </div>
      <div className="table-footer"><span>Showing <strong>{visibleOrders.length}</strong> of <strong>1,429</strong> orders</span><div className="pagination"><button type="button" disabled aria-label="Previous page">←</button><button type="button" className="page-current" onClick={() => notify("Page 1 · Showing the latest orders.")} aria-label="Page 1">1</button><button type="button" onClick={() => notify("Page 2 selected · Showing the latest orders.")} aria-label="Page 2">2</button><button type="button" onClick={() => notify("Page 3 selected · Showing the latest orders.")} aria-label="Page 3">3</button><span>…</span><button type="button" onClick={() => notify("Page 286 selected · Showing the latest orders.")} aria-label="Page 286">286</button><button type="button" onClick={() => notify("Next page selected · Showing the latest orders.")} aria-label="Next page">→</button></div></div>
    </section>
  );
}

function downloadReport(notify) {
  const rows = [
    ["Metric", "Value"],
    ["Total products", "248"],
    ["Total orders", "1429"],
    ["Total customers", "892"],
    ["Total sales (INR)", "4829400.00"],
    [],
    ["Top product", "Category", "Units sold", "Revenue (INR)"],
    ...topProducts.map((product) => [product.name, product.category, product.sold, product.revenue.replace(/[$,]/g, "")]),
  ];
  const csv = rows.map((row) => row.map((value) => `"${String(value ?? "").replaceAll('"', '""')}"`).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "techlite-store-report.csv";
  link.click();
  URL.revokeObjectURL(url);
  notify("Your TechLite report has been downloaded.");
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [toast, setToast] = useState("");
  const today = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }).format(new Date()).toUpperCase();

  function notify(message) {
    setToast(message);
    window.clearTimeout(notify.timer);
    notify.timer = window.setTimeout(() => setToast(""), 2400);
  }

  return (
    <>
      <IconLibrary />
      <div className="app-shell">
        <Sidebar open={sidebarOpen} activeNav={activeNav} setActiveNav={setActiveNav} close={() => setSidebarOpen(false)} orderCount={12} />
        <main className="main-panel" id="dashboard">
          <Topbar openMenu={() => setSidebarOpen(true)} notify={notify} />
          <div className="dashboard-content">
            <section className="welcome-row">
              <div><div className="date-line"><Icon name="calendar" /><span>{today}</span><span className="date-dot">·</span><span>YOUR STORE AT A GLANCE</span></div><h1>TechLite~ Smart Mobile Store Dashboard <span className="wave">✳</span></h1><p>Your store performance at a glance.</p></div>
              <button className="button button-outline" onClick={() => downloadReport(notify)} type="button"><Icon name="download" /> Download report</button>
            </section>
            <Metrics />
            <section className="analytics-grid" aria-label="Sales and product analytics"><SalesChart /><TopProducts /></section>
            <OrdersTable notify={notify} />
            <footer className="dashboard-footer" id="settings"><span>© 2026 TechLite Smart Mobile Store.</span><span><span className="footer-live-dot" /> All systems operational</span></footer>
          </div>
        </main>
      </div>
      <div className={`toast${toast ? " show" : ""}`} role="status" aria-live="polite">{toast}</div>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
