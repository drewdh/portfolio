import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { faPlay } from '@fortawesome/pro-solid-svg-icons/faPlay';
import { faPause } from '@fortawesome/pro-solid-svg-icons/faPause';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from 'react-router';
import { faVolume } from '@fortawesome/pro-solid-svg-icons/faVolume';
import { faVolumeLow } from '@fortawesome/pro-solid-svg-icons/faVolumeLow';
import { faVolumeSlash } from '@fortawesome/pro-solid-svg-icons/faVolumeSlash';
import Button from '@cloudscape-design/components/button';
import Box from '@cloudscape-design/components/box';
import Icon from '@cloudscape-design/components/icon';
import FormField from '@cloudscape-design/components/form-field';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Input from '@cloudscape-design/components/input';
import { Big } from 'big.js';
import Grid from '@cloudscape-design/components/grid';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import { Badge, NonCancelableCustomEvent } from '@cloudscape-design/components';
import ButtonDropdown, { ButtonDropdownProps } from '@cloudscape-design/components/button-dropdown';
import { faExpand, faCog, faCompress } from '@fortawesome/pro-solid-svg-icons';
import clsx from 'clsx';

import styles from './styles.module.scss';
import widgetDetails from 'common/widget-details';
import useTitle from 'utilities/use-title';
import Container from '@cloudscape-design/components/container';
import Link from '@cloudscape-design/components/link';
import Alert from '@cloudscape-design/components/alert';
import { useGetStreamByUserLogin, useGetUser } from '../api';
import Avatar from '../avatar';
import RelativeTime from 'common/relative-time';
import Chat from './chat';

export default function TwitchComponent() {
  const isFullscreenSupported = document.fullscreenEnabled;
  const player = useRef<any>(null);
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volumeLevel, setVolumeLevel] = useState<Big>(new Big(1));
  const twitchPlayerRef = useRef<HTMLDivElement>(null);
  const playerWrapperRef = useRef<HTMLDivElement>(null);
  const [playerHeight, setPlayerHeight] = useState<string>('10px');
  const [quality, setQuality] = useState<string>('auto');
  const { user } = useParams();
  useTitle(user, { isNested: true });
  const [channelValue, setChannelValue] = useState<string>(user ?? '');

  useEffect(() => {
    // Force player to update channel when URL changes
    player.current?.setChannel(user);
  }, [user]);

  // Viewer count seems to be updated every 60 seconds, so let's refetch that often
  const { data } = useGetStreamByUserLogin(user, { refetchInterval: 1000 * 60 });
  const streamData = data?.data?.[0];

  const options = {
    allowfullscreen: false,
    width: '100%',
    height: '100%',
    controls: false,
    channel: user,
    autoplay: true,
    muted: false,
  };

  function togglePlayback() {
    if (player.current?.isPaused()) {
      player.current?.play();
      // There is a slight delay between clicking unpause and the video resuming, so immediately
      // show the correct icon to show the customer's click was registered
      setIsPaused(false);
    } else {
      player.current?.pause();
    }
  }

  const toggleFullscreen = useCallback(() => {
    if (!isFullscreenSupported) {
      return;
    }
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      playerWrapperRef.current?.requestFullscreen();
    }
    setIsFullscreen(!document.fullscreenElement);
  }, [isFullscreenSupported]);

  const keyboardShortcutListener = useCallback(
    (event: KeyboardEvent): void => {
      if (event.code === 'KeyK') {
        togglePlayback();
        return event.preventDefault();
      }
      if (event.code === 'ArrowDown') {
        setVolumeLevel((prevVolume) => {
          if (prevVolume.toNumber() === 0) {
            return prevVolume;
          }
          const newVolume = prevVolume.minus(0.05);
          player.current?.setVolume(Number(newVolume));
          return newVolume;
        });
        return event.preventDefault();
      }
      if (event.code === 'ArrowUp') {
        setVolumeLevel((prevVolume) => {
          if (prevVolume.toNumber() === 1) {
            return prevVolume;
          }
          const newVolume = prevVolume.plus(0.05);
          player.current?.setVolume(Number(newVolume));
          return newVolume;
        });
        return event.preventDefault();
      }
      if (event.code === 'KeyM') {
        const newIsMuted = !player.current?.getMuted();
        player.current?.setMuted(newIsMuted);
        setIsMuted(newIsMuted);
        return event.preventDefault();
      }
      if (event.code === 'KeyF') {
        toggleFullscreen();
      }
    },
    [toggleFullscreen]
  );

  const updateFullscreen = useCallback((): void => {
    setIsFullscreen(!!document.fullscreenElement);
  }, []);

  useEffect(() => {
    const current = playerWrapperRef.current;
    current?.addEventListener('fullscreenchange', updateFullscreen);
    return () => current?.removeEventListener('fullscreenchange', updateFullscreen);
  }, [updateFullscreen]);

  useEffect(() => {
    document.addEventListener('keydown', keyboardShortcutListener);
    return () => {
      document.removeEventListener('keydown', keyboardShortcutListener);
    };
  }, [keyboardShortcutListener]);

  useLayoutEffect(() => {
    if (!twitchPlayerRef.current) {
      return;
    }
    const playerObserver = new ResizeObserver((entries, observer) => {
      console.log(entries);
      const { width } = entries[0].contentRect;
      setPlayerHeight(`${(width * 9) / 16}px`);
    });
    playerObserver.observe(twitchPlayerRef.current);
    return () => playerObserver.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!player.current) {
      // @ts-ignore
      player.current = new Twitch.Player('twitch-player', options);
    }
    // @ts-ignore
    player.current?.addEventListener(Twitch.Player.PAUSE, () => setIsPaused(true));
    // @ts-ignore
    player.current?.addEventListener(Twitch.Player.PLAY, () => {
      setIsPaused(false);
      player.current?.setMuted(false);
      setIsMuted(player.current?.getMuted());
      console.log(player.current?.getPlayerState());
      console.log(player.current?.getQualities());
    });
    // @ts-ignore
    player.current?.addEventListener(Twitch.Player.READY, () => {
      player.current?.play();
      player.current?.setMuted(false);
      player.current?.setVolume(volumeLevel.toNumber());
      setVolumeLevel(new Big(player.current?.getVolume()));
    });
    // return () => (player = undefined);
  }, []);

  function handleVolumeClick() {
    if (player.current?.getVolume() === 0) {
      player.current?.setVolume(1);
      return setVolumeLevel(Big(1));
    }
    const newIsMuted = !player.current?.getMuted();
    player.current?.setMuted(newIsMuted);
    setIsMuted(newIsMuted);
  }

  function handleLoadStreamer() {
    navigate(`/twitch/${channelValue}`);
  }

  function handleSettingsClick(
    event: NonCancelableCustomEvent<ButtonDropdownProps.ItemClickDetails>
  ) {
    const newQuality = event.detail.id;
    setQuality(newQuality);
    player.current?.setQuality(newQuality);
  }

  const volumeIcon =
    isMuted || Number(volumeLevel) === 0
      ? faVolumeSlash
      : Number(volumeLevel) < 0.5
        ? faVolumeLow
        : faVolume;

  return (
    <ContentLayout>
      <Grid
        gridDefinition={[
          { colspan: { default: 12, l: 9, m: 8, s: 7 } },
          { colspan: { default: 12, l: 3, m: 4, s: 5 } },
        ]}
      >
        <SpaceBetween size="s">
          <div
            className={clsx(
              styles.playerWrapper,
              styles.container,
              isFullscreen && styles.fullscreen
            )}
            ref={playerWrapperRef}
          >
            <div
              id="twitch-player"
              ref={twitchPlayerRef}
              style={{ height: playerHeight }}
              className={clsx(styles.player, isFullscreen && styles.fullscreen)}
            />
            <div className={styles.controlsPositioner}>
              <div className={styles.controlsContainer}>
                <Button variant="inline-link" onClick={togglePlayback}>
                  <div className={styles.icon}>
                    <Icon
                      alt="Toggle playback"
                      svg={<FontAwesomeIcon icon={isPaused ? faPlay : faPause} />}
                    />
                  </div>
                </Button>
                <Button variant="inline-link" onClick={handleVolumeClick}>
                  <div className={styles.icon}>
                    <Icon alt="Volume" svg={<FontAwesomeIcon icon={volumeIcon} />} />
                  </div>
                </Button>
                <Box color="text-status-inactive" fontSize="body-s">
                  {isMuted ? 'Muted' : `${volumeLevel.times(100).toNumber()}%`}
                </Box>
              </div>
              <SpaceBetween size="s" direction="horizontal" alignItems="center">
                {!isFullscreen && (
                  <ButtonDropdown
                    expandToViewport
                    expandableGroups
                    onItemClick={handleSettingsClick}
                    items={[
                      {
                        text: 'Quality',
                        items:
                          player.current?.getQualities()?.map((option: any) => {
                            return {
                              iconName: quality === option.name ? 'check' : undefined,
                              text: option.name,
                              id: option.name,
                            };
                          }) ?? [],
                      },
                    ]}
                    variant="icon"
                  >
                    <div className={styles.icon}>
                      <Icon alt="Settings" svg={<FontAwesomeIcon icon={faCog} />} />
                    </div>
                  </ButtonDropdown>
                )}
                {isFullscreenSupported && (
                  <Button variant="inline-link" onClick={toggleFullscreen}>
                    <div className={styles.icon}>
                      <Icon
                        alt="Toggle fullscreen"
                        svg={<FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />}
                      />
                    </div>
                  </Button>
                )}
              </SpaceBetween>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <Box fontSize="heading-m" fontWeight="bold">
                {streamData?.title}
              </Box>
              <Box padding={{ top: 'xxs' }}>
                Streaming <b>{streamData?.game_name}</b>
              </Box>
            </div>
            <div style={{ whiteSpace: 'nowrap' }}>
              <Box padding={{ left: 's', top: 'xxs' }}>
                <Box fontWeight="bold" textAlign="right">
                  {Number(streamData?.viewer_count).toLocaleString()} watching now
                </Box>
                <Box color="text-status-inactive" fontSize="body-s" textAlign="right">
                  Started <RelativeTime date={streamData?.started_at} inline />
                </Box>
              </Box>
            </div>
          </div>
          <SpaceBetween size="s" direction="horizontal" alignItems="center">
            <Avatar userName={user ?? ''} />
            <Box variant="h3" padding="n">
              {streamData?.user_name}
            </Box>
          </SpaceBetween>
        </SpaceBetween>
        <SpaceBetween size="l">
          <Chat
            broadcasterUserId={streamData?.user_id}
            height={playerWrapperRef.current?.offsetHeight}
          />
        </SpaceBetween>
      </Grid>
    </ContentLayout>
  );
}
