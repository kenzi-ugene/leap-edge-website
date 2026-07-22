import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import WhatsAppButton from './components/layout/WhatsAppButton';
import CataloguePage from './pages/CataloguePage';
import ClientsPage from './pages/ClientsPage';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import ProcessPage from './pages/ProcessPage';
import ServicesPage from './pages/ServicesPage';
import StudioPage from './pages/StudioPage';
import { page } from './styles/theme';

const PAGE_MAP = {
    home: HomePage,
    studio: StudioPage,
    portfolio: PortfolioPage,
    services: ServicesPage,
    process: ProcessPage,
    catalogue: CataloguePage,
    clients: ClientsPage,
    contact: ContactPage,
};

/**
 * @param {object} props
 */
export default function LeapEdgeView(props) {
    const { page: activePage, navItems, goHome, goContact, showWhatsApp, ...pageProps } = props;
    const PageComponent = PAGE_MAP[activePage] ?? HomePage;

    return (
        <div style={page}>
            <Header navItems={navItems} goHome={goHome} goContact={goContact} />
            <main style={{ flex: 1 }}>
                <PageComponent {...pageProps} goHome={goHome} goContact={goContact} />
            </main>
            <Footer navItems={navItems} />
            {showWhatsApp && <WhatsAppButton />}
        </div>
    );
}
