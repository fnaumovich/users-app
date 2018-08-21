<template>
  <section>
    <div class="container">
      <form>
        <div class="form-group">
          <label for="id" class="col-sm-2 col-form-label">Id</label>
          <input type="text" readonly class="form-control" id="id" :value="getNextUserId">
        </div>

        <div class="form-group">
          <label for="username">Username
            <span class="required-field">*</span>
          </label>
          <input
            type="text"
            class="form-control"
            id="username"
            placeholder="Username"
            :class="{ 'is-invalid': $v.username.$error, 'is-valid': !$v.username.$invalid }"
            v-model.trim="$v.username.$model"
            @input="onInput($v.username)"
            @blur="onBlur"
          >
          <div class="invalid-feedback" v-if="!$v.username.required && $v.username.alpha">
            Поле обязательно для заполнения
          </div>
          <div class="invalid-feedback" v-if="$v.username.required && !$v.username.alpha">
            Поле должно содержать только латинские буквы
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email
            <span class="required-field">*</span>
          </label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="mail@example.ru"
            :class="{ 'is-invalid': $v.email.$error, 'is-valid': !$v.email.$invalid }"
            v-model.trim="$v.email.$model"
            @input="onInput($v.email)"
            @blur="onBlur"
          >
          <div class="invalid-feedback" v-if="!$v.email.required && $v.email.email">
            Поле обязательно для заполнения
          </div>
          <div class="invalid-feedback" v-if="$v.email.required && !$v.email.email">
            Адрес должен обязательно содержать символы «@» и «.».
          </div>
        </div>

        <div class="form-group">
          <label for="website">Website</label>
          <input
            type="text"
            class="form-control"
            id="website"
            placeholder="example.ru"
            :class="{ 'is-invalid': $v.website.$error, 'is-valid': !$v.website.$error && $v.website.$model }"
            v-model="$v.website.$model"
            @input="onInput($v.website)"
          >
          <div class="invalid-feedback" v-if="!$v.website.url">
            Адресс сайта должен быть заполнен в формате example.com
          </div>
        </div>

        <div class="form-group">
          <label for="email">Phone</label>
          <masked-input
            type="text"
            class="form-control"
            id="phone"
            placeholder="79125555555"
            :class="{ 'is-invalid': $v.phone.$error, 'is-valid': !$v.phone.$error && $v.phone.$model }"
            mask="\+\7 (111) 111-11-11"
            v-model="$v.phone.$model"
            @input="onInput($v.phone)"
          />
          <div class="invalid-feedback" v-if="!$v.phone.phone">
            Телефон должен быть заполнен в формате +7(9XX)-XXX-XX-XX.
          </div>
        </div>

        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="isChecked">
          <label class="form-check-label" for="exampleCheck1">I agree to the terms & conditions</label>
        </div>
        <button
            type="submit"
            class="btn btn-primary"
            :disabled="isSubmitDisabled"
            @click.prevent="onSubmit"
        >Add User</button>
      </form>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { required, email, helpers } from 'vuelidate/lib/validators';
import { ValidationDelay } from '../mixins';
import MaskedInput from 'vue-masked-input';

const alpha = helpers.regex('alpha', /^[a-zA-Z]*$/);
const phone = helpers.regex('phone', /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/);
const url = helpers.regex('url', /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/);

export default {
  name: 'AddUser',
  mixins: [ ValidationDelay ],
  data() {
    return {
      username: '',
      email: '',
      website: '',
      phone: '',
      isChecked: false,
      isValid: false,
      rawInput: '',
    };
  },
  validations() {
    return {
      username: {
        required,
        alpha,
      },
      email: {
        required,
        email,
      },
      website: {
        url,
      },
      phone: {
        phone,
      }
    };
  },
  components: {
    MaskedInput
  },
  computed: {
    getNextUserId() {
      return this.users.length + 1;
    },
    userData() {
      return {
        username: this.username,
        email: this.email,
        website: this.website,
        phone: this.phone,
      };
    },
    isSubmitDisabled() {
      return !(this.isChecked && this.isValid)
    },

    ...mapState('users', [ 'users' ]),
  },
  methods: {
    onSubmit() {
      const user = {
        id: this.getNextUserId,
        ...this.userData
      };

      this.addUser(user);
      this.$router.push('/');
    },
    onInput(field) {
      this.resetAgreement();
      ValidationDelay.methods.validationDelay(field);
    },
    onBlur() {
      this.checkErrors();
    },
    resetAgreement() {
      if (this.isChecked) {
        this.isChecked = false;
      }
    },
    checkErrors() {
      this.isValid = !this.$v.$anyError;
    },

    ...mapActions('users', [ 'addUser', 'fetchUsers' ]),
  },
  created() {
    this.fetchUsers();
  }
}
</script>

<style>
  .required-field {
    color: red;
  }

  .btn[disabled] {
    cursor: not-allowed;
  }
</style>