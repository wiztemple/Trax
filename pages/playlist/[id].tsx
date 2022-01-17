import GradientLayout from "../../components/gradientLayout";
import SongsTable from "../../components/songsTable";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";

const getBGcolor = (id) => {
  const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "teal",
    "purple",
    "gray",
  ];
  return colors[id - 1] || colors[Math.random() * colors.length];
};
const Playlist = ({ playlist }) => {
  const color = getBGcolor(playlist.id);
  return (
    <GradientLayout
      color={color}
      roundImage={false}
      title={playlist.name}
      subTitle="Playlist"
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/200/200?random=${playlist.id}`}
    >
      <SongsTable songs={playlist?.songs} />
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  let user;

  try {
    user = validateToken(req.cookies.LIFETRACKS_ACCESS_TOKEN);
  } catch (error) {
    return {
      rediect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });
  return {
    props: {
      playlist,
    },
  };
};
export default Playlist;
