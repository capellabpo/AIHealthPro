// store/index.js
export const state = () => ({
    responseData: null,
  })
  
  export const mutations = {
    setResponseData(state, data) {
      state.responseData = data
    },
  }
  
  export const actions = {
    async sendChat({ commit }, payload) {
      const { patient_data, messages } = payload; // Destructure the properties
  
      try {
        // ... (rest of your action code)
        const response = await this.$axios.post(process.env.OPENAI_API, {
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content:
                  'You are a helpful medical assistant. You will not answer anything outside medical topics. This is my information as a patient, ' +
                  patient_data,
              },
              {
                role: 'user',
                content: messages.map((msg) => msg.text).join('\n'),
              },
            ],
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
          }
        );
  
        // Commit the response to the store
        commit('setResponseData', response.data.choices[0].message.content);
        console.log(patient_data);
        console.log(response.data.choices[0].message.content);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    },
  };
  
  
  
  
  
  
  