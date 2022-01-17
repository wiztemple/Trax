import { useEffect, useRef, useState } from "react";
import {
  ButtonGroup,
  Box,
  IconButton,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
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

const Player = () => {
  return (
    <Box>
      <Box>{/* <ReactHowler /> */}</Box>
      <Center color="gray.600">
        <ButtonGroup spacing={4}>
          <IconButton
            ouline="none"
            variant="link"
            icon={<MdShuffle />}
            aria-label="shuffle"
            fontSize="24px"
          />
          <IconButton
            ouline="none"
            variant="link"
            icon={<MdSkipPrevious />}
            aria-label="skip"
            fontSize="24px"
          />
          <IconButton
            ouline="none"
            variant="link"
            icon={<MdOutlinePlayCircleFilled />}
            aria-label="play"
            fontSize="40px"
            color="white"
          />
          <IconButton
            ouline="none"
            variant="link"
            icon={<MdOutlinePauseCircleFilled />}
            aria-label="pause"
            fontSize="40px"
            color="white"
          />
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
          />
        </ButtonGroup>
      </Center>
    </Box>
  );
};

export default Player;
