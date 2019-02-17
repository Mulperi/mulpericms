import * as postAction from '../actions/post.actions';
import * as fromPost from './post.reducer';
import * as MOCK from '../../../shared/models/mock/';

describe('Post reducer', () => {
  describe('LoadAll', () => {
    it('should set loading to true', () => {
      const { initialState } = fromPost;
      const action = new postAction.LoadAll();
      const state = fromPost.reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        loading: true
      });
    });
  });
  describe('LoadAllFailed', () => {
    it('should set loading to false and set errorMessage', () => {
      const { initialState } = fromPost;
      const action = new postAction.LoadAllFailed('error');
      const state = fromPost.reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        loading: false,
        errorMessage: 'error'
      });
    });
  });
  describe('LoadAllSuccess', () => {
    it('should set loading to false, set entities', () => {
      const { initialState } = fromPost;
      const action = new postAction.LoadAllSuccess(MOCK.postDTOArray);
      const state = fromPost.reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        loading: false,
        entities: MOCK.postEntities,
        ids: MOCK.postIds
      });
    });
  });
  describe('Save', () => {
    it('should set saving to true', () => {
      const { initialState } = fromPost;
      const action = new postAction.Save(MOCK.postToBeSaved);
      const state = fromPost.reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        saving: true
      });
    });
  });
  describe('SaveSuccess', () => {
    it('should set saving to false, add one entity', () => {
      const { initialState } = fromPost;
      const action = new postAction.SaveSuccess(MOCK.postDTO);
      const state = fromPost.reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        saving: false,
        entities: MOCK.postEntities,
        ids: MOCK.postIds
      });
    });
  });
  describe('SaveFailed', () => {
    it('should set saving to false', () => {
      const { initialState } = fromPost;
      const action = new postAction.SaveFailed('error');
      const state = fromPost.reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        saving: false
      });
    });
  });
  describe('Select', () => {
    it('should set currentPostId', () => {
      const { initialState } = fromPost;
      const action = new postAction.Select('1');
      const state = fromPost.reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        currentPostId: '1'
      });
    });
  });
  describe('Delete', () => {
    it('should set deleting to true', () => {
      const { initialState } = fromPost;
      const action = new postAction.Delete('1');
      const state = fromPost.reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        deleting: true
      });
    });
  });
  describe('DeleteSuccess', () => {
    it('should set deleting to false', () => {
      const { initialState } = fromPost;
      const action = new postAction.DeleteSuccess('1');
      const state = fromPost.reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        deleting: false
      });
    });
  });
  describe('DeleteFailed', () => {
    it('should set deleting to false', () => {
      const { initialState } = fromPost;
      const action = new postAction.DeleteFailed('error');
      const state = fromPost.reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        deleting: false
      });
    });
  });
  //   describe('LoadAll', () => {
  //     it('should set loading to true', () => {
  //       const { initialState } = fromPost;
  //       const action = new postAction.LoadAll();
  //       const state = fromPost.reducer(initialState, action);

  //       expect(state.loading).toEqual(true);
  //       // untouched props, good to add regardless
  //       expect(state.loaded).toEqual(false);
  //       expect(state.entities).toEqual({});
  //     });
  //   });
});
