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
    setCurrentStep(state, n) {
      state.tutorial.currentStep = n
      localStorage.setItem('tutorialState', JSON.stringify(state.tutorial));
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
    setNextStep({ commit }, {step=1, currentStep=0}) {
      if (!currentStep == 0) {
        commit('setCurrentStep', currentStep)
      }else {
        let n = 0
        while (n != step) {
          commit("setNextStep")
          n++
        }
      }
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
  