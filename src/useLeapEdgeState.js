import { useCallback, useEffect, useMemo, useState } from 'react';

const PAGES = [
  ['home', 'Home', 'Home'],
  ['studio', 'About Us', 'About Us'],
  ['portfolio', 'Our Projects', 'Our Projects'],
  ['services', 'Services', 'Services'],
  ['process', 'How We Work', 'How We Work'],
  ['catalogue', 'Spaces & Pricing', 'Spaces & Pricing'],
  ['clients', 'Reviews', 'Reviews'],
];

const PROJECTS = [
  { name: 'Stillwater Residence', type: 'BUNGALOW', loc: 'Bukit Mertajam', meta: 'Bukit Mertajam · 3,400 sq ft · RM 420K', blurb: 'A full renovation and rear extension gave this bungalow a new dry kitchen and family hall — completed while the family continued living on site.', slotId: 'proj-stillwater' },
  { name: 'Casa Vireo', type: 'BUNGALOW', loc: 'Alma', meta: 'Alma · 2,800 sq ft · RM 310K', blurb: 'Structural restructuring opened the ground floor into a single connected living and dining space, with new tiling, ceiling and electrical works throughout.', slotId: 'proj-vireo' },
  { name: 'Amber Ridge', type: 'BUNGALOW', loc: 'Butterworth', meta: 'Butterworth · 3,100 sq ft · RM 365K', blurb: 'Roof and awning replacement, rewiring and a full bathroom upgrade brought this ageing bungalow up to modern standards without changing its footprint.', slotId: 'proj-amber' },
  { name: 'The Ledger House', type: 'BUNGALOW', loc: 'Juru', meta: 'Juru · 2,600 sq ft · RM 240K', blurb: 'A kitchen extension and carpentry-led makeover turned a dated bungalow into a practical family home.', slotId: 'proj-ledger' },
  { name: 'The Atrium Home', type: 'SEMI-D', loc: 'Simpang Ampat', meta: 'Simpang Ampat · 2,200 sq ft · RM 195K', blurb: 'Hacking and masonry works reconfigured the layout, with new plumbing and tiling carried through the wet areas.', slotId: 'proj-atrium' },
  { name: 'Serene Court', type: 'SEMI-D', loc: 'Machang Bubok', meta: 'Machang Bubok · 2,000 sq ft · RM 165K', blurb: 'A side extension and full kitchen upgrade, coordinated from site inspection through to final handover.', slotId: 'proj-serene' },
  { name: 'The Garden Wing', type: 'SEMI-D', loc: 'Perai', meta: 'Perai · 1,950 sq ft · RM 150K', blurb: 'A rear extension dissolved the wall between kitchen, dining, and garden, with new ceiling and electrical works throughout.', slotId: 'proj-garden' },
  { name: 'Halcyon House', type: 'SUPERLINK', loc: 'Kulim', meta: 'Kulim · 1,700 sq ft · RM 98K', blurb: 'Proof that terrace and superlink homes deserve the same care — tiling, carpentry and finishing done properly on a practical budget.', slotId: 'proj-halcyon' },
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
  const [formSubmitting, setFormSubmitting] = useState(false);

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

  const submitForm = useCallback(async () => {
    if (!formName.trim() || !formPhone.trim()) {
      setErrorMsg('Please share your name and phone number so we can reach you.');
      return;
    }

    setFormSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/leapedge8228@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formName.trim(),
          phone: formPhone.trim(),
          email: formEmail.trim() || 'not provided',
          property: formProperty,
          budget: formBudget,
          message: formMessage.trim() || 'No message provided',
          _subject: `New Leap Edge enquiry from ${formName.trim()}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.success === 'false' || result.success === false) {
        throw new Error(result.message || 'Unable to send your enquiry right now.');
      }

      setFormDone(true);
    } catch (error) {
      setErrorMsg(
        error instanceof Error && error.message
          ? error.message
          : 'Unable to send your enquiry. Please WhatsApp us at +60 17-438 9294.',
      );
    } finally {
      setFormSubmitting(false);
    }
  }, [formName, formPhone, formEmail, formProperty, formBudget, formMessage]);

  const resetForm = useCallback(() => {
    setFormDone(false);
    setFormSubmitting(false);
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
        { value: '120+', label: 'Homes completed' },
        { value: '10+', label: 'Years in business' },
        { value: 'RM 45M', label: 'Project value delivered' },
        { value: '88%', label: 'Clients from referrals' },
      ],
      featured: PROJECTS.slice(0, 4),
      serviceAreas: ['Bukit Mertajam', 'Alma', 'Machang Bubok', 'Juru', 'Perai', 'Butterworth', 'Simpang Ampat', 'Kulim'],
      homeTypes: [
        { title: 'Bungalows', desc: 'Renovation, restructuring, and extension for detached homes of every size.' },
        { title: 'Semi-detached homes', desc: 'Renovation, extension, and interior fit-out.' },
        { title: 'Terrace House', desc: 'Smart layouts and quality finishes on practical budgets.' },
        { title: 'Extensions', desc: 'Kitchen, bedroom, and rear extensions, engineered and documented properly.' },
        { title: 'Full renovations', desc: 'Structural work, wet works, wiring, and plumbing.' },
        { title: 'Kitchens & bathrooms', desc: 'The two rooms that matter most, done properly.' },
      ],
      serviceTeasers: [
        { num: '01', title: 'Consultation & Design', desc: 'We assess your site, understand your requirements and propose practical renovation solutions based on your budget, lifestyle and available space. Layout planning and 2D or 3D visualisation are available for selected projects.' },
        { num: '02', title: 'Refurbishment & Restructuring', desc: 'We refurbish ageing spaces and restructure existing layouts to improve functionality, comfort and appearance. Works may include hacking, masonry, partitioning, plumbing, electrical rewiring, tiling and ceiling modifications.' },
        { num: '03', title: 'Renovation & Rebuilding', desc: 'From kitchen extensions and bathroom upgrades to rebuilding damaged or outdated sections, we coordinate the renovation works, materials and specialist trades through to final completion.' },
      ],
      values: [
        { num: '01', title: 'Honest pricing', desc: 'Itemised, open-book quotations. You see the same numbers we do — material by material, trade by trade.' },
        { num: '02', title: 'A dedicated project manager', desc: 'A dedicated project manager walks your site weekly. Quality checks are never delegated.' },
        { num: '03', title: 'Built to last', desc: 'We design for the decade after handover — materials that age well and layouts that adapt as your family grows.' },
      ],
      credentials: [
        'CIDB Grade G3 registered contractor',
        'Over 10 years’ experience serving Penang Mainland, Kedah & Perak',
        'Dedicated project manager for every renovation',
        'In-house coordination from site inspection to final handover',
      ],
      portfolioFilters,
      filteredProjects: PROJECTS.filter((p) => pFilter === 'All' || p.type === pFilter.toUpperCase()),
      services: [
        { num: '01', title: 'Consultation & Design', longDesc: 'We assess your site, understand your requirements and propose practical renovation solutions based on your budget, lifestyle and available space. Layout planning and 2D or 3D visualisation are available for selected projects.', scope: ['Site assessment & requirements review', 'Budget & lifestyle-based space planning', '2D / 3D visualisation for selected projects', 'Itemised, practical proposal'] },
        { num: '02', title: 'Refurbishment & Restructuring', longDesc: 'We refurbish ageing spaces and restructure existing layouts to improve functionality, comfort and appearance. Works may include hacking, masonry, partitioning, plumbing, electrical rewiring, tiling and ceiling modifications.', scope: ['Hacking, masonry & partitioning', 'Plumbing & electrical rewiring', 'Tiling & ceiling modifications', 'Layout restructuring for better flow'] },
        { num: '03', title: 'Renovation & Rebuilding', longDesc: 'From kitchen extensions and bathroom upgrades to rebuilding damaged or outdated sections, we coordinate the renovation works, materials and specialist trades through to final completion.', scope: ['Kitchen extensions & bathroom upgrades', 'Rebuilding damaged or outdated sections', 'Materials & specialist trade coordination', 'Site inspection through to final handover'] },
      ],
      advantages: [
        { title: 'One accountable party', desc: 'No back-and-forth between separate designers and contractors. One team manages your renovation from consultation to final handover.' },
        { title: 'Cost certainty', desc: 'Decisions are priced as they are made. You approve a number before we build, not after.' },
        { title: 'Local project coordination', desc: 'Your dedicated project manager coordinates every trade, from masonry to final finishing, so nothing falls between the cracks.' },
      ],
      steps: [
        { num: '01', duration: 'Week 1', title: 'Free consultation', desc: 'A conversation about how you live — at our office or your property. You leave with an honest view of what is feasible and what it will cost.' },
        { num: '02', duration: 'Weeks 2–5', title: 'Concept & space planning', desc: 'Measured survey, space planning, and a practical renovation concept with preliminary costing. This is where the project takes its shape.' },
        { num: '03', duration: 'Weeks 6–10', title: 'Design development', desc: 'Detailed drawings, material selections from our showroom, and finishing plans — refined with you, room by room.' },
        { num: '04', duration: 'Weeks 10–12', title: 'Quotation & contract', desc: 'An itemised, open-book quotation. Every material, every trade, every provisional sum — agreed before a single hack begins.' },
        { num: '05', duration: 'Months 4–12', title: 'Construction', desc: 'Our own builders, supervised weekly by your dedicated project manager. You receive photo progress reports and a live cost ledger throughout.' },
        { num: '06', duration: 'Final month', title: 'Finishing & handover', desc: 'Deep clean, final touch-ups, and a room-by-room walkthrough. Then the keys — with local project coordination through to handover.' },
      ],
      showPricing,
      catalogueFilters,
      filteredSpaces: SPACES.filter((x) => cFilter === 'All' || x.cat === cFilter.toUpperCase()),
      testimonials: [
        { quote: 'They treated our home with the same care we do. Every ringgit was accounted for, every detail considered — and they handed over two weeks early.', name: 'Mr Yong, Homeowner', project: 'd’Courtyards, Taman Serikaya, Bukit Mertajam' },
        { quote: 'We got quotes from several contractors. Leap Edge was the only one that walked the site with us and explained what was actually possible before quoting a single ringgit. The result feels like it was always meant to be this way.', name: 'Mr. & Mrs. Tan', project: 'Semi-D · Alma' },
        { quote: 'The open-book costing changed everything for us. There was never a surprise invoice, never a vague variation order. Just quiet competence, month after month.', name: 'Dr. Harvinder S.', project: 'Bungalow · Kulim' },
        { quote: 'Our renovation ran while we lived abroad. The weekly reports were so thorough we never once felt out of touch. We returned to a finished home — and it was better than the renders.', name: 'En. Azlan & Pn. Farah', project: 'Bungalow · Simpang Ampat' },
      ],
      formName, formPhone, formEmail, formProperty, formBudget, formMessage,
      hasError: !!errorMsg, errorMsg,
      formDone, formNotDone: !formDone,
      formSubmitting,
      onField, submitForm, resetForm,
      showWhatsApp,
    };
  }, [page, pFilter, cFilter, formName, formPhone, formEmail, formProperty, formBudget, formMessage, errorMsg, formDone, formSubmitting, showPricing, showWhatsApp, go, onField, submitForm, resetForm]);
}