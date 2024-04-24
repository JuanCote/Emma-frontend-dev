const state = {
    tutorial: null
  };
  
  const getters = {
    getTutorial: state => state.tutorial
  };
  
  const mutations = {
    initializeState(state) {
      state.tutorial = JSON.parse(localStorage.getItem('tutorialState'));
      if (!state.tutorial) {
        localStorage.setItem('tutorialState', JSON.stringify({
          currentStep: 1,
          done: false
        }));
        state.tutorial = JSON.parse(localStorage.getItem('tutorialState'));
      }
    },
    setNextStep(state) {
      state.tutorial.currentStep += 1;
      localStorage.setItem('tutorialState', JSON.stringify(state.tutorial));
    },
    finishTutorial(state) {
      state.tutorial.done = true
      localStorage.setItem('tutorialState', JSON.stringify(state.tutorial));
    }
  };
  
  
  const actions = {
    initializeState({ commit }) {
      commit("initializeState");
    },
    setNextStep({ commit }) {
      commit("setNextStep")
    },
    finishTutorial({commit}) {
      commit("finishTutorial")
    }
  };
  
  export default {
    state,
    getters,
    mutations,
    actions
  };
  