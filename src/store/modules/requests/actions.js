import axios from 'axios';

export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message
    };
    const response = await axios.post(
      `https://vue-http-demo-9e966-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`,
      {
        userEmail: payload.email,
        message: payload.message
      }
    );

    const responseData = await response.data;

    if (!response.status === '200') {
      const error = new Error(response.statusText || 'Failed to send request.');
      throw error;
    }
    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachId;

    context.commit('addRequest', newRequest);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;

    const response = await axios(
      `https://vue-http-demo-9e966-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json?auth=` +
        token
    );

    const responseData = await response.data;

    if (!response.status === '200') {
      const error = new Error(
        response.statusText || 'Failed to fetch request.'
      );
      throw error;
    }

    const requests = [];
    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message
      };

      requests.push(request);
    }

    context.commit('setRequests', requests);
  }
};
