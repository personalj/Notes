import firebase from "firebase/app";
export default {
  state: {
    notes: [],
  },
  mutations: {
    setNote(state, note) {
      state.notes.push(note);
    },
    getNotes(state, notes) {
      state.notes = notes;
    },
    updateNote(state, note) {
      const index = state.notes.findIndex((item) => item.id === note.id);
      Object.assign(state.notes[index], note);
    },
    deleteNote(state, noteId) {
      state.notes = state.notes.filter((item) => item.id !== noteId);
    },
    addComment(state, note) {
      const noteItem = state.notes.find((item) => item.id === note.noteId);
      noteItem.comments.unshift(note.comment);
    },
  },
  actions: {
    async createNote({ commit }, note) {
      delete note.id;
      try {
        await firebase.database().ref(`/notes`).push({ note });
        commit("setNote", note);
      } catch (e) {
        console.log(e);
      }
    },
    async getNotes({ commit }) {
      try {
        const notesArray = [];
        const notes =
          (await firebase.database().ref(`/notes/`).once("value")).val() || {};
        Object.keys(notes).forEach((key) => {
          notesArray.unshift({
            ...notes[key].note,
            comments: notes[key].note.comments || [],
            id: key,
          });
        });
        commit("getNotes", notesArray);
      } catch (e) {
        console.log(e);
      }
    },
    async updateNote({ commit }, note) {
      const name = note.name;
      const content = note.content;
      try {
        await firebase
          .database()
          .ref(`/notes/`)
          .child(`${note.id}/note`)
          .update({ name, content });
        commit("updateNote", note);
      } catch (e) {
        console.log(e);
      }
    },
    async deleteNote({ commit }, noteId) {
      try {
        (await firebase.database().ref(`/notes/`).child(noteId).remove()) || {};
        commit("deleteNote", noteId);
      } catch (e) {
        console.log(e);
      }
    },
    async addComment({ commit, state }, note) {
      const noteItem = state.notes.find((item) => item.id === note.noteId);
      console.log(...noteItem.comments);
      const comments = [note.comment, ...noteItem.comments];
      console.log(comments);
      try {
        await firebase
          .database()
          .ref(`/notes/`)
          .child(`${note.noteId}/note`)
          .update({ comments });
        commit("addComment", note);
      } catch (e) {
        console.log(e);
      }
    },
  },
  getters: {
    notes(state) {
      return state.notes;
    },
  },
  namespaced: true,
};
