export default {
  state: {
    notes: [],
  },
  mutations: {
    setNote(state, note) {
      state.notes.unshift(note);
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    getNotes(state) {
      state.notes = JSON.parse(localStorage.getItem("notes")) || [];
    },
    addComment(state, note) {
      const noteItem = state.notes.find((item) => item.id === note.noteId);
      noteItem.comments.unshift(note.comment);
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    updateNote(state, note) {
      const index = state.notes.findIndex((item) => item.id === note.id);
      Object.assign(state.notes[index], note);
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    deleteNote(state, noteId) {
      state.notes = state.notes.filter((item) => item.id !== noteId);
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
  },
  actions: {
    createNote({ commit }, note) {
      commit("setNote", note);
    },
    getNotes({ commit }) {
      commit("getNotes");
    },
    addComment({ commit }, note) {
      commit("addComment", note);
    },
    updateNote({ commit }, note) {
      commit("updateNote", note);
    },
    deleteNote({ commit }, noteId) {
      commit("deleteNote", noteId);
    },
  },
  getters: {
    notes(state) {
      return state.notes;
    },
  },
  namespaced: true,
};
