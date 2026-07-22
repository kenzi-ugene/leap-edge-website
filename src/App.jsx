import LeapEdgeView from './LeapEdgeView';
import { useScrollAnimations } from './hooks/useScrollAnimations';
import { useLeapEdgeState } from './useLeapEdgeState';

export default function App() {
    const viewProps = useLeapEdgeState({
        accentColor: '#1D6FD2',
        showPricing: true,
        showWhatsApp: true,
    });

    useScrollAnimations(viewProps.page);

    return <LeapEdgeView {...viewProps} />;
}
