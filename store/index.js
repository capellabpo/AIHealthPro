import Vuex from 'vuex';

// Create a Vuex store instance
const createStore = () => {
  return new Vuex.Store({
    state: {
      responseData: null,
      diagnosisData: 'No Diagnosis',
    },
    mutations: {
      setResponseData(state, data) {
        state.responseData = data;
      },
      pushDiagnosis(state, data) {
        state.diagnosisData = data;
      },
    },
    actions: {
      async sendChat({ commit }, payload) {
        const { patient_data, messages, type } = payload;

        try {
          const response = await this.$axios.post(process.env.OPEN_API, {
            user_message: type === 'Chat' ? messages.map((msg) => msg.text).join('\n') : messages,
            system_message: 'You are a helpful medical assistant. You will not answer anything outside medical topics. This is my information as a patient, ' + patient_data,
            message_history: []
          },
          {
            headers: {
              'Content-Type': 'application/json',
              // Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
          });

          // console.log(response.data.response);
          if (type === 'Chat') {
            console.log("Chat");
            // console.log(patient_data);
            commit('setResponseData', response.data.response);
            return response.data.response;
          } else if (type === 'Diagnosis') {
            console.log("Diagnosis");
            commit('pushDiagnosis', response.data.response);
          }

        } catch (error) {
          console.error(error);
          // Handle error
        }
      },
    },
  });
};

export default createStore;
