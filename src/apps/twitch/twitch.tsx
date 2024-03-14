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

import styles from './styles.module.scss';
import widgetDetails from 'common/widget-details';
import useTitle from 'utilities/use-title';
import ButtonDropdown from '@cloudscape-design/components/button-dropdown';
import { faCog } from '@fortawesome/pro-solid-svg-icons/faCog';
import clsx from 'clsx';

export default function TwitchComponent() {
  const player = useRef<any>(null);
  const navigate = useNavigate();
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volumeLevel, setVolumeLevel] = useState<Big>(new Big(1));
  const playerWrapperRef = useRef<HTMLDivElement>(null);
  const [playerWidth, setPlayerWidth] = useState<string>('10px');
  const [playerHeight, setPlayerHeight] = useState<string>('10px');
  const { user } = useParams();
  useTitle(user, { isNested: true });
  const [channelValue, setChannelValue] = useState<string>(user ?? '');

  // Force player to update channel when URL changes
  useEffect(() => {
    player.current?.setChannel(user);
  }, [user]);

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

  const keyboardShortcutListener = useCallback((event: KeyboardEvent): void => {
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
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', keyboardShortcutListener);
    return () => {
      document.removeEventListener('keydown', keyboardShortcutListener);
    };
  }, [keyboardShortcutListener]);

  useLayoutEffect(() => {
    if (!playerWrapperRef.current) {
      return;
    }
    const playerObserver = new ResizeObserver((entries, observer) => {
      const { width } = entries[0].contentRect;
      setPlayerWidth(`${width}px`);
      setPlayerHeight(`${(width * 9) / 16}px`);
    });
    playerObserver.observe(playerWrapperRef.current);
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

  const volumeIcon =
    isMuted || Number(volumeLevel) === 0
      ? faVolumeSlash
      : Number(volumeLevel) < 0.5
        ? faVolumeLow
        : faVolume;

  return (
    <ContentLayout
      header={
        <Header variant="h1" description={widgetDetails.twitch.description}>
          {widgetDetails.twitch.title}
        </Header>
      }
    >
      <Grid
        gridDefinition={[
          { colspan: { default: 12, m: 3 }, push: { default: 0, m: 9 } },
          { colspan: { default: 12, m: 9 }, pull: { default: 0, m: 3 } },
        ]}
      >
        <div className={styles.container}>
          <form onSubmit={(e) => e.preventDefault()}>
            <FormField
              label="Channel"
              description="Only livestreams are supported at this time."
              constraintText="Enter the exact name of a Twitch channel."
              secondaryControl={
                <Button formAction="submit" onClick={handleLoadStreamer}>
                  Watch channel
                </Button>
              }
            >
              <Input
                type="search"
                // Don't bubble up to keyboard shortcuts
                onKeyDown={(e) => e.stopPropagation()}
                onChange={(e) => setChannelValue(e.detail.value)}
                value={channelValue}
              />
            </FormField>
          </form>
        </div>
        <SpaceBetween size="xs">
          <div className={clsx(styles.playerWrapper, styles.container)}>
            <div
              id="twitch-player"
              ref={playerWrapperRef}
              style={{ height: playerHeight }}
              className={styles.player}
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
              <div>
                <ButtonDropdown
                  expandToViewport
                  expandableGroups
                  items={[
                    {
                      text: 'Quality',
                      items:
                        player.current?.getQualities()?.map((quality: any) => {
                          // TODO: Take out of loop
                          const current = player.current?.getQuality();
                          return {
                            iconName: current === quality.name ? 'check' : undefined,
                            text: quality.name,
                            id: quality.name,
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
              </div>
            </div>
          </div>
        </SpaceBetween>
      </Grid>
    </ContentLayout>
  );
}
