import Vuex from 'vuex';

// Create a Vuex store instance
const createStore = () => {
  return new Vuex.Store({
    state: {
      responseData: null,
      diagnosisData: 'No Diagnosis',
      showLogin: false,
      showRegister: false,
      is_logged_in: false,
    },
    mutations: {
      setResponseData(state, data) {
        state.responseData = data;
      },
      pushDiagnosis(state, data) {
        state.diagnosisData = data;
      },
      setLogin(state, data) {
        state.showLogin = data;
      },
      setRegister(state, data) {
        state.showRegister = data;
      },
      user_is_in(state, data) {
        state.is_logged_in = data;
      }
    },
    actions: {
      // GRAB IP
      async ipGrabber({ commit }) {
        try {

          const response = await this.$axios.post(`${process.env.DB_BASE}/api/users/publicIp`, {

          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          console.log(response);
          if(response.response) {
            console.log(response.response.data);
          }
        }
        catch (error) {
          console.log('IP Grabber error:', error.response.data);
          console.log('IP Grabber error:', error.response);
        }
      },
      // CHATS
      async sendChat({ commit }, payload) {
        const { patient_data, messages, type } = payload;

        // console.log(patient_data);
        // console.log(messages);
        // console.log(messages.map((msg) => msg.content).join('\n'));
        // console.log(type);
        try {
          const response = await this.$axios.post(process.env.OPEN_API, {
            user_message: type === 'Chat' ? messages.map((msg) => msg.content).join('\n') : messages,
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
            // console.log("Chat");
            // console.log(patient_data);
            commit('setResponseData', response.data.response);
            return response.data.response;
          } else if (type === 'Diagnosis') {
            // console.log("Diagnosis");
            commit('pushDiagnosis', response.data.response);
          }

        } catch (error) {
          console.log(error);
          // Handle error
        }
      },

      // LOGIN
      openLogin({commit}) {
        commit('setLogin', true);
        commit('setRegister', false);
      },
      // REGISTER
      async openRegister({commit}, registrationData) {
        commit('setLogin', false);
        commit('setRegister', true);
      },
      // CLOSE LOGIN AND REGISTER MODALS
      closeModals({commit}) {
        commit('setLogin', false);
        commit('setRegister', false);
      },
      // REGISTER NEW USER
      async registerNewUser({commit}, registrationData) {
        const { user_name, user_email, user_password } = registrationData;

        console.log(`${process.env.DB_BASE}/api/users/signup`);
        console.log(user_name);
        console.log(user_email);
        console.log(user_password);

        try {
          const response = await this.$axios.post(`${process.env.DB_BASE}/api/users/signup`, {
            name: user_name,
            email: user_email,
            password: user_password
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if(response.data.token) {
            localStorage.token = String(response.data.token);
            localStorage.username = String(response.data.name);
            localStorage.email = String(response.data.email);
            return 1;
          }
          else {
            return 0;
          }
          
        } catch (error) {
          console.error(error);
          return "Error from Try Catch", error;
          // Handle error
        }
      },
      // LOGIN USER
      async loginUser({commit}, loginUser) {
        const { user_email, user_password } = loginUser;

        console.log(user_email);
        console.log(user_password);

        try {
          const response = await this.$axios.post(`${process.env.DB_BASE}/api/users/signin`, {
            email: user_email,
            password: user_password
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if(response.data.token) {
            localStorage.token = String(response.data.token);
            localStorage.email = String(response.data.email);
            localStorage.username = String(response.data.name);
            return 1;
          }
          else {
            return 0;
          }
          
        } catch (error) {
          console.log(error);
          return "Error from Try Catch", error;
          // Handle error
        }
      }


    },
  });
};

export default createStore;
