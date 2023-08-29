import signIn from "../src/api/auth/signIn";
import User from "../src/db/model/user";

jest.mock('../src/db/model/user');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('signIn endpoint', () => {
  beforeEach(() => {
    User.findOne.mockReset();
    require('bcryptjs').compare.mockReset();
    require('jsonwebtoken').sign.mockReset();
  });

  it('should sign in a user successfully', async () => {
    User.findOne.mockResolvedValue({
      id: '1',
      email: 'test@example.com',
      password: 'hashedPassword'
    });
    
    require('bcryptjs').compare.mockResolvedValue(true);
    require('jsonwebtoken').sign.mockReturnValue('sampleToken');

    const req = {
      body: {
        email: 'test@example.com',
        password: 'plainPassword'
      },
      cookies: {}
    };
    const res = {
      cookie: jest.fn(),
      send: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await signIn(req, res);

    expect(res.cookie).toHaveBeenCalledWith('token', 'sampleToken', expect.any(Object));
    expect(res.send).toHaveBeenCalledWith({ success: true, id: '1' });
  });

  it('should return an error for a non-existing user', async () => {
    User.findOne.mockResolvedValue(null);
    
    const req = {
      body: {
        email: 'test@example.com',
        password: 'plainPassword'
      }
    };
    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await signIn(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.send).toBeCalledWith({ success: false, message: "Email or password is wrong" });
  });

  it('should return an error for a wrong password', async () => {
    User.findOne.mockResolvedValue({
      id: '1',
      email: 'test@example.com',
      password: 'hashedPassword'
    });
    require('bcryptjs').compare.mockResolvedValue(false);

    const req = {
      body: {
        email: 'test@example.com',
        password: 'wrongPassword'
      }
    };
    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await signIn(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.send).toBeCalledWith({ success: false, message: "Email or password is wrong" });
  });

  it('should handle errors gracefully', async () => {
    User.findOne.mockRejectedValue(new Error('DB error'));

    const req = {
      body: {
        email: 'test@example.com',
        password: 'plainPassword'
      }
    };
    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await signIn(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.send).toBeCalledWith(expect.any(Error));
  });
});
