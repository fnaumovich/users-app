<template>
  <section>
    <div class="container">
      <table class="table table-striped table-hover">
        <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">username</th>
          <th scope="col">email</th>
          <th scope="col">website</th>
          <th scope="col">phone</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in getCurrentUser">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.website }}</td>
            <td>{{ user.phone }}</td>
            <td>
              <button type="button" class="btn edit-btn" @click.prevent="routeToEditUser(user.id)">Edit</button>
              <button type="button" class="btn edit-btn" @click.prevent="onDeleteUser(user.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import { mapState ,mapActions } from 'vuex';
import cloneDeep from 'lodash.clonedeep';

export default {
  name: 'User',
  data () {
    return {
    };
  },
  props: {
    id: [ String, Number ],
  },
  computed: {
    getCurrentUser() {
      const users = cloneDeep(this.users);

      return users.filter(user => user.id === parseInt(this.id, 10));
    },

    ...mapState('users', [ 'users' ]),
  },
  methods: {
    routeToEditUser(userId) {
      this.$router.push({ name: 'EditUser', params: { id: userId } });
    },
    onDeleteUser(userId) {
      this.deleteUser(userId);
      this.$router.push('/');
    },

    ...mapActions('users', [ 'fetchUsers', 'deleteUser' ]),
  },
  created() {
    this.fetchUsers();
  }
}
</script>

<style>

</style>
