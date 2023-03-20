import { configureStore } from '@reduxjs/toolkit';
// import { enhancer } from 'addon-redux';

import loadingSlice from './loadingSlice';

export const reducer = {
    loadingSlice: loadingSlice
};

const store = configureStore({ reducer});

export default store;


