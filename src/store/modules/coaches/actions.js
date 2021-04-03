import axios from 'axios';

export default {
  async registerCoach(context, payload) {
    const userId = context.rootGetters.userId;

    const response = await axios.put(
      `https://vue-http-demo-9e966-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json`,
      {
        firstName: payload.first,
        lastName: payload.last,
        description: payload.desc,
        hourlyRate: payload.rate,
        areas: payload.areas
      }
    );

    const coachData = {
      firstName: payload.first,
      lastName: payload.last,
      description: payload.desc,
      hourlyRate: payload.rate,
      areas: payload.areas
    };

    // const responseData = await response.data;

    if (!response.status === '200') {
      //errr
    }
    context.commit('registerCoach', {
      ...coachData,
      id: userId
    });
  },
  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    const response = await axios(
      `https://vue-http-demo-9e966-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`
    );

    const responseData = await response.data;

    if (!response.status === '200') {
      const error = new Error(response.statusText || 'Failed to fetch');
      throw error;
    }

    const coaches = [];

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas
      };

      coaches.push(coach);

      context.commit('setCoaches', coaches);
      context.commit('setFetchTimestamp');
    }
  }
};
