import { createStore } from 'vuex';

import coachesModule from '../store/modules/coaches/index';
import requestModule from '../store/modules/requests/index';
import authModule from '../store/modules/auth/index';

import mutations from './modules/coaches/mutations';
import actions from './modules/coaches/actions';

const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestModule,
    auth: authModule
  },

  mutations,
  actions
});

export default store;
