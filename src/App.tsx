import React from 'react';
import { AuvreoProvider, useAuvreo } from './context/AuvreoContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RegistrationFlow } from './components/RegistrationFlow';
import { AuthModal } from './components/AuthModal';
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { SummitView } from './views/SummitView';
import { ProgrammesView } from './views/ProgrammesView';
import { ParticipantDashboardView } from './views/ParticipantDashboardView';
import { CommunityImpactView } from './views/CommunityImpactView';
import { StoriesView } from './views/StoriesView';
import { ContactLegalView } from './views/ContactLegalView';
import { AdminPlatformView } from './views/AdminPlatformView';
import { DialoguesView } from './views/DialoguesView';
import { PerspectivesView } from './views/PerspectivesView';
import { FellowsView } from './views/FellowsView';
import { ExperienceView } from './views/ExperienceView';
import { ImpactView } from './views/ImpactView';
import { CommunityView } from './views/CommunityView';
import { ApplicationClosedView } from './views/ApplicationClosedView';

const MainContent: React.FC = () => {
  const { currentRoute, isApplyModalOpen, closeApplyModal, cmsContent, registrationStatus } = useAuvreo();

  const renderCurrentView = () => {
    switch (currentRoute) {
      case 'home':
        return <HomeView />;
      case 'about':
      case 'pillars':
        return <AboutView />;
      case 'dialogues':
        return <DialoguesView />;
      case 'perspectives':
        return <PerspectivesView />;
      case 'fellows':
        return <FellowsView />;
      case 'experience':
        return <ExperienceView />;
      case 'summit':
      case 'delhi':
      case 'fees':
      case 'faq':
        return <SummitView initialSection={currentRoute} />;
      case 'apply':
      case 'register':
      case 'apply-status':
      case 'registration':
      case 'summit-apply':
        return <ApplicationClosedView />;
      case 'programmes':
        return <ProgrammesView />;
      case 'auvresence':
      case 'dashboard':
        return <ParticipantDashboardView />;
      case 'impact':
        return <ImpactView />;
      case 'community':
        return <CommunityView />;
      case 'stories':
        return <StoriesView />;
      case 'contact':
        return <ContactLegalView initialTab="contact" />;
      case 'legal':
        return <ContactLegalView initialTab="legal" />;
      case 'admin':
        return <AdminPlatformView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080203] text-[#fcfaf7] antialiased selection:bg-[#e51e2b] selection:text-white">
      {/* Main Header (contains the single, official alert banner when enabled) */}
      <Header />

      {/* Primary Page Canvas */}
      <main className="flex-1 w-full">
        {renderCurrentView()}
      </main>

      {/* Global Google Authentication Modal */}
      <AuthModal />

      {/* Global Registration Modal (strictly disabled while applications are closed) */}
      {isApplyModalOpen && registrationStatus === 'open' && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center">
          <RegistrationFlow onClose={closeApplyModal} />
        </div>
      )}

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AuvreoProvider>
      <MainContent />
    </AuvreoProvider>
  );
}
