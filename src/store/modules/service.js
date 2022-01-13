export default {
  state: {
    service: localStorage.getItem("service") || "localStorage",
  },
  mutations: {
    setService(state, service) {
      state.service = service;
      localStorage.setItem("service", service);
    },
  },
  getters: {
    service(state) {
      return state.service;
    },
  },
};
