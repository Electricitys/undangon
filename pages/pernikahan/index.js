import Link from "next/link";
import { Box } from "../../components";

const serverUrl = process.env.serverUrl;

const Dari = ({ posts }) => {
  return (
    <Box>
      <Box>Available:</Box>
      <Box as="ul">
        {posts.map(({ id, slug }) => (
          <Box key={id} as="li">
            <Box
              as={Link}
              href={`/pernikahan/${slug}`}
            >
              {slug}
            </Box>
          </Box>))}
      </Box>
    </Box>
  )
}

export const getStaticProps = async (context) => {
  let resPosts = await fetch(`${serverUrl}/wp-json/wp/v2/posts?_fields=id,slug`);
  let posts = await resPosts.json();
  return {
    props: {
      posts
    }
  }
}


export default Dari;