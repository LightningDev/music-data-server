import register from "../src/api/auth/register";
import User from "../src/db/model/user";

jest.mock('../src/db/model/user');

describe('register endpoint', () => {
  beforeEach(() => {
    User.findOne.mockReset();
    User.create.mockReset();
  });

  it('should not register a user with an email that already exists', async () => {
    User.findOne.mockResolvedValue({ id: '1', email: 'existing@example.com' });
    
    const req = {
      body: {
        name: 'Test',
        email: 'existing@example.com',
        country: 'AU',
        password: 'plainPassword'
      }
    };
    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await register(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.send).toBeCalledWith(JSON.stringify({ success: false, message: "Email already exists" }));
  });

  it('should register a user successfully', async () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({ id: '2' });
    
    const req = {
      body: {
        name: 'Test',
        email: 'new@example.com',
        country: 'AU',
        password: 'plainPassword'
      }
    };
    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await register(req, res);

    expect(res.send).toBeCalledWith({ success: true, user: '2' });
  });

  it('should handle errors gracefully', async () => {
    User.findOne.mockRejectedValue(new Error('DB error'));

    const req = {
      body: {
        name: 'Test',
        email: 'test@example.com',
        country: 'AU',
        password: 'plainPassword'
      }
    };
    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await register(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.send).toBeCalledWith(expect.any(Error));
  });
});
