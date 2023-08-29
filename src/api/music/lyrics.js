const lyrics = async (req, res) => {
  try {
    const { song } = req.query;
    const params = `?track_id=${song}&apikey=${process.env.MUSIX_MATCH_API_KEY}`;
    const response = await fetch(
      `${process.env.MUSIX_MATCH_API_URL}/track.lyrics.get${params}`,
      {
        method: "GET",
      }
    );
    const data = (await response.json()).message.body.lyrics;
    res.send({
      lyrics: {
        id: data.lyrics_id,
        desc: data.lyrics_body,
        pixelUrl: data.pixel_tracking_url,
        scriptUrl: data.script_tracking_url,
      },
    });
  } catch (err) {
    res.status(400).send({
      message: "Error while retrieving lyrics, please try again later!",
    });
  }
};

export default lyrics;
