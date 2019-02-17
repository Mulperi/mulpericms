import * as authAction from './auth.actions';

describe('Auth Actions', () => {
  describe('SignIn', () => {
    it('should create a SignIn action', () => {
      const payload = {
        username: 'username',
        password: 'password'
      };
      const action = new authAction.SignIn(payload);
      expect({ ...action }).toEqual({
        type: authAction.ActionTypes.SignIn,
        payload
      });
    });
  });
  describe('SignInSuccess', () => {
    it('should create a SignInSuccess action', () => {
      const payload = {
        username: 'username',
        email: 'email'
      };
      const action = new authAction.SignInSuccess(payload);
      expect({ ...action }).toEqual({
        type: authAction.ActionTypes.SignInSuccess,
        payload
      });
    });
  });
  describe('SignInFailed', () => {
    it('should create a SignInFailed action', () => {
      const payload = 'error';
      const action = new authAction.SignInFailed(payload);
      expect({ ...action }).toEqual({
        type: authAction.ActionTypes.SignInFailed,
        payload
      });
    });
  });
});
