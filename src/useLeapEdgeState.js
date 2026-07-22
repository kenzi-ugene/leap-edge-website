import { useCallback, useEffect, useMemo, useState } from 'react';

const PAGES = [
  ['home', 'Home', 'Home'],
  ['studio', 'About Us', 'About Us'],
  ['portfolio', 'Our Work', 'Our Work'],
  ['services', 'Services', 'Services'],
  ['process', 'How It Works', 'How It Works'],
  ['catalogue', 'Spaces & Pricing', 'Spaces & Pricing'],
  ['clients', 'Reviews', 'Reviews'],
];

const PROJECTS = [
  { name: 'Stillwater Residence', type: 'BUNGALOW', loc: 'Country Heights', meta: 'Country Heights · 9,600 sq ft · RM 3.2M', blurb: 'A lakeside estate reimagined around a central courtyard — travertine, fluted walnut, and full-height glazing to the water.', slotId: 'proj-stillwater' },
  { name: 'Casa Vireo', type: 'BUNGALOW', loc: 'Damansara Heights', meta: 'Damansara Heights · 8,200 sq ft · RM 2.4M', blurb: 'Tropical modernism for a three-generation household; a double-volume family hall anchors two private wings.', slotId: 'proj-vireo' },
  { name: 'Amber Ridge', type: 'BUNGALOW', loc: 'Ampang', meta: 'Ampang · 7,400 sq ft · RM 2.1M', blurb: 'Hillside living with a bronze-and-oak palette, a sunken lounge, and a lanai built for entertaining forty.', slotId: 'proj-amber' },
  { name: 'The Ledger House', type: 'BUNGALOW', loc: 'Bangsar', meta: 'Bangsar · 6,800 sq ft · RM 1.9M', blurb: 'A 1970s bungalow gut-renovated into a gallery-like home for a serious art collection.', slotId: 'proj-ledger' },
  { name: 'The Atrium Home', type: 'SEMI-D', loc: 'Subang Jaya', meta: 'Subang Jaya · 4,800 sq ft · RM 1.05M', blurb: 'A skylit atrium threads through three floors, bringing garden light into every room.', slotId: 'proj-atrium' },
  { name: 'Serene Court', type: 'SEMI-D', loc: 'Petaling Jaya', meta: 'Petaling Jaya · 4,500 sq ft · RM 980K', blurb: 'Quiet luxury on a compact footprint — limewash, linen, and joinery that hides a working household.', slotId: 'proj-serene' },
  { name: 'The Garden Wing', type: 'SEMI-D', loc: 'TTDI', meta: 'TTDI · 4,100 sq ft · RM 860K', blurb: 'An extension and full renovation that dissolves the wall between kitchen, dining, and garden.', slotId: 'proj-garden' },
  { name: 'Halcyon House', type: 'SUPERLINK', loc: 'Setia Alam', meta: 'Setia Alam · 3,200 sq ft · RM 520K', blurb: 'Proof that superlinks deserve estate-level detailing — bespoke joinery on every floor.', slotId: 'proj-halcyon' },
];

const SPACES = [
  { name: 'Formal Living', cat: 'LIVING', dims: '22 × 18 ft · Double volume', includes: ['Bespoke feature wall & ceiling', 'Loose furniture curation', 'Lighting & automation plan'], price: 'RM 96,000', slotId: 'sp-living' },
  { name: 'Family Hall', cat: 'LIVING', dims: '20 × 16 ft · First floor', includes: ['Media wall with concealed storage', 'Acoustic panelling', 'Reading nook joinery'], price: 'RM 72,000', slotId: 'sp-family' },
  { name: 'Dry Kitchen', cat: 'KITCHEN', dims: '16 × 12 ft · Island format', includes: ['Quartzite island & counters', 'Full-height shaker cabinetry', 'Integrated European appliances'], price: 'RM 78,000', slotId: 'sp-dry' },
  { name: 'Wet Kitchen', cat: 'KITCHEN', dims: '12 × 10 ft · High-heat spec', includes: ['Stainless & sintered stone surfaces', 'Heavy-duty extraction', 'Wash & prep zoning'], price: 'RM 46,000', slotId: 'sp-wet' },
  { name: 'Master Suite', cat: 'SUITE', dims: '24 × 20 ft · With sitting area', includes: ['Upholstered headboard wall', 'His & hers wardrobe run', 'Blackout & sheer automation'], price: 'RM 120,000', slotId: 'sp-master' },
  { name: 'Walk-in Wardrobe', cat: 'SUITE', dims: '12 × 10 ft · U-configuration', includes: ['Glass-front hanging systems', 'Island dresser with vanity', 'Sensor lighting throughout'], price: 'RM 58,000', slotId: 'sp-wardrobe' },
  { name: 'Master Bath', cat: 'SUITE', dims: '14 × 10 ft · Wet & dry zones', includes: ['Freestanding tub setting', 'Bookmatched stone walls', 'Heated towel & smart WC'], price: 'RM 64,000', slotId: 'sp-bath' },
  { name: 'Home Office', cat: 'WORK', dims: '14 × 12 ft · Dual workstation', includes: ['Full-wall library joinery', 'Cable-managed desk return', 'Video-call lighting & acoustics'], price: 'RM 54,000', slotId: 'sp-office' },
  { name: 'Outdoor Lanai', cat: 'OUTDOOR', dims: '26 × 14 ft · Covered', includes: ['Outdoor kitchen & bar counter', 'Weatherproof ceiling fans', 'Garden & feature lighting'], price: 'RM 88,000', slotId: 'sp-lanai' },
];

/**
 * @param {{ accentColor?: string, showPricing?: boolean, showWhatsApp?: boolean }} props
 */
export function useLeapEdgeState(props = {}) {
  const accentColor = props.accentColor ?? '#1D6FD2';
  const showPricing = props.showPricing ?? true;
  const showWhatsApp = props.showWhatsApp ?? true;

  const [page, setPage] = useState('home');
  const [pFilter, setPFilter] = useState('All');
  const [cFilter, setCFilter] = useState('All');
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formProperty, setFormProperty] = useState('Bungalow');
  const [formBudget, setFormBudget] = useState('RM 1M – 2M');
  const [formMessage, setFormMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [formDone, setFormDone] = useState(false);

  const go = useCallback((nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    document.body.style.setProperty('--accent', accentColor);
  }, [accentColor]);

  const onField = useCallback((e) => {
    const map = {
      name: setFormName,
      phone: setFormPhone,
      email: setFormEmail,
      property: setFormProperty,
      budget: setFormBudget,
      message: setFormMessage,
    };
    const setter = map[e.target.name];
    if (setter) {
      setter(e.target.value);
      setErrorMsg('');
    }
  }, []);

  const submitForm = useCallback(() => {
    if (!formName.trim() || !formPhone.trim()) {
      setErrorMsg('Please share your name and phone number so we can reach you.');
      return;
    }
    setFormDone(true);
    setErrorMsg('');
  }, [formName, formPhone]);

  const resetForm = useCallback(() => {
    setFormDone(false);
    setFormName('');
    setFormPhone('');
    setFormEmail('');
    setFormMessage('');
    setErrorMsg('');
  }, []);

  return useMemo(() => {
    const navItems = PAGES.map(([id, label, labelCase]) => ({
      label,
      labelCase,
      go: () => go(id),
      color: page === id ? '#16233A' : '#47546B',
      weight: page === id ? '600' : '500',
      underline: page === id ? 'var(--accent)' : 'transparent',
    }));

    const pFilters = ['All', 'Bungalow', 'Semi-D', 'Superlink'];
    const portfolioFilters = pFilters.map((f) => ({
      label: f,
      go: () => setPFilter(f),
      bg: pFilter === f ? 'var(--accent)' : '#FFFFFF',
      color: pFilter === f ? '#FFFFFF' : '#16233A',
      border: pFilter === f ? 'var(--accent)' : '#E4E8EF',
    }));

    const cFilters = ['All', 'Living', 'Kitchen', 'Suite', 'Work', 'Outdoor'];
    const catalogueFilters = cFilters.map((f) => ({
      label: f,
      go: () => setCFilter(f),
      bg: cFilter === f ? 'var(--accent)' : '#FFFFFF',
      color: cFilter === f ? '#FFFFFF' : '#16233A',
      border: cFilter === f ? 'var(--accent)' : '#E4E8EF',
    }));

    return {
      page,
      isHome: page === 'home',
      isStudio: page === 'studio',
      isPortfolio: page === 'portfolio',
      isServices: page === 'services',
      isProcess: page === 'process',
      isCatalogue: page === 'catalogue',
      isClients: page === 'clients',
      isContact: page === 'contact',
      navItems,
      goHome: () => go('home'),
      goPortfolio: () => go('portfolio'),
      goServices: () => go('services'),
      goProcess: () => go('process'),
      goClients: () => go('clients'),
      goContact: () => go('contact'),
      stats: [
        { value: '180+', label: 'Homes completed' },
        { value: '14', label: 'Years in business' },
        { value: 'RM 210M', label: 'Project value delivered' },
        { value: '92%', label: 'Clients from referrals' },
      ],
      featured: PROJECTS.slice(0, 4),
      serviceAreas: ['Kuala Lumpur', 'Petaling Jaya', 'Damansara', 'Subang Jaya', 'Ampang', 'Bangsar', 'TTDI', 'Setia Alam'],
      homeTypes: [
        { title: 'Bungalows', desc: 'Full design and build for detached homes of every size.' },
        { title: 'Semi-detached homes', desc: 'Renovation, extension, and interior fit-out.' },
        { title: 'Superlink & terrace homes', desc: 'Smart layouts and quality finishes on practical budgets.' },
        { title: 'New builds', desc: 'From empty land to move-in ready, one contract.' },
        { title: 'Full renovations', desc: 'Structural work, wet works, wiring, and plumbing.' },
        { title: 'Kitchens & bathrooms', desc: 'The two rooms that matter most, done properly.' },
      ],
      serviceTeasers: [
        { num: '01', title: 'Design & Build', desc: 'We design your home and build it with our own team. One contract, one price, one point of contact from start to finish.' },
        { num: '02', title: 'Renovation & Extension', desc: 'Extensions, structural work, rewiring, plumbing, and full makeovers for landed homes — properly engineered and documented.' },
        { num: '03', title: 'Furnishing & Styling', desc: 'Furniture, lighting, and finishing touches so your home is ready to live in from day one.' },
      ],
      values: [
        { num: '01', title: 'Honest pricing', desc: 'Itemised, open-book quotations. You see the same numbers we do — material by material, trade by trade.' },
        { num: '02', title: 'A founder on your site', desc: 'A founding principal walks every site weekly. Quality checks are never delegated.' },
        { num: '03', title: 'Built to last', desc: 'We design for the decade after handover — materials that age well and layouts that adapt as your family grows.' },
      ],
      credentials: [
        'CIDB Grade G7 registered contractor',
        'Winner, Malaysia Interior Design Awards — Residential, 2023 & 2025',
        'Panel designer for three private banks\u2019 client programmes',
        'In-house quantity surveying and M&E coordination',
      ],
      portfolioFilters,
      filteredProjects: PROJECTS.filter((p) => pFilter === 'All' || p.type === pFilter.toUpperCase()),
      services: [
        { num: '01', title: 'Full Residence Design & Build', longDesc: 'For new builds and whole-home transformations. We take the project from measured survey through authority submissions, interior architecture, and construction — one contract, one warranty, one team accountable for the result.', scope: ['Spatial planning & interior architecture', 'Authority submission & compliance', 'In-house construction & project management', 'Turnkey handover with 24-month warranty'] },
        { num: '02', title: 'Renovation & Extension', longDesc: 'Landed homes evolve with the families in them. We handle structural reconfiguration, rear and side extensions, full wet works, and system upgrades — engineered properly, documented fully, and finished to estate standard.', scope: ['Structural works & extensions', 'Wet works, roofing & waterproofing', 'Electrical, plumbing & smart-home M&E', 'Kitchen & bathroom transformation'] },
        { num: '03', title: 'Furnishing & Styling', longDesc: 'The final layer that makes a house yours. Loose furniture procurement, custom upholstery, art and objet curation, and styling for homes nearing completion — including show units for landed developments.', scope: ['Furniture curation & procurement', 'Custom upholstery & joinery pieces', 'Art, lighting & accessory styling', 'Move-in coordination'] },
      ],
      advantages: [
        { title: 'One accountable party', desc: 'No designer-versus-contractor finger-pointing. The team that draws it is the team that builds it — and warrants it.' },
        { title: 'Cost certainty', desc: 'Design decisions are priced as they are made. You approve a number before we build, not after.' },
        { title: 'Faster by months', desc: 'Design and procurement overlap with early works. Our residences complete 20–30% faster than split contracts.' },
      ],
      steps: [
        { num: '01', duration: 'Week 1', title: 'Free consultation', desc: 'A conversation about how you live — at our office or your property. You leave with an honest view of what is feasible and what it will cost.' },
        { num: '02', duration: 'Weeks 2–5', title: 'Concept & space planning', desc: 'Measured survey, spatial studies, and a design concept with mood direction and preliminary costing. This is where the home takes its shape.' },
        { num: '03', duration: 'Weeks 6–10', title: 'Design development', desc: 'Detailed drawings, material selections from our library, joinery design, and lighting plans — refined with you, room by room.' },
        { num: '04', duration: 'Weeks 10–12', title: 'Quotation & contract', desc: 'An itemised, open-book quotation. Every material, every trade, every provisional sum — agreed before a single hack begins.' },
        { num: '05', duration: 'Months 4–12', title: 'Construction', desc: 'Our own builders, supervised weekly by a founding principal. You receive photo progress reports and a live cost ledger throughout.' },
        { num: '06', duration: 'Final month', title: 'Styling & handover', desc: 'Deep clean, furniture placement, styling, and a room-by-room walkthrough. Then the keys — with a 24-month workmanship warranty.' },
      ],
      showPricing,
      catalogueFilters,
      filteredSpaces: SPACES.filter((x) => cFilter === 'All' || x.cat === cFilter.toUpperCase()),
      testimonials: [
        { quote: 'They treated our home with the same care we do. Every ringgit was accounted for, every detail considered — and they handed over two weeks early.', name: 'Datin Serena L.', project: 'Bungalow · Damansara Heights' },
        { quote: 'We interviewed five firms. Leap Edge was the only one that talked about how we live before showing us a single picture. The house feels like it was always meant to be this way.', name: 'Mr. & Mrs. Tan', project: 'Semi-D · TTDI' },
        { quote: 'The open-book costing changed everything for us. There was never a surprise invoice, never a vague variation order. Just quiet competence, month after month.', name: 'Dr. Harvinder S.', project: 'Bungalow · Country Heights' },
        { quote: 'Our renovation ran while we lived abroad. The weekly reports were so thorough we never once felt out of touch. We returned to a finished home — and it was better than the renders.', name: 'En. Azlan & Pn. Farah', project: 'Bungalow · Ampang' },
      ],
      formName, formPhone, formEmail, formProperty, formBudget, formMessage,
      hasError: !!errorMsg, errorMsg,
      formDone, formNotDone: !formDone,
      onField, submitForm, resetForm,
      showWhatsApp,
    };
  }, [page, pFilter, cFilter, formName, formPhone, formEmail, formProperty, formBudget, formMessage, errorMsg, formDone, showPricing, showWhatsApp, go, onField, submitForm, resetForm]);
}