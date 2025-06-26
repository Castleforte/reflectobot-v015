import React from 'react';
import { allBadges } from '../badgeData';
import { ReflectoBotProgress } from '../types';
import { playHoverAudio, playButtonClickAudio } from '../utils/audioManager';

interface MyBadgesPageProps {
  progress: ReflectoBotProgress;
  onNextChallenge: () => void;
  soundEnabled: boolean;
}

function MyBadgesPage({ progress, onNextChallenge, soundEnabled }: MyBadgesPageProps) {
  const handleButtonHover = () => {
    if (soundEnabled) {
      playHoverAudio('/audio/buttons.mp3');
    }
  };

  const handleButtonClick = () => {
    if (soundEnabled) {
      playButtonClickAudio('/audio/button-click.mp3');
    }
    onNextChallenge();
  };

  const handleBadgeHover = () => {
    if (soundEnabled) {
      playHoverAudio('/audio/buttons.mp3');
    }
  };

  return (
    <div className="my-badges-content">
      <div className="my-badges-header">
        <h1 className="my-badges-title">My Badges</h1>
        <div className="my-badges-header-right">
          <span id="badge-counter" className="badges-collected-indicator">{progress.badgeCount} of 18 Collected!</span>
          <button 
            className="next-challenge-header-button"
            onClick={handleButtonClick}
            onMouseEnter={handleButtonHover}
          >
            <img src="/My_Badges_Button_Icon.png" alt="Next Challenge" className="button-icon" />
            <span className="font-bold leading-none">Next Challenge</span>
          </button>
        </div>
      </div>

      <div className="badges-grid">
        {allBadges.map((badge) => {
          const isEarned = progress.badges[badge.id];
          return (
            <div 
              key={badge.id}
              className={`badge-item ${isEarned ? 'badge-earned' : 'badge-unearned'}`}
              onMouseEnter={handleBadgeHover}
            >
              <img 
                src={badge.icon}
                alt={badge.name}
                className="badge-icon"
              />
              <span className="badge-label">{badge.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyBadgesPage;