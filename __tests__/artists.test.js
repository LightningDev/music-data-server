import artists, { order } from "../src/api/music/artists";
import User from "../src/db/model/user";

jest.mock('../src/db/model/user');

const mockResponse = {
  message: {
    body: {
      artist_list: [
        { artist: { artist_id: 1, artist_name: 'Artist A', artist_rating: 90 } },
        { artist: { artist_id: 2, artist_name: 'Artist B', artist_rating: 85 } },
        { artist: { artist_id: 3, artist_name: 'Artist C', artist_rating: 87 } }
      ]
    }
  }
};

describe('artists endpoint', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should retrieve a sorted list of artists based on user country', async () => {
    User.findByPk.mockResolvedValue({ country: 'AU' });

    fetch.mockResponseOnce(JSON.stringify(mockResponse));

    const req = {
      user: { id: '1234' },
      query: { top: '3' }
    };
    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await artists(req, res);

    const expectedOutput = {
      artists: [
        { id: 1, name: 'Artist A', rating: 90 },
        { id: 3, name: 'Artist C', rating: 87 },
        { id: 2, name: 'Artist B', rating: 85 }
      ]
    };

    expect(res.send).toHaveBeenCalledWith(expectedOutput);
  });

  it('should handle errors gracefully', async () => {
    User.findByPk.mockResolvedValue({ country: 'AU' });

    fetch.mockReject(new Error('API error'));
    
    const req = {
      user: { id: '1234' },
      query: { top: '3' }
    };
    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await artists(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.send).toBeCalledWith({
      message: "Error while retrieving artists, please try again later!",
    });
  });
});

describe('order function', () => {
  it('should sort in descending order', () => {
    const data = [
      { rating: 85 },
      { rating: 90 },
      { rating: 87 }
    ];

    const result = data.sort(order);
    expect(result).toEqual([
      { rating: 90 },
      { rating: 87 },
      { rating: 85 }
    ]);
  });
});
