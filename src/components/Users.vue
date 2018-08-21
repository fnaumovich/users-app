<template>
  <div class="hello">
    <div class="container">
      <div class="row">
        <div class="col-4">
          <select class="custom-select" v-model="sortType">
            <option disabled value="">choose sort type</option>
            <option value="id">id</option>
            <option value="username">name</option>
            <option value="email">email</option>
          </select>
        </div>
      </div>

      <div class="row justify-content-end">
        <router-link to="/addUser" class="btn btn-secondary mb-2">Add User</router-link>
      </div>

      <table class="table table-striped table-hover">
        <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">username</th>
          <th scope="col">email</th>
          <th scope="col">website</th>
          <th scope="col">phone</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in sortedUsers" @click="routeToUser(user.id)">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.website }}</td>
            <td>{{ user.phone }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState ,mapActions } from 'vuex';
import cloneDeep from 'lodash.clonedeep';

export default {
  name: 'Users',
  data () {
    return {
      sortType: '',
    };
  },
  computed: {
    sortedUsers() {
      const currentType = this.sortType || 'id';
      const users = cloneDeep(this.users);

      return users.sort(this.sortUsersByValue(currentType));
    },

    ...mapState('users', [ 'users' ]),
  },
  methods: {
    sortUsersByValue(property) {
      let sortOrder = 1;
      if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function (a, b) {
        const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
      }
    },
    routeToUser(userId) {
      this.$router.push({ name: 'User', params: { id: userId } });
    },

    ...mapActions('users', [ 'fetchUsers' ])
  },
  created() {
    this.fetchUsers();
  }
}
</script>

<style>

</style>
