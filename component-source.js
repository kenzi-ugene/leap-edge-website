
class Component extends DCLogic {
  state = {
    page: 'home',
    pFilter: 'All',
    cFilter: 'All',
    formName: '', formPhone: '', formEmail: '',
    formProperty: 'Bungalow', formBudget: 'RM 1M – 2M', formMessage: '',
    errorMsg: '', formDone: false
  };

  componentDidMount() { this.applyAccent(); this.setupReveal(); }
  componentDidUpdate() { this.applyAccent(); this.setupReveal(); }
  componentWillUnmount() { if (this.io) this.io.disconnect(); }

  setupReveal() {
    if (!this.io) {
      this.io = new IntersectionObserver((entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            en.target.style.opacity = '1';
            en.target.style.transform = 'none';
            this.io.unobserve(en.target);
          }
        }
      }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    }
    requestAnimationFrame(() => {
      document.querySelectorAll('main section').forEach((el) => {
        if (el.dataset.revealBound) return;
        el.dataset.revealBound = '1';
        const r = el.getBoundingClientRect();
        if (r.top > window.innerHeight * 0.55) {
          el.style.opacity = '0';
          el.style.transform = 'translateY(32px)';
        }
        el.style.transition = 'opacity .9s cubic-bezier(.22,.61,.36,1), transform .9s cubic-bezier(.22,.61,.36,1)';
        this.io.observe(el);
      });
    });
  }
  applyAccent() {
    document.body.style.setProperty('--accent', this.props.accentColor ?? '#9A7B4F');
  }

  go(page) {
    this.setState({ page });
    window.scrollTo({ top: 0 });
  }

  renderVals() {
    const s = this.state;
    const pages = [
      ['home', 'HOME', 'Home'],
      ['studio', 'STUDIO', 'Studio'],
      ['portfolio', 'PORTFOLIO', 'Portfolio'],
      ['services', 'SERVICES', 'Services'],
      ['process', 'PROCESS', 'Process'],
      ['catalogue', 'CATALOGUE', 'Catalogue'],
      ['clients', 'CLIENTS', 'Clients']
    ];
    const navItems = pages.map(([id, label, labelCase]) => ({
      label, labelCase,
      go: () => this.go(id),
      color: s.page === id ? '#1F1B16' : '#6E6558',
      weight: s.page === id ? '600' : '400',
      underline: s.page === id ? 'var(--accent)' : 'transparent'
    }));

    const projects = [
      { name: 'Stillwater Residence', type: 'BUNGALOW', loc: 'Country Heights', meta: 'COUNTRY HEIGHTS · 9,600 SQ FT · RM 3.2M', blurb: 'A lakeside estate reimagined around a central courtyard — travertine, fluted walnut, and full-height glazing to the water.', slotId: 'proj-stillwater' },
      { name: 'Casa Vireo', type: 'BUNGALOW', loc: 'Damansara Heights', meta: 'DAMANSARA HEIGHTS · 8,200 SQ FT · RM 2.4M', blurb: 'Tropical modernism for a three-generation household; a double-volume family hall anchors two private wings.', slotId: 'proj-vireo' },
      { name: 'Amber Ridge', type: 'BUNGALOW', loc: 'Ampang', meta: 'AMPANG · 7,400 SQ FT · RM 2.1M', blurb: 'Hillside living with a bronze-and-oak palette, a sunken lounge, and a lanai built for entertaining forty.', slotId: 'proj-amber' },
      { name: 'The Ledger House', type: 'BUNGALOW', loc: 'Bangsar', meta: 'BANGSAR · 6,800 SQ FT · RM 1.9M', blurb: 'A 1970s bungalow gut-renovated into a gallery-like home for a serious art collection.', slotId: 'proj-ledger' },
      { name: 'The Atrium Home', type: 'SEMI-D', loc: 'Subang Jaya', meta: 'SUBANG JAYA · 4,800 SQ FT · RM 1.05M', blurb: 'A skylit atrium threads through three floors, bringing garden light into every room.', slotId: 'proj-atrium' },
      { name: 'Serene Court', type: 'SEMI-D', loc: 'Petaling Jaya', meta: 'PETALING JAYA · 4,500 SQ FT · RM 980K', blurb: 'Quiet luxury on a compact footprint — limewash, linen, and joinery that hides a working household.', slotId: 'proj-serene' },
      { name: 'The Garden Wing', type: 'SEMI-D', loc: 'TTDI', meta: 'TTDI · 4,100 SQ FT · RM 860K', blurb: 'An extension and full renovation that dissolves the wall between kitchen, dining, and garden.', slotId: 'proj-garden' },
      { name: 'Halcyon House', type: 'SUPERLINK', loc: 'Setia Alam', meta: 'SETIA ALAM · 3,200 SQ FT · RM 520K', blurb: 'Proof that superlinks deserve estate-level detailing — bespoke joinery on every floor.', slotId: 'proj-halcyon' }
    ];
    const pFilters = ['All', 'Bungalow', 'Semi-D', 'Superlink'];
    const portfolioFilters = pFilters.map(f => ({
      label: f.toUpperCase(),
      go: () => this.setState({ pFilter: f }),
      bg: s.pFilter === f ? '#1F1B16' : 'transparent',
      color: s.pFilter === f ? '#FAF7F2' : '#3C352C',
      border: s.pFilter === f ? '#1F1B16' : 'rgba(31,27,22,.25)'
    }));
    const filteredProjects = projects.filter(p => s.pFilter === 'All' || p.type === s.pFilter.toUpperCase());

    const spaces = [
      { name: 'Formal Living', cat: 'LIVING', dims: '22 × 18 FT · DOUBLE VOLUME', includes: ['Bespoke feature wall & ceiling', 'Loose furniture curation', 'Lighting & automation plan'], price: 'RM 96,000', slotId: 'sp-living' },
      { name: 'Family Hall', cat: 'LIVING', dims: '20 × 16 FT · FIRST FLOOR', includes: ['Media wall with concealed storage', 'Acoustic panelling', 'Reading nook joinery'], price: 'RM 72,000', slotId: 'sp-family' },
      { name: 'Dry Kitchen', cat: 'KITCHEN', dims: '16 × 12 FT · ISLAND FORMAT', includes: ['Quartzite island & counters', 'Full-height shaker cabinetry', 'Integrated European appliances'], price: 'RM 78,000', slotId: 'sp-dry' },
      { name: 'Wet Kitchen', cat: 'KITCHEN', dims: '12 × 10 FT · HIGH-HEAT SPEC', includes: ['Stainless & sintered stone surfaces', 'Heavy-duty extraction', 'Wash & prep zoning'], price: 'RM 46,000', slotId: 'sp-wet' },
      { name: 'Master Suite', cat: 'SUITE', dims: '24 × 20 FT · WITH SITTING AREA', includes: ['Upholstered headboard wall', 'His & hers wardrobe run', 'Blackout & sheer automation'], price: 'RM 120,000', slotId: 'sp-master' },
      { name: 'Walk-in Wardrobe', cat: 'SUITE', dims: '12 × 10 FT · U-CONFIGURATION', includes: ['Glass-front hanging systems', 'Island dresser with vanity', 'Sensor lighting throughout'], price: 'RM 58,000', slotId: 'sp-wardrobe' },
      { name: 'Master Bath', cat: 'SUITE', dims: '14 × 10 FT · WET & DRY ZONES', includes: ['Freestanding tub setting', 'Bookmatched stone walls', 'Heated towel & smart WC'], price: 'RM 64,000', slotId: 'sp-bath' },
      { name: 'Home Office', cat: 'WORK', dims: '14 × 12 FT · DUAL WORKSTATION', includes: ['Full-wall library joinery', 'Cable-managed desk return', 'Video-call lighting & acoustics'], price: 'RM 54,000', slotId: 'sp-office' },
      { name: 'Outdoor Lanai', cat: 'OUTDOOR', dims: '26 × 14 FT · COVERED', includes: ['Outdoor kitchen & bar counter', 'Weatherproof ceiling fans', 'Garden & feature lighting'], price: 'RM 88,000', slotId: 'sp-lanai' }
    ];
    const cFilters = ['All', 'Living', 'Kitchen', 'Suite', 'Work', 'Outdoor'];
    const catalogueFilters = cFilters.map(f => ({
      label: f.toUpperCase(),
      go: () => this.setState({ cFilter: f }),
      bg: s.cFilter === f ? '#1F1B16' : 'transparent',
      color: s.cFilter === f ? '#FAF7F2' : '#3C352C',
      border: s.cFilter === f ? '#1F1B16' : 'rgba(31,27,22,.25)'
    }));
    const filteredSpaces = spaces.filter(x => s.cFilter === 'All' || x.cat === s.cFilter.toUpperCase());

    const onField = (e) => {
      const key = { name: 'formName', phone: 'formPhone', email: 'formEmail', property: 'formProperty', budget: 'formBudget', message: 'formMessage' }[e.target.name];
      if (key) this.setState({ [key]: e.target.value, errorMsg: '' });
    };
    const submitForm = () => {
      if (!s.formName.trim() || !s.formPhone.trim()) {
        this.setState({ errorMsg: 'Please share your name and phone number so we can reach you.' });
        return;
      }
      this.setState({ formDone: true, errorMsg: '' });
    };

    return {
      isHome: s.page === 'home',
      isStudio: s.page === 'studio',
      isPortfolio: s.page === 'portfolio',
      isServices: s.page === 'services',
      isProcess: s.page === 'process',
      isCatalogue: s.page === 'catalogue',
      isClients: s.page === 'clients',
      isContact: s.page === 'contact',
      navItems,
      goHome: () => this.go('home'),
      goPortfolio: () => this.go('portfolio'),
      goServices: () => this.go('services'),
      goProcess: () => this.go('process'),
      goClients: () => this.go('clients'),
      goContact: () => this.go('contact'),

      stats: [
        { value: '180+', label: 'RESIDENCES COMPLETED' },
        { value: '14', label: 'YEARS OF PRACTICE' },
        { value: 'RM 210M', label: 'PROJECT VALUE DELIVERED' },
        { value: '92%', label: 'CLIENTS BY REFERRAL' }
      ],
      featured: projects.slice(0, 3),
      serviceTeasers: [
        { num: 'I', title: 'Full Residence Design & Build', desc: 'The complete journey — spatial planning, interior architecture, and construction by our in-house builders, delivered turnkey.' },
        { num: 'II', title: 'Renovation & Extension', desc: 'Structural reconfiguration for landed homes: extensions, wet works, M&E upgrades, and heritage-sensitive restoration.' },
        { num: 'III', title: 'Furnishing & Styling', desc: 'Loose furniture, art placement, and final styling for homes that are structurally complete but not yet yours.' }
      ],

      values: [
        { num: 'I', title: 'Candour in costing', desc: 'Itemised, open-book quotations. You see the same numbers we do — material by material, trade by trade.' },
        { num: 'II', title: 'Principal on site', desc: 'A founding principal walks every site weekly. Standards are not delegated.' },
        { num: 'III', title: 'Built to be kept', desc: 'We design for the decade after handover — materials that age gracefully and plans that adapt as families grow.' }
      ],
      credentials: [
        'CIDB Grade G7 registered contractor',
        'Winner, Malaysia Interior Design Awards — Residential, 2023 & 2025',
        'Panel designer for three private banks\u2019 client programmes',
        'In-house quantity surveying and M&E coordination'
      ],

      portfolioFilters, filteredProjects,

      services: [
        { num: 'I', title: 'Full Residence Design & Build', longDesc: 'For new builds and whole-home transformations. We take the project from measured survey through authority submissions, interior architecture, and construction — one contract, one warranty, one team accountable for the result.', scope: ['Spatial planning & interior architecture', 'Authority submission & compliance', 'In-house construction & project management', 'Turnkey handover with 24-month warranty'] },
        { num: 'II', title: 'Renovation & Extension', longDesc: 'Landed homes evolve with the families in them. We handle structural reconfiguration, rear and side extensions, full wet works, and system upgrades — engineered properly, documented fully, and finished to estate standard.', scope: ['Structural works & extensions', 'Wet works, roofing & waterproofing', 'Electrical, plumbing & smart-home M&E', 'Kitchen & bathroom transformation'] },
        { num: 'III', title: 'Furnishing & Styling', longDesc: 'The final layer that makes a house yours. Loose furniture procurement, custom upholstery, art and objet curation, and styling for homes nearing completion — including show units for landed developments.', scope: ['Furniture curation & procurement', 'Custom upholstery & joinery pieces', 'Art, lighting & accessory styling', 'Move-in coordination'] }
      ],
      advantages: [
        { title: 'One accountable party', desc: 'No designer-versus-contractor finger-pointing. The team that draws it is the team that builds it — and warrants it.' },
        { title: 'Cost certainty', desc: 'Design decisions are priced as they are made. You approve a number before we build, not after.' },
        { title: 'Faster by months', desc: 'Design and procurement overlap with early works. Our residences complete 20–30% faster than split contracts.' }
      ],

      steps: [
        { num: 'I', duration: 'WEEK 1', title: 'Private consultation', desc: 'A conversation about how you live — at our atelier or your property. We listen more than we talk, and leave you with an honest view of feasibility and budget.' },
        { num: 'II', duration: 'WEEKS 2–5', title: 'Concept & space planning', desc: 'Measured survey, spatial studies, and a design concept with mood direction and preliminary costing. This is where the home takes its shape.' },
        { num: 'III', duration: 'WEEKS 6–10', title: 'Design development', desc: 'Detailed drawings, material selections from our library, joinery design, and lighting plans — refined with you, room by room.' },
        { num: 'IV', duration: 'WEEKS 10–12', title: 'Costing & contract', desc: 'An itemised, open-book quotation. Every material, every trade, every provisional sum — agreed before a single hack begins.' },
        { num: 'V', duration: 'MONTHS 4–12', title: 'Construction', desc: 'Our own builders, supervised weekly by a founding principal. You receive photographic progress reports and a live cost ledger throughout.' },
        { num: 'VI', duration: 'FINAL MONTH', title: 'Styling & handover', desc: 'Deep clean, furniture placement, styling, and a room-by-room walkthrough. Then the keys — with a 24-month workmanship warranty.' }
      ],

      showPricing: this.props.showPricing ?? true,
      catalogueFilters, filteredSpaces,

      testimonials: [
        { quote: 'They treated our home with the same care we do. Every ringgit was accounted for, every detail considered — and they handed over two weeks early.', name: 'DATIN SERENA L.', project: 'BUNGALOW · DAMANSARA HEIGHTS' },
        { quote: 'We interviewed five firms. Leap Edge was the only one that talked about how we live before showing us a single picture. The house feels like it was always meant to be this way.', name: 'MR. & MRS. TAN', project: 'SEMI-D · TTDI' },
        { quote: 'The open-book costing changed everything for us. There was never a surprise invoice, never a vague variation order. Just quiet competence, month after month.', name: 'DR. HARVINDER S.', project: 'BUNGALOW · COUNTRY HEIGHTS' },
        { quote: 'Our renovation ran while we lived abroad. The weekly reports were so thorough we never once felt out of touch. We returned to a finished home — and it was better than the renders.', name: 'EN. AZLAN & PN. FARAH', project: 'BUNGALOW · AMPANG' }
      ],

      formName: s.formName, formPhone: s.formPhone, formEmail: s.formEmail,
      formProperty: s.formProperty, formBudget: s.formBudget, formMessage: s.formMessage,
      hasError: !!s.errorMsg, errorMsg: s.errorMsg,
      formDone: s.formDone, formNotDone: !s.formDone,
      onField, submitForm,
      resetForm: () => this.setState({ formDone: false, formName: '', formPhone: '', formEmail: '', formMessage: '', errorMsg: '' }),

      showWhatsApp: this.props.showWhatsApp ?? true
    };
  }
}
