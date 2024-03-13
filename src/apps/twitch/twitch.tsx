import React, { useCallback, useEffect, useLayoutEffect, useState, MouseEvent } from 'react';

import styles from './styles.module.scss';
import clsx from 'clsx';
import { faPlay } from '@fortawesome/pro-solid-svg-icons/faPlay';
import { faPause } from '@fortawesome/pro-solid-svg-icons/faPause';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router';
import { faVolume } from '@fortawesome/pro-solid-svg-icons/faVolume';
import { faVolumeLow } from '@fortawesome/pro-solid-svg-icons/faVolumeLow';
import { faVolumeSlash } from '@fortawesome/pro-solid-svg-icons/faVolumeSlash';

let player: any;

export default function TwitchComponent() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isMouseActive, setIsMouseActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [mouseTimeoutId, setMouseTimeoutId] = useState<NodeJS.Timeout>();
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volumeLevel, setVolumeLevel] = useState<number>(1);
  const { user } = useParams();

  const options = {
    width: 1280,
    height: 720,
    controls: false,
    channel: user,
    autoplay: false,
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
    console.log(event.code);
    if (event.code === 'KeyK') {
      togglePlayback();
      return event.preventDefault();
    }
    if (event.code === 'ArrowDown') {
      const newVolume = player.getVolume() - 0.05;
      player.setVolume(newVolume);
      setVolumeLevel(newVolume);
      return event.preventDefault();
    }
    if (event.code === 'ArrowUp') {
      const newVolume = player.getVolume() + 0.05;
      player.setVolume(newVolume);
      setVolumeLevel(newVolume);
      return event.preventDefault();
    }
    if (event.code === 'KeyM') {
      const newIsMuted = !player.getMuted();
      player.setMuted(newIsMuted);
      setIsMuted(newIsMuted);
      return event.preventDefault();
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
    player.addEventListener(Twitch.Player.PLAY, () => {
      setIsLoading(false);
      setIsPaused(false);
    });
    // @ts-ignore
    player.addEventListener(Twitch.Player.READY, () => {
      player.play();
      player.setMuted(false);
      setVolumeLevel(player.getVolume());
    });
  }, []);

  function handleVolumeClick(event: MouseEvent) {
    const newIsMuted = !player.getMuted();
    player.setMuted(newIsMuted);
    setIsMuted(newIsMuted);
    event.stopPropagation();
  }

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

  const shouldShowControls = !isLoading && (isPaused || (isHovered && isMouseActive));

  console.log(player?.getVolume());

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
                <FontAwesomeIcon
                  style={{ width: '22px', height: '22px' }}
                  fixedWidth
                  icon={isPaused ? faPlay : faPause}
                  color="white"
                />
              </div>
              <div className={styles.button} onClick={handleVolumeClick}>
                <FontAwesomeIcon
                  style={{ width: '22px', height: '22px' }}
                  fixedWidth
                  icon={
                    player?.getVolume() === 0 || isMuted
                      ? faVolumeSlash
                      : volumeLevel > 0.5
                        ? faVolume
                        : faVolumeLow
                  }
                  color="white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
