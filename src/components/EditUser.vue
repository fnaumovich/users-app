<template>
  <section>
    <div class="container">
      <form>
        <div class="form-group">
          <label for="id" class="col-sm-2 col-form-label">Id</label>
          <input type="text" readonly class="form-control" id="id" v-model="currentUser.id">
        </div>

        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" class="form-control" id="username" placeholder="Username" v-model="currentUser.username">
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="text" class="form-control" id="email" placeholder="Email" v-model="currentUser.email">
        </div>

        <div class="form-group">
          <label for="website">Website</label>
          <input type="text" class="form-control" id="website" placeholder="Website" v-model="currentUser.website">
        </div>

        <div class="form-group">
          <label for="email">Phone</label>
          <MaskedInput
            type="text"
            class="form-control"
            id="phone"
            placeholder="89125555555"
            mask="\+\7 (111) 111-11-11"
            v-model="currentUser.phone"
          />
        </div>

        <button
          type="submit"
          class="btn btn-success"
          @click.prevent="onSubmit"
        >Save</button>
      </form>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import cloneDeep from 'lodash.clonedeep';
import MaskedInput from 'vue-masked-input';

export default {
  name: 'EditUser',
  data() {
    return {
      currentUser: {
        id: '',
        username: '',
        email: '',
        website: '',
        phone: '',
      }
    };
  },
  props: {
    id: [String, Number],
  },
  components: {
    MaskedInput
  },
  computed: {
    getCurrentUser() {
      const users = cloneDeep(this.users);

      return users.find(item => item.id === parseInt(this.id, 10)) || {};
    },

    ...mapState('users', [ 'users' ]),
  },
  methods: {
    setUserData() {
      this.currentUser = cloneDeep(this.getCurrentUser);
    },
    onSubmit() {
      this.editUser(this.currentUser);
    },

    ...mapActions('users', [ 'fetchUsers', 'editUser' ]),
  },
  created() {
    this.fetchUsers();
  },
  mounted() {
    this.setUserData();
  },
  watch: {
    getCurrentUser(newVal, oldVal) {
      if (!Object.keys(newVal) && oldVal) {
        this.setUserData();
      }
    }
  },
}
</script>