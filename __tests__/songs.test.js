import songs from '../src/api/music/songs';

describe('songs function', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should retrieve a list of songs given an albumn query', async () => {
    fetch.mockResponseOnce(JSON.stringify({
      message: {
        body: {
          track_list: [
            {
              track: {
                track_id: 1,
                track_name: 'Song 1',
                artist_name: 'Artist 1',
                artist_id: 1,
              },
            },
            {
              track: {
                track_id: 2,
                track_name: 'Song 2',
                artist_name: 'Artist 2',
                artist_id: 2,
              },
            }
          ],
        },
      },
    }));

    const mockReq = {
      query: { albumn: '123' },
    };
    
    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await songs(mockReq, res);

    expect(res.send).toBeCalledWith({
      songs: [
        {
          id: 1,
          name: 'Song 1',
          artistName: 'Artist 1',
          artistId: 1,
        },
        {
          id: 2,
          name: 'Song 2',
          artistName: 'Artist 2',
          artistId: 2,
        },
      ],
    });
  });

  it('should handle errors gracefully', async () => {
    fetch.mockReject(new Error('API error'));
    
    const mockReq = { query: { albumn: '123' } };
    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await songs(mockReq, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.send).toBeCalledWith({
      message: "Error while retrieving songs, please try again later!",
    });
  });
});
