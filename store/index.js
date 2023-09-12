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
          const response = await this.$axios.post(process.env.OPENAI_API, {
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: 'You are a helpful medical assistant. You will not answer anything outside medical topics. This is my information as a patient, ' + patient_data,
              },
              {
                role: 'user',
                content: type === 'Chat' ? messages.map((msg) => msg.text).join('\n') : messages,
              },
            ],
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
          });

          if (type === 'Chat') {
            console.log("Chat");
            // console.log(patient_data);
            commit('setResponseData', response.data.choices[0].message.content);
            return response.data.choices[0].message.content;
          } else if (type === 'Diagnosis') {
            console.log("Diagnosis");
            commit('pushDiagnosis', response.data.choices[0].message.content);
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
