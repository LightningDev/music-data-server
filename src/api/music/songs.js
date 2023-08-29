const albumns = async (req, res) => {
  try {
    const { albumn } = req.query;
    const params = `?page=1&page_size=100&album_id=${albumn}&apikey=${process.env.MUSIX_MATCH_API_KEY}`;

    const response = await fetch(
      `${process.env.MUSIX_MATCH_API_URL}/album.tracks.get${params}`,
      {
        method: "GET",
      }
    );

    const data = (await response.json()).message.body.track_list;
    res.send({
      songs: data.map((song) => ({
        id: song.track.track_id,
        name: song.track.track_name,
        artistName: song.track.artist_name,
        artistId: song.track.artist_id,
      })),
    });
  } catch (err) {
    res.status(400).send({
      message: "Error while retrieving songs, please try again later!",
    });
  }
};

export default albumns;
