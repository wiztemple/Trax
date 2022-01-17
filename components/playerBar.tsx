import { Box, Flex, Text } from "@chakra-ui/layout";
import Player from "./player";

const PlayerBar = () => {
  return (
    <Box width="100vw" height="100px" bg="gray.900" padding="10px" color="gray">
      <Flex>
        <Box padding="20px" color="white" width="30%">
          <Text fontSize="lg">Song Name</Text>
          <Text fontSize="sm" fontWeight="medium">
            artist name
          </Text>
        </Box>
        <Box width="40%">
          <Player />
        </Box>
      </Flex>
    </Box>
  );
};

export default PlayerBar;
