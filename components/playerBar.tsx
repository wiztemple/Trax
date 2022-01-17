import { Box, Flex, Text } from "@chakra-ui/layout";
import { useStoreState } from "easy-peasy";
import Player from "./player";

const PlayerBar = () => {
  const songs = useStoreState((state: any) => state.activeSongs);
  const activeSong = useStoreState((state: any) => state.activeSong);
  return (
    <Box width="100vw" height="100px" bg="gray.900" padding="10px" color="gray">
      <Flex align="center">
        {activeSong ? (
          <Box padding="20px" color="white" width="30%">
            <Text fontSize="lg">{activeSong?.name}</Text>
            <Text fontSize="sm" fontWeight="medium">
              {activeSong?.artist?.name}
            </Text>
          </Box>
        ) : null}
        <Box width="40%">
          {activeSong ? <Player songs={songs} activeSong={activeSong} /> : null}
        </Box>
      </Flex>
    </Box>
  );
};

export default PlayerBar;
