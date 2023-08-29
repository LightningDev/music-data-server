function order(a, b) {
  return a.releaseDate < b.releaseDate
    ? -1
    : a.releaseDate > b.releaseDate
    ? 1
    : 0;
}

const albumns = async (req, res) => {
  try {
    const { artist } = req.query;
    const params = `?page=1&page_size=3&artist_id=${artist}&s_release_date=desc&apikey=${process.env.MUSIX_MATCH_API_KEY}`;

    const response = await fetch(
      `${process.env.MUSIX_MATCH_API_URL}/artist.albums.get${params}`,
      {
        method: "GET",
      }
    );

    const data = (await response.json()).message.body.album_list;
    res.send({
      albumns: data
        .map((album) => ({
          id: album.album.album_id,
          name: album.album.album_name,
          label: album.album.album_label,
          cover: album.album.album_coverart_100x100,
          releaseDate: album.album.album_release_date,
          artistName: album.album.artist_name,
          artistId: album.album.artist_id,
        }))
        .sort(order),
    });
  } catch (err) {
    res.status(400).send({
      message: "Error while retrieving albumns, please try again later!",
    });
  }
};

export default albumns;
