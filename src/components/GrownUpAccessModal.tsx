import React from 'react';
import { X } from 'lucide-react';
import { updateProgress, loadProgress } from '../utils/progressManager';
import { playHoverAudio, playButtonClickAudio } from '../utils/audioManager';

interface GrownUpAccessModalProps {
  onClose: () => void;
  onBadgeEarned: (badgeId: string) => void;
  soundEnabled: boolean;
}

function GrownUpAccessModal({ onClose, onBadgeEarned, soundEnabled }: GrownUpAccessModalProps) {
  const handleButtonHover = () => {
    if (soundEnabled) {
      playHoverAudio('/audio/buttons.mp3');
    }
  };

  const handleButtonClick = () => {
    if (soundEnabled) {
      playButtonClickAudio('/audio/button-click.mp3');
    }
  };

  const handleDownloadSessionSummary = () => {
    handleButtonClick();
    console.log('📝 Session summary PDF exported');
    
    // ✅ Immediately update the export count
    const progress = loadProgress();
    updateProgress({ pdfExportCount: progress.pdfExportCount + 1 });
    
    console.log('📈 Export count incremented:', progress.pdfExportCount + 1);
    
    // ✅ Immediately check for Great Job badge - ONLY called here
    onBadgeEarned('great_job');
    
    // TODO: Implement actual session summary download
    console.log('Download session summary clicked');
  };

  const handleClose = () => {
    handleButtonClick();
    onClose();
  };

  return (
    <div className="grown-up-modal-overlay" onClick={handleClose}>
      <div className="grown-up-modal-container">
        <div className="grown-up-modal-content" onClick={e => e.stopPropagation()}>
          <button 
            className="absolute top-5 right-5 w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200 lg:w-12 lg:h-12 grown-up-modal-close-button"
            onClick={handleClose}
            onMouseEnter={handleButtonHover}
            aria-label="Close modal"
          >
            <X size={22} strokeWidth={4} />
          </button>

          <div className="grown-up-modal-header">
            <img src="/Shield-icon.png" alt="Shield" className="grown-up-modal-icon" />
            <h1 className="grown-up-modal-title">Grown-Up Access</h1>
          </div>

          <h2 className="grown-up-modal-subtitle">Welcome, Grown-Up!</h2>

          <div className="grown-up-modal-body">
            <p className="grown-up-modal-intro">
              This space is just for you-to better understand how ReflectoBot helps kids grow emotionally, 
              think creatively, and build healthy habits of reflection.
            </p>

            <div className="grown-up-modal-section">
              <h3 className="grown-up-modal-section-title">What ReflectoBot Teaches:</h3>
              <ul className="grown-up-modal-list">
                <li>• Emotional awareness and expression</li>
                <li>• Empathy and kindness</li>
                <li>• Confidence and creative thinking</li>
                <li>• Mindfulness and perspective-taking</li>
              </ul>
            </div>

            <div className="grown-up-modal-section">
              <h3 className="grown-up-modal-section-title">What Your Child Can Do:</h3>
              <ul className="grown-up-modal-list">
                <li>• Talk to Reflekto, their AI buddy</li>
                <li>• Check in with how they feel</li>
                <li>• Draw their emotions</li>
                <li>• Explore thoughtful What if...? questions</li>
                <li>• Complete creative challenges</li>
                <li>• Earn digital badges that celebrate growth</li>
              </ul>
            </div>

            <div className="grown-up-modal-section">
              <h3 className="grown-up-modal-section-title">Privacy & Safety:</h3>
              <ul className="grown-up-modal-list">
                <li>• No accounts or personal data required</li>
                <li>• Everything is stored locally on your device</li>
                <li>• Conversations stay private and safe</li>
              </ul>
            </div>

            <button 
              className="grown-up-modal-download-button"
              onClick={handleDownloadSessionSummary}
              onMouseEnter={handleButtonHover}
            >
              Download Session Summary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GrownUpAccessModal;