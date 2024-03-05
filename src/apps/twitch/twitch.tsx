import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';

import styles from './styles.module.scss';
import clsx from 'clsx';
import { faPlay } from '@fortawesome/pro-solid-svg-icons/faPlay';
import { faPause } from '@fortawesome/pro-solid-svg-icons/faPause';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router';

let player: any;

export default function TwitchComponent() {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isMouseActive, setIsMouseActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [mouseTimeoutId, setMouseTimeoutId] = useState<NodeJS.Timeout>();
  const { user } = useParams();

  const options = {
    width: 1280,
    height: 720,
    controls: false,
    channel: user,
    autoplay: true,
    muted: false,
  };

  function togglePlayback() {
    if (player.isPaused()) {
      player.play();
      // There is a slight delay between clicking unpause and the video resuming, so immediately show the correct icon to show the customer's click was registered
      setIsPaused(false);
    } else {
      player.pause();
    }
  }

  const keyboardShortcutListener = useCallback((event: KeyboardEvent): void => {
    if (event.code === 'KeyK') {
      togglePlayback();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', keyboardShortcutListener);
    return () => {
      document.removeEventListener('keydown', keyboardShortcutListener);
    };
  }, [keyboardShortcutListener]);

  useLayoutEffect(() => {
    if (player) {
      return;
    }
    // @ts-ignore
    player = new Twitch.Player('twitch-player', options);
    // @ts-ignore
    player.addEventListener(Twitch.Player.PAUSE, () => setIsPaused(true));
    // @ts-ignore
    player.addEventListener(Twitch.Player.PLAY, () => setIsPaused(false));
    player.setMuted(false);
  }, []);

  function handleClick() {
    togglePlayback();
  }

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  function handleMouseMove() {
    clearTimeout(mouseTimeoutId);
    setIsMouseActive(true);
    const newTimeoutId = setTimeout(() => setIsMouseActive(false), 3000);
    setMouseTimeoutId(newTimeoutId);
  }

  const shouldShowControls = isPaused || (isHovered && isMouseActive);

  return (
    <div className={styles.pageWrapper}>
      <div id="twitch-player" className={styles.playerWrapper}>
        <div
          className={clsx(styles.overlayWrapper, shouldShowControls && styles.visible)}
          onClick={handleClick}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={styles.overlay}>
            <div className={styles.controls}>
              <div className={styles.button} onClick={handleClick}>
                <FontAwesomeIcon size="2x" icon={isPaused ? faPlay : faPause} color="white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
