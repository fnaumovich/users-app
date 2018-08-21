import localStorage from '@/services/local-storage';
import apiService from '@/api/apiService';
import * as types from '../mutation-types';

export default {
  namespaced: true,
  state() {
    return {
      users: [],
    };
  },
  mutations: {
    [types.FETCH_USERS](state, users) {
      state.users = users;
    },
    [types.ADD_USER](state, user) {
      state.users.push(user);
    },
    [types.EDIT_USER](state, user) {
      const key = state.users.findIndex(item => item.id === user.id);
      state.users[key] = user;
    },
    [types.DELETE_USER](state, userId) {
      const index = state.users.findIndex(item => item.id === userId);
      state.users.splice(index, 1);
    },
  },
  actions: {
    setStore(store) {
      localStorage.setItem('users', store.state.users)
    },
    async fetchUsers(store) {
      const data = localStorage.getItem('users');

      if (Array.isArray(data) && data.length) {
        store.commit(types.FETCH_USERS, data);
      } else {
        const users = await apiService.getUsers();
        store.commit(types.FETCH_USERS, users);
        await store.dispatch('setStore');
      }
    },
    addUser(store, user) {
      store.commit(types.ADD_USER, user);
      store.dispatch('setStore');
    },
    editUser(store, user) {
      store.commit(types.EDIT_USER, user);
      store.dispatch('setStore');
    },
    deleteUser(store, userId) {
      store.commit(types.DELETE_USER, userId);
      store.dispatch('setStore');
    }
  }
};
