import Vuex from 'vuex';
import axios from "axios";

// Create a Vuex store instance
const createStore = () => {
  return new Vuex.Store({
    state: {
      responseData: null,
      diagnosisData: 'No Diagnosis',
      showLogin: false,
      showRegister: false,
      is_logged_in: false,
      current_consultation: "",
      clearAll: false,
      current_chat_limit: 0,
      current_token: "",
      members: [],
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
      },
      setCurrentConsultation(state, data) {
        state.current_consultation = data;
      },
      clearChatbox(state, data) {
        state.clearAll = data;
      },
      setChatLimit(state, data) {
        state.current_chat_limit = data;
      },
      setToken(state, data) {
        state.current_token = data;
      },
      setMembers(state, data) {
        state.members = data;
      }
    },
    actions: {
      // GET MEMBERS
      async getMembers({ commit, dispatch }, user_id) {

        // console.log("Get Members List: ", user_id);
        const userid = user_id.user_id;
        try {
          const response = await this.$axios.get(`${process.env.DB_BASE}/api/chatbot/accountmemberslist/${userid}`, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log(response.data);
          if(response.data.length > 0) {

            // TRANSFER LIST
            var temp = [];
            for(var i=0; i<response.data.length; i++) {
              temp.push({name: response.data[i].name});
            }

            // SEE IF USERNAME EXISTS IN THE LIST AND IF NOT, ADD IT
            for(var c=0; c<response.data.length; c++) {
              if(response.data[c].name === localStorage.username) {
                break;
              }
              else {
                // console.log("Adding Username to Members List");
                await dispatch('saveMembers', {
                  user_id: localStorage.userId,
                  name: localStorage.username
                });

                break;
              }
            }
            // GET UNIQUE NAMES
            const uniqueNames = {};
            const filteredTemp = temp.filter(item => {
              const key = item.name;
              if (!uniqueNames[key]) {
                uniqueNames[key] = true;
                return true;
              }
              return false;
            });

            // PUT TO LOCALSTORAGE
            localStorage.members = JSON.stringify(filteredTemp);  
            commit('setMembers', filteredTemp);
            // console.log("Members List: ", filteredTemp);
          }

        } catch (error) {
          console.log("Fetching Payment History: ",error);
          return 0;
        }
      },
      // GET PAYMENT HISTPRY
      async getPaymentHistory({ commit }, payload) {
        const { user_id, date_from, date_to } = payload;
        // console.log("Get Payment History: ", payload);
        try {

          const response = await this.$axios.post(`${process.env.DB_BASE}/api/payment/history/list`, {
            // userId: user_id,
            userId: user_id,
            dateFrom: date_from,
            dateTo: date_to,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          // console.log(response);
          // console.log(response.data);
          if(response.status === 200) {
            localStorage.paymentHistory = JSON.stringify(response.data);
            return 1;
          }
          else {
            return 0;
          }

        } catch (error) {
          console.log("Fetching Payment History: ",error);
          return 0;
        }
      },
      // GET CONSULTATION HISTORY
      async getHIstory({ commit }, payload) {

        const { user_id, date_from, date_to } = payload;
        // console.log("Get Consultation History: ", payload);
        try {

          const response = await this.$axios.post(`${process.env.DB_BASE}/api/chatbot/history/${user_id}`, {
            dateFrom: date_from,
            dateTo: date_to,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          // console.log(response.data);
          if(response.status === 200) {
            localStorage.history = JSON.stringify(response.data);
            return 1;
          }
          else {
            return 0;
          }

        } catch (error) {
          console.log("Fetching History: ",error);
          return 0;
        }

      },
      // SAVE MEMBERS
      async saveMembers({ commit }, payload) {
        const { user_id, name } = payload;
        // console.log("Save Member: ", payload);
        try {

          const response = await this.$axios.post(`${process.env.DB_BASE}/api/chatbot/accountmember`, {
            userId: user_id,
            name: name,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          // NO NEED FOR RESPONSE, ADDED MEMBERS ARE ALREADY IN LOCALSTORAGE

        } catch (error) {
          console.log("Save Member: ",error);
          return 0;
        }
      },
      // SAVE CHATS
      async saveChats({ commit }, payload) {

        const { token, consulation_id, user_id, user_role, chat_content } = payload;
        console.log(payload);
        try {
          const response = await this.$axios.post(`${process.env.DB_BASE}/api/chatbot/consulation`, {
            token: token,
            consulationId: consulation_id,
            userId: user_id,
            role: user_role,
            content: chat_content
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          // REPONSE SHOULD CONTAIN THE CHAT LIMIT
          console.log(response);
          if(parseInt(response.data) > 0) {
            // console.log(response.data);
            localStorage.chatLimit = response.data;

            // SET STATE: CHAT LIMIT
            commit('setChatLimit', response.data);
          }

          if(response.status === 200) {
            return 1;
          }
          else {
            return 0;
          }

        } catch (error) {
          console.log("Saving Patient Form Error:",error);
          return 0;
        }

      },
      // SAVE PATIENT FORM DATA
      async savePatientData({ commit }, payload) {

        const { patient_data, consultation_id, user_id } = payload;
        // console.log(patient_data);
        // console.log(consultation_id);
        // console.log(user_id);
        try {
          const response = await this.$axios.post(`${process.env.DB_BASE}/api/chatbot/patientForm`, {
            consultationId: consultation_id,
            patientInfo: patient_data,
            userId: user_id
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          // console.log(response);
          if(response.status === 200) {
            return 1;
          }
          else {
            return 0;
          }
          // commit('setResponseData', response.data.response);
          // return response.data.response;
        } catch (error) {
          console.log("Saving Patient Form Error:",error);
          return 0;
        }

      },
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

          // console.log(response.data);
          localStorage.chatLimit = response.data;
          // SET STATE: CHAT LIMIT
          commit('setChatLimit', response.data);

          // if(response.response) {
          //   console.log(response.response.data);
          // }
        }
        catch (error) {
          // console.log('IP Grabber error:', error.response.data);
          // console.log('IP Grabber error:', error.response);
        }
      },
      // CHATS
      async sendChat({ commit }, payload) {
        const { patient_data, messages, type } = payload;

        // console.log(patient_data);
        // console.log(messages);
        // console.log(messages.map((msg) => msg.content).join('\n'));
        // console.log(type);

        // CLEAR CHATBOX & FORM: SET TO TRUE (Because it's false by default)
        commit('clearChatbox', false);

        try {
          const response = await this.$axios.post(process.env.OPEN_API, {
            user_message: type === 'Chat' ? messages.map((msg) => msg.content).join('\n') : messages,
            system_message: 'You are a helpful medical assistant. You will not answer anything outside medical topics. This is my information as a patient, ' + patient_data,
            message_history: messages,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              // Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
          });

          // console.log(response);
          if (type === 'Chat') {
            // console.log("Chat");
            // console.log(patient_data);
            console.log('Chat Cost: ',response.data.completion_tokens);
            commit('setResponseData', response.data.response);
            return response.data;
          } else if (type === 'Diagnosis') {
            // console.log("Diagnosis");
            commit('pushDiagnosis', response.data.response);
          }

        } catch (error) {
          console.log(error);
          return error;
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

        // console.log(`${process.env.DB_BASE}/api/users/signup`);
        // console.log(user_name);
        // console.log(user_email);
        // console.log(user_password);
        var account_members = [];

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
            localStorage.userId = String(response.data._id);

            // ADD USERNAME AS MEMBER
            await new Promise((resolve) => {
              account_members.push({ name: response.data.name });
              resolve();
            });

            localStorage.members = JSON.stringify(account_members);

            commit('setToken', response.data.token);
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

        // console.log(user_email);
        // console.log(user_password);
        var account_members = [];

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
            localStorage.userId = String(response.data._id);

            // ADD USERNAME AS MEMBER
            await new Promise((resolve) => {
                account_members.push({ name: response.data.name });
                resolve();
            });

            localStorage.members = JSON.stringify(account_members);

            commit('setToken', response.data.token);
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
