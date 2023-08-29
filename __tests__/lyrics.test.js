import lyrics from "../src/api/music/lyrics";

const mockResponse = {
  message: {
    body: {
      lyrics: {
        lyrics_id: 101,
        lyrics_body: "Test lyrics\nTest line 2",
        pixel_tracking_url: "https://pixel.example.com",
        script_tracking_url: "https://script.example.com",
      }
    }
  }
};

describe('lyrics endpoint', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should retrieve song lyrics', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockResponse));

    const req = {
      query: { song: '1' }
    };
    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await lyrics(req, res);

    const expectedOutput = {
      lyrics: {
        id: 101,
        desc: "Test lyrics\nTest line 2",
        pixelUrl: "https://pixel.example.com",
        scriptUrl: "https://script.example.com",
      }
    };

    expect(res.send).toHaveBeenCalledWith(expectedOutput);
  });

  it('should handle errors gracefully', async () => {
    fetch.mockReject(new Error('API error'));
    
    const req = {
      query: { song: '1' }
    };
    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await lyrics(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.send).toBeCalledWith({
      message: "Error while retrieving lyrics, please try again later!",
    });
  });
});
