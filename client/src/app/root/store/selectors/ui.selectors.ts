import { createSelector } from '@ngrx/store';
import { selectUi } from '../reducers';
import { State } from '../reducers/ui.reducer';

export const selectSnackbarVisible = createSelector(
  selectUi,
  (state: State) => state.snackbarVisible
);
export const selectSnackbarMessage = createSelector(
  selectUi,
  (state: State) => state.snackbarMessage
);
