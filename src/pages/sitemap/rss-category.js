export const dynamic = 'force-dynamic'
export const revalidate = 0

const Sitemap = ({ xmlData }) => {
  return null;
};

export default Sitemap;

export const getServerSideProps = async (context) => {
  const { query, res } = context;

  let xmlData = '';
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_MODE_BASE_API}get-rss-feed/${query.category}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });

    xmlData = await response.text();

    res.setHeader('Content-Type', 'application/xml');
    res.end(xmlData);

  } catch (error) {
    console.error('Error fetching XML data:', error);
  }

  return { props: {} };
};