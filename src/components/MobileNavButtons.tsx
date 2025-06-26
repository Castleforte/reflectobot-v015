import React from 'react';
import { playHoverAudio, playButtonClickAudio } from '../utils/audioManager';

interface MobileNavButtonsProps {
  onNavButtonClick: (screen: 'welcome' | 'settings' | 'chat' | 'daily-checkin' | 'what-if' | 'draw-it-out' | 'challenges' | 'my-bot') => void;
  currentScreen: 'welcome' | 'settings' | 'chat' | 'daily-checkin' | 'what-if' | 'draw-it-out' | 'challenges' | 'my-bot';
  soundEnabled: boolean;
}

function MobileNavButtons({ onNavButtonClick, currentScreen, soundEnabled }: MobileNavButtonsProps) {
  const handleButtonHover = () => {
    if (soundEnabled) {
      playHoverAudio('/audio/buttons.mp3');
    }
  };

  const handleButtonClick = (screen: 'welcome' | 'settings' | 'chat' | 'daily-checkin' | 'what-if' | 'draw-it-out' | 'challenges' | 'my-bot') => {
    if (soundEnabled) {
      playButtonClickAudio('/audio/button-click.mp3');
    }
    onNavButtonClick(screen);
  };

  return (
    <div className="mobile-nav-buttons lg:hidden">
      <div className="nav-buttons">
        <button 
          className={`nav-button ${currentScreen === 'chat' ? 'nav-button-active' : ''}`}
          onClick={() => handleButtonClick('chat')}
          onMouseEnter={handleButtonHover}
        >
          <img src="/Chat-icon.png" alt="Chat" className="nav-button-icon" />
          <span className="nav-button-text">Chat</span>
        </button>
        <button 
          className={`nav-button ${currentScreen === 'daily-checkin' ? 'nav-button-active' : ''}`}
          onClick={() => handleButtonClick('daily-checkin')}
          onMouseEnter={handleButtonHover}
        >
          <img src="/Mood-icon.png" alt="Daily Check-In" className="nav-button-icon" />
          <span className="nav-button-text nav-button-text-multiline">Daily<br />Check-In</span>
        </button>
        <button 
          className={`nav-button ${currentScreen === 'what-if' ? 'nav-button-active' : ''}`}
          onClick={() => handleButtonClick('what-if')}
          onMouseEnter={handleButtonHover}
        >
          <img src="/Pencil-icon.png" alt="What If...?" className="nav-button-icon" />
          <span className="nav-button-text max-lg:whitespace-normal max-lg:text-center">What If...?</span>
        </button>
        <button 
          className={`nav-button ${currentScreen === 'draw-it-out' ? 'nav-button-active' : ''}`}
          onClick={() => handleButtonClick('draw-it-out')}
          onMouseEnter={handleButtonHover}
        >
          <img src="/Palette-icon.png" alt="Draw It Out" className="nav-button-icon" />
          <span className="nav-button-text max-lg:whitespace-normal max-lg:text-center">Draw It<br />Out</span>
        </button>
        <button 
          className={`nav-button ${currentScreen === 'challenges' ? 'nav-button-active' : ''}`}
          onClick={() => handleButtonClick('challenges')}
          onMouseEnter={handleButtonHover}
        >
          <img src="/Trophy-icon.png" alt="Challenges" className="nav-button-icon" />
          <span className="nav-button-text">Challenges</span>
        </button>
        <button 
          className={`nav-button ${currentScreen === 'my-bot' ? 'nav-button-active' : ''}`}
          onClick={() => handleButtonClick('my-bot')}
          onMouseEnter={handleButtonHover}
        >
          <img src="/Robot-icon.png" alt="My Bot" className="nav-button-icon" />
          <span className="nav-button-text">My Bot</span>
        </button>
      </div>
    </div>
  );
}

export default MobileNavButtons;