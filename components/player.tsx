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

const Player = ({ songs, activeSong }) => {
  const [playing, setPlaying] = useState(true);
  const [index, setIndex] = useState(0);
  const [seek, setSeek] = useState(0.0);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0.0);

  const setPlayState = (value) => setPlaying(value);

  return (
    <Box>
      <Box>
        {/* <ReactHowler
          playing={playing}
          src={activeSong?.url}
          onLoad={(duration) => setDuration(duration)}
        /> */}
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
            <Text fontSize="xs">1:24</Text>
          </Box>
          <Box width="80%">
            <RangeSlider
              arial-label={["min", "max"]}
              step={0.1}
              min={0}
              max={321}
              id="player-range"
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%" textAlign="right">
            <Text fontSize="xs">321</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Player;
