import { Box, Text, Flex } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import GradientLayout from "../components/gradientLayout";
import { useMe } from "../lib/hooks";
import prisma from "../lib/prisma";

const Home = ({ artists }) => {
  const { user } = useMe();
  return (
    <GradientLayout
      roundImage
      color="purple"
      subTitle="Profile"
      title={`${user?.firstName} ${user?.lastName}`}
      description={`${user?.playlistsCount} Public Playlists`}
      image="https://tinted-gym-f99.notion.site/image/https%3A%2F%2Fdl.dropboxusercontent.com%2Fs%2Fbgiv0ssz3xpotz9%2Fpeep.png%3Fdl%3D0?table=block&id=33f9771b-0e6f-4a72-832c-69ed2d41f290&spaceId=511cd811-5561-4a61-b550-c4086b4afafb&width=2000&userId=&cache=v2"
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="20px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artist this month
          </Text>
          <Text fontSize="md">Only visible to You</Text>
        </Box>
        <Flex justify="space-between">
          {artists.map((artist) => {
            return (
              <Box paddingX="10px" width="20%">
                <Box
                  key={artist.id}
                  bg="gray.900"
                  width="100%"
                  borderRadius="10px"
                  marginRight="10px"
                  padding="15px"
                >
                  <Image
                    src="http://placekitten.com/g/200/200"
                    borderRadius="100%"
                  />
                  <Box marginTop="20px">
                    <Text fontSize="large">{artist.name}</Text>
                    <Text fontSize="sm">Artist</Text>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany();

  return {
    props: {
      artists,
    },
  };
};
export default Home;
