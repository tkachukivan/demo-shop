import { createSelector } from '@ngrx/store';
import { AppState } from '../';
import { State } from './products.reducer';

export const selectProductById = createSelector(
    (state: AppState) => state.products,
    (state: State, { id }) => state.products.find( p => p.id === id) || null
);
