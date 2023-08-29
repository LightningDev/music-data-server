import albumns from "../src/api/music/albumns";
import { order } from "../src/api/music/albumns";

describe("albumns", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should return a list of albums", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        message: {
          body: {
            album_list: [
              {
                album: {
                  album_id: 1,
                  album_name: "Mock Album A",
                  album_label: "Label A",
                  album_coverart_100x100: "https://mockurl.com/albumA.jpg",
                  album_release_date: "2022-08-01",
                  artist_name: "Mock Artist",
                  artist_id: 1001
                }
              },
              {
                album: {
                  album_id: 2,
                  album_name: "Mock Album B",
                  album_label: "Label B",
                  album_coverart_100x100: "https://mockurl.com/albumB.jpg",
                  album_release_date: "2023-01-01",
                  artist_name: "Mock Artist",
                  artist_id: 1001
                }
              },
            ],
          },
        },
      })
    );

    const req = {
      query: { artist: "12345" },
    };
    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await albumns(req, res);

    const expectedOutput = {
      albumns: [
          {
              id: 1,
              name: "Mock Album A",
              label: "Label A",
              cover: "https://mockurl.com/albumA.jpg",
              releaseDate: "2022-08-01",
              artistName: "Mock Artist",
              artistId: 1001
          },
          {
              id: 2,
              name: "Mock Album B",
              label: "Label B",
              cover: "https://mockurl.com/albumB.jpg",
              releaseDate: "2023-01-01",
              artistName: "Mock Artist",
              artistId: 1001
          }
      ].sort(order)
  };

    expect(
      res.send
    ).toHaveBeenCalledWith(expectedOutput);
  });

  it("should handle errors", async () => {
    fetchMock.mockRejectOnce(new Error("API Error"));

    const req = {
      query: { artist: "12345" },
    };
    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await albumns(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      message: "Error while retrieving albumns, please try again later!",
    });
  });
});
