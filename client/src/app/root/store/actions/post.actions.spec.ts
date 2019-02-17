import * as postAction from './post.actions';
import * as MOCK from '../../../shared/models/mock/';

describe('Post Actions', () => {
  describe('LoadAll', () => {
    it('should create a LoadAll action', () => {
      const action = new postAction.LoadAll();
      expect({ ...action }).toEqual({
        type: postAction.ActionTypes.LoadAll
      });
    });
  });
  describe('LoadAllSuccess', () => {
    it('should create a LoadAllSuccess action', () => {
      const payload = MOCK.postDTOArray;
      const action = new postAction.LoadAllSuccess(payload);
      expect({ ...action }).toEqual({
        type: postAction.ActionTypes.LoadAllSuccess,
        payload
      });
    });
  });
  describe('LoadAllFailed', () => {
    it('should create a LoadAllFailed action', () => {
      const payload = 'error';
      const action = new postAction.LoadAllFailed(payload);
      expect({ ...action }).toEqual({
        type: postAction.ActionTypes.LoadAllFailed,
        payload
      });
    });
  });
  describe('Save', () => {
    it('should create a Save action', () => {
      const payload = { title: 'string', body: 'string', tags: [''] };
      const action = new postAction.Save(payload);
      expect({ ...action }).toEqual({
        type: postAction.ActionTypes.Save,
        payload
      });
    });
  });
  describe('SaveSuccess', () => {
    it('should create a SaveSuccess action', () => {
      const payload = MOCK.postDTO;
      const action = new postAction.SaveSuccess(payload);
      expect({ ...action }).toEqual({
        type: postAction.ActionTypes.SaveSuccess,
        payload
      });
    });
  });
  describe('SaveFailed', () => {
    it('should create a SaveFailed action', () => {
      const payload = 'error';
      const action = new postAction.SaveFailed(payload);
      expect({ ...action }).toEqual({
        type: postAction.ActionTypes.SaveFailed,
        payload
      });
    });
  });
  describe('Select', () => {
    it('should create a Select action', () => {
      const payload = '1';
      const action = new postAction.Select(payload);
      expect({ ...action }).toEqual({
        type: postAction.ActionTypes.Select,
        payload
      });
    });
  });
  describe('Delete', () => {
    it('should create a Delete action', () => {
      const payload = '1';
      const action = new postAction.Delete(payload);
      expect({ ...action }).toEqual({
        type: postAction.ActionTypes.Delete,
        payload
      });
    });
  });
  describe('DeleteSuccess', () => {
    it('should create a DeleteSuccess action', () => {
      const payload = '1';
      const action = new postAction.DeleteSuccess(payload);
      expect({ ...action }).toEqual({
        type: postAction.ActionTypes.DeleteSuccess,
        payload
      });
    });
  });
  describe('DeleteFailed', () => {
    it('should create a DeleteFailed action', () => {
      const payload = '1';
      const action = new postAction.DeleteFailed(payload);
      expect({ ...action }).toEqual({
        type: postAction.ActionTypes.DeleteFailed,
        payload
      });
    });
  });
});
