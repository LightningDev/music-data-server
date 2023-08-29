import User from "../../db/model/user";

function order(a, b) {
  return a.rating < b.rating ? 1 : (a.rating > b.rating ? -1 : 0);
}

const artists = async (req, res) => {
  try {
    const { top } = req.query;
    const user = await User.findByPk(req.user.id);
    if (!user) return res.send({ artists: [] });

    const params = `?page=1&page_size=${top}&country=${user.country}&apikey=${process.env.MUSIX_MATCH_API_KEY}`;

    const response = await fetch(
      `${process.env.MUSIX_MATCH_API_URL}/chart.artists.get${params}`,
      {
        method: "GET",
      }
    );

    const data = (await response.json()).message.body.artist_list;

    res.send({
      artists: data.map((artist) => ({
        id: artist.artist.artist_id,
        name: artist.artist.artist_name,
        rating: artist.artist.artist_rating,
      })).sort(order),
    });
  } catch (err) {
    res.status(400).send({ message: "Error while retrieving artists, please try again later!" });
  }
};

export default artists;
