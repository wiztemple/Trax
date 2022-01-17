import { useEffect, useRef, useState } from "react";
import {
  ButtonGroup,
  Box,
  IconButton,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  RangeSlider,
  Center,
  Flex,
  Text,
} from "@chakra-ui/react";
import ReactHowler from "react-howler";
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from "react-icons/md";
import { useStoreActions } from "easy-peasy";
import { formatTime } from "../lib/formatters";

const Player = ({ songs, activeSong }) => {
  const [playing, setPlaying] = useState(true);
  const [index, setIndex] = useState(
    songs.findIndex((s) => s.id === activeSong.id)
  );
  const [seek, setSeek] = useState(0.0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0.0);
  const repeatRef = useRef(repeat);
  const soundRef = useRef(null);

  const setActiveSong = useStoreActions((store: any) => store.changeActiveSong);

  useEffect(() => {
    let timerId;
    if (playing && !isSeeking) {
      const f = () => {
        setSeek(soundRef.current.seek());
        timerId = requestAnimationFrame(f);
        return () => cancelAnimationFrame(timerId);
      };

      timerId = requestAnimationFrame(f);
      return () => cancelAnimationFrame(timerId);
    }
    cancelAnimationFrame(timerId);
  }, [playing, isSeeking]);

  useEffect(() => {
    setActiveSong(songs[index]);
  }, [index, setActiveSong, songs]);

  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  const setPlayState = (value) => setPlaying(value);

  const prevSong = () => {
    setIndex((state) => {
      return state ? state - 1 : songs.length - 1;
    });
  };

  const nextSong = () => {
    setIndex((state: any) => {
      if (shuffle) {
        // shuffle logic
        const next = Math.floor(Math.random() * songs.length);

        if (next === state) {
          return nextSong();
        }
        return next;
      }

      return state === songs.length - 1 ? 0 : state + 1;
    });
  };

  const onEnd = () => {
    if (repeatRef.current) {
      setSeek(0);
      soundRef.current.seeek();
    } else {
      nextSong();
    }
  };

  const onSeek = (e) => {
    setSeek(parseFloat(e[0]));
    soundRef.current.seek(e[0]);
  };

  const onSongLoad = () => {
    const songDuration = soundRef.current.duration();
    setDuration(songDuration);
  };

  return (
    <Box>
      <Box>
        <ReactHowler
          playing={playing}
          src={activeSong?.url}
          ref={soundRef}
          onLoad={onSongLoad}
          onEnd={onEnd}
        />
      </Box>
      <Center color="gray.600">
        <ButtonGroup spacing={4}>
          <IconButton
            ouline="none"
            variant="link"
            icon={<MdShuffle />}
            aria-label="shuffle"
            fontSize="24px"
            color={shuffle ? "white" : "gray.600"}
            onClick={() => setShuffle((state) => !state)}
          />
          <IconButton
            ouline="none"
            variant="link"
            icon={<MdSkipPrevious />}
            aria-label="skip"
            fontSize="24px"
            onClick={prevSong}
          />
          {playing ? (
            <IconButton
              ouline="none"
              variant="link"
              icon={<MdOutlinePauseCircleFilled />}
              aria-label="pause"
              fontSize="40px"
              color="white"
              onClick={() => setPlayState(false)}
            />
          ) : (
            <IconButton
              ouline="none"
              variant="link"
              icon={<MdOutlinePlayCircleFilled />}
              aria-label="play"
              fontSize="40px"
              color="white"
              onClick={() => setPlayState(true)}
            />
          )}
          <IconButton
            ouline="none"
            variant="link"
            icon={<MdSkipNext />}
            aria-label="next"
            fontSize="24px"
            onClick={nextSong}
          />
          <IconButton
            ouline="none"
            variant="link"
            icon={<MdOutlineRepeat />}
            aria-label="repeat"
            fontSize="24px"
            color={repeat ? "white" : "gray.600"}
            onClick={() => setRepeat((state) => !state)}
          />
        </ButtonGroup>
      </Center>
      <Box color="gray.600">
        <Flex justify="center" align="center">
          <Box width="10%">
            <Text fontSize="xs">{formatTime(seek)}</Text>
          </Box>
          <Box width="80%">
            <RangeSlider
              arial-label={["min", "max"]}
              step={0.1}
              min={0}
              max={duration ? duration.toFixed() : 0}
              onChange={onSeek}
              id="player-range"
              value={[seek]}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%" textAlign="right">
            <Text fontSize="xs">{formatTime(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Player;
