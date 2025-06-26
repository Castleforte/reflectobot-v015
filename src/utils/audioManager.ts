import { loadProgress } from './progressManager';

let currentAudio: HTMLAudioElement | null = null;
let currentHoverAudio: HTMLAudioElement | null = null;
let greetingAnimationInterval: NodeJS.Timeout | null = null;

export const playExclusiveAudio = (
  src: string, 
  setIsRobotSpeaking?: (speaking: boolean) => void,
  setRobotPose?: (pose: string) => void,
  greetingPoses?: string[],
  idlePose?: string
) => {
  // Check if voices are enabled
  const progress = loadProgress();
  if (!progress.voicesEnabled) {
    return;
  }

  // Stop any hover audio when main robot speech starts
  stopHoverAudio();
  
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  
  currentAudio = new Audio(src);
  
  // Set robot speaking state when audio starts
  if (setIsRobotSpeaking) {
    setIsRobotSpeaking(true);
  }
  
  // Start greeting animation if poses are provided
  if (setRobotPose && greetingPoses && greetingPoses.length > 0) {
    startGreetingAnimation(setRobotPose, greetingPoses);
  }
  
  // Handle audio end
  currentAudio.onended = () => {
    if (setIsRobotSpeaking) {
      setIsRobotSpeaking(false);
    }
    stopGreetingAnimation(setRobotPose, idlePose);
    currentAudio = null;
  };
  
  // Handle audio error
  currentAudio.onerror = () => {
    console.warn('Failed to play audio:', src);
    if (setIsRobotSpeaking) {
      setIsRobotSpeaking(false);
    }
    stopGreetingAnimation(setRobotPose, idlePose);
    currentAudio = null;
  };
  
  currentAudio.play().catch(error => {
    console.warn('Failed to play audio:', error);
    if (setIsRobotSpeaking) {
      setIsRobotSpeaking(false);
    }
    stopGreetingAnimation(setRobotPose, idlePose);
    currentAudio = null;
  });
};

const startGreetingAnimation = (setRobotPose: (pose: string) => void, greetingPoses: string[]) => {
  console.log('🎭 Starting greeting animation with poses:', greetingPoses);
  
  let currentPoseIndex = 0;
  
  // Set initial pose
  setRobotPose(greetingPoses[currentPoseIndex]);
  
  // Start animation interval - cycle through poses every 500ms
  greetingAnimationInterval = setInterval(() => {
    currentPoseIndex = (currentPoseIndex + 1) % greetingPoses.length;
    setRobotPose(greetingPoses[currentPoseIndex]);
    console.log('🎭 Greeting pose changed to:', greetingPoses[currentPoseIndex].split('/').pop());
  }, 500);
};

const stopGreetingAnimation = (setRobotPose?: (pose: string) => void, idlePose?: string) => {
  console.log('🎭 Stopping greeting animation');
  
  if (greetingAnimationInterval) {
    clearInterval(greetingAnimationInterval);
    greetingAnimationInterval = null;
  }
  
  // Return robot to idle pose
  if (setRobotPose && idlePose) {
    setRobotPose(idlePose);
  }
};

export const stopCurrentAudio = (setIsRobotSpeaking?: (speaking: boolean) => void, setRobotPose?: (pose: string) => void, idlePose?: string) => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  
  // Stop greeting animation when audio is stopped
  stopGreetingAnimation(setRobotPose, idlePose);
  
  if (setIsRobotSpeaking) {
    setIsRobotSpeaking(false);
  }
};

export const playHoverAudio = (src: string) => {
  // Check if sounds are enabled
  const progress = loadProgress();
  if (!progress.soundsEnabled) {
    return;
  }

  // Immediately stop any currently playing hover audio
  if (currentHoverAudio) {
    currentHoverAudio.pause();
    currentHoverAudio.currentTime = 0;
  }
  
  // Create and play new hover audio
  currentHoverAudio = new Audio(src);
  
  // Set volume lower for hover sounds (reduced by 30%)
  currentHoverAudio.volume = 0.7;
  
  // Clean up when audio ends
  currentHoverAudio.onended = () => {
    currentHoverAudio = null;
  };
  
  // Clean up on error
  currentHoverAudio.onerror = () => {
    console.warn('Failed to play hover audio:', src);
    currentHoverAudio = null;
  };
  
  // Play immediately
  currentHoverAudio.play().catch(error => {
    console.warn('Failed to play hover audio:', error);
    currentHoverAudio = null;
  });
};

export const stopHoverAudio = () => {
  if (currentHoverAudio) {
    currentHoverAudio.pause();
    currentHoverAudio.currentTime = 0;
    currentHoverAudio = null;
  }
};

export const playButtonClickAudio = (src: string) => {
  // Check if sounds are enabled
  const progress = loadProgress();
  if (!progress.soundsEnabled) {
    return;
  }

  // Create a new audio instance for button clicks (don't interfere with other audio)
  const clickAudio = new Audio(src);
  
  // Set volume lower for button clicks (reduced by 30%)
  clickAudio.volume = 0.7;
  
  // Clean up when audio ends
  clickAudio.onended = () => {
    // Audio will be garbage collected
  };
  
  // Clean up on error
  clickAudio.onerror = () => {
    console.warn('Failed to play button click audio:', src);
  };
  
  // Play immediately
  clickAudio.play().catch(error => {
    console.warn('Failed to play button click audio:', error);
  });
};

// New function specifically for robot name audio (controlled by voices toggle)
export const playRobotNameAudio = (src: string) => {
  // Check if voices are enabled
  const progress = loadProgress();
  if (!progress.voicesEnabled) {
    return;
  }

  // Stop any currently playing hover audio to prevent interference
  stopHoverAudio();

  // Create a new audio instance for robot names (don't interfere with other audio)
  const nameAudio = new Audio(src);
  
  // Set volume lower for name audio (reduced by 30%)
  nameAudio.volume = 0.7;
  
  // Clean up when audio ends
  nameAudio.onended = () => {
    // Audio will be garbage collected
  };
  
  // Clean up on error
  nameAudio.onerror = () => {
    console.warn('Failed to play robot name audio:', src);
  };
  
  // Play immediately
  nameAudio.play().catch(error => {
    console.warn('Failed to play robot name audio:', error);
  });
};