import { createStore } from 'vuex';

import coachesModule from '../store/modules/coaches/index';
import requestModule from '../store/modules/requests/index';
import mutations from './modules/coaches/mutations';
import actions from './modules/coaches/actions';

const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestModule
  },
  state() {
    return {
      userId: 'c3'
    };
  },
  mutations,
  actions,
  getters: {
    userId(state) {
      return state.userId;
    }
  }
});

export default store;
