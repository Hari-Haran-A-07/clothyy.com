import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';

// Modals & Drawers
import { SearchModal } from './components/modals/SearchModal';
import { CartDrawer } from './components/modals/CartDrawer';
import { QuickViewModal } from './components/modals/QuickViewModal';
import { SizeGuideModal } from './components/modals/SizeGuideModal';
import { AiStylistDrawer } from './components/modals/AiStylistDrawer';
import { LiveCmsModal } from './components/modals/LiveCmsModal';
import { VisualSearchModal } from './components/modals/VisualSearchModal';

// Views
import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { OrderConfirmationView } from './views/OrderConfirmationView';
import { AccountView } from './views/AccountView';
import { WishlistView } from './views/WishlistView';
import { AboutView } from './views/AboutView';
import { LookbookView } from './views/LookbookView';
import { JournalView } from './views/JournalView';
import { JournalArticleView } from './views/JournalArticleView';
import { StoreLocatorView } from './views/StoreLocatorView';
import { HelpCenterView } from './views/HelpCenterView';
import { ContactView } from './views/ContactView';
import { LegalView } from './views/LegalView';
import { PolyglotArchitectureView } from './views/PolyglotArchitectureView';
import { NotFoundView } from './views/NotFoundView';

const MainApp: React.FC = () => {
  const { currentView } = useStore();

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'shop':
        return <ShopView />;
      case 'product':
        return <ProductDetailView />;
      case 'cart':
        return <CartView />;
      case 'checkout':
        return <CheckoutView />;
      case 'order-confirmation':
        return <OrderConfirmationView />;
      case 'account':
        return <AccountView />;
      case 'wishlist':
        return <WishlistView />;
      case 'about':
        return <AboutView />;
      case 'lookbook':
        return <LookbookView />;
      case 'journal':
        return <JournalView />;
      case 'journal-article':
        return <JournalArticleView />;
      case 'stores':
        return <StoreLocatorView />;
      case 'help':
        return <HelpCenterView />;
      case 'contact':
        return <ContactView />;
      case 'legal':
        return <LegalView />;
      case 'polyglot':
        return <PolyglotArchitectureView />;
      default:
        return <NotFoundView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#121316] selection:bg-[#C5A880] selection:text-white transition-colors duration-300">
      <Header />
      
      <main className="flex-1">
        {renderView()}
      </main>

      <Footer />

      {/* Global Modals, Drawers & Notification Systems */}
      <ToastContainer />
      <SearchModal />
      <CartDrawer />
      <QuickViewModal />
      <SizeGuideModal />
      <AiStylistDrawer />
      <LiveCmsModal />
      <VisualSearchModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
};

export default App;
