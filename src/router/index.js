import Vue from 'vue';
import Router from 'vue-router';

import Users from '@/components/Users';
import User from '@/components/User';
import AddUser from '@/components/AddUser';
import EditUser from '@/components/EditUser';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Users',
      component: Users
    },
    {
      path: '/user/:id',
      name: 'User',
      component: User,
      props: true,
    },
    {
      path: '/addUser',
      name: 'AddUser',
      component: AddUser,
    },
    {
      path: '/editUser/:id',
      name: 'EditUser',
      component: EditUser,
      props: true,
    },
  ],
})
