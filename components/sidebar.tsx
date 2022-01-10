import NextImage from "next/image";
import NextLink from "next/link";

import {
  Box,
  List,
  ListItem,
  ListIcon,
  Divider,
  Center,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/layout";
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";

const navMenu = [
  {
    name: "Home",
    icon: MdHome,
    href: "/",
  },
  {
    name: "Search",
    icon: MdSearch,
    href: "/search",
  },
  {
    name: "Library",
    icon: MdLibraryMusic,
    href: "/library",
  },
];

const musicMenu = [
  {
    name: "Create Playlist",
    icon: MdPlaylistAdd,
    href: "/playlist",
  },
  {
    name: "Favorites",
    icon: MdFavorite,
    href: "/favorites",
  },
];

const playlists = new Array(30).fill(0).map((_, i) => `Playlist ${i + 1}`);

const Sidebar = () => {
  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      bg="black"
      paddingX="5px"
      color="gray"
    >
      <Box paddingY="20px">
        <Box width="120px" marginBottom="20px" paddingX="2px">
          <NextImage src="/music.svg" height={50} width={50} />
        </Box>
      </Box>
      <Box marginBottom="20px">
        <List spacing={4}>
          {navMenu.map((menu) => (
            <ListItem paddingX="20px" fontSize="16px" key={menu.name}>
              <LinkBox>
                <NextLink href={menu.href}>
                  <LinkOverlay>
                    <ListIcon as={menu.icon} color="white" marginRight="20px" />
                    {menu.name}
                  </LinkOverlay>
                </NextLink>
              </LinkBox>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box marginTop="20px">
        <List spacing={2}>
          {musicMenu.map((menu) => (
            <ListItem paddingX="20px" fontSize="16px" key={menu.name}>
              <LinkBox>
                <NextLink href={menu.href}>
                  <LinkOverlay>
                    <ListIcon as={menu.icon} color="white" marginRight="20px" />
                    {menu.name}
                  </LinkOverlay>
                </NextLink>
              </LinkBox>
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider color="gray.900" />
      <Box height="60%" overflowY="auto" paddingY="20px">
        <List spacing={2}>
          {playlists.map((playlist) => (
            <ListItem paddingX="20px" fontSize="16px" key={playlist}>
              <LinkBox>
                <NextLink href="/" passHref>
                  <LinkOverlay>{playlist}</LinkOverlay>
                </NextLink>
              </LinkBox>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
