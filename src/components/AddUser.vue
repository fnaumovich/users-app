<template>
  <section>
    <div class="container">
      <div class="form">
        <FormGroup>
          <FormInput
            v-bind="baseFields.id"
            :value="getNextUserId"
          ></FormInput>
        </FormGroup>

        <FormGroup>
          <FormInput
            v-bind="baseFields.username"
            :isError="$v.username.$error"
            :isValid="!$v.username.$invalid"
            :isRequiredError="!$v.username.required && $v.username.alpha"
            :isValidationError="$v.username.required && !$v.username.alpha"
            @input="setField($event.target.value, 'username')"
            @blur="onBlur"
          >
            <template slot="requiredError">Поле обязательно для заполнения</template>
            <template slot="validationError">Поле должно содержать только латинские буквы</template>
          </FormInput>
        </FormGroup>

        <FormGroup>
          <FormInput
            v-bind="baseFields.email"
            :isError="$v.email.$error"
            :isValid="!$v.email.$invalid"
            :isRequiredError="!$v.email.required && $v.email.email"
            :isValidationError="$v.email.required && !$v.email.email"
            @input="setField($event.target.value, 'email')"
            @blur="onBlur"
          >
            <template slot="requiredError">Поле обязательно для заполнения</template>
            <template slot="validationError">Адрес должен обязательно содержать символы «@» и «.».</template>
          </FormInput>
        </FormGroup>

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
          <input type="checkbox" class="form-check-input" id="check" v-model="isChecked">
          <label class="form-check-label" for="check">I agree to the terms & conditions</label>
        </div>
        <button
            type="submit"
            class="btn btn-primary"
            :disabled="isSubmitDisabled"
            @click.prevent="onSubmit"
        >Add User</button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { required, email, helpers } from 'vuelidate/lib/validators';
import { ValidationDelay } from '../mixins';
import MaskedInput from 'vue-masked-input';
import * as Regexp from '../tools/regexp'

const alpha = helpers.regex('alpha', Regexp.alpha);
const phone = helpers.regex('phone', Regexp.phone);
const url = helpers.regex('url', Regexp.url);

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
      baseFields: {
        id: {
          id: 'id',
          label: 'Id',
          readonly: 'readonly',
        },
        username: {
          id: 'username',
          label: 'Username',
          placeholder: 'Username',
          required: true,
        },
        email: {
          id: 'email',
          label: 'Email',
          placeholder: 'mail@example.ru',
          required: true,
        },
        website: {
          id: 'website',
          label: 'Website',
          placeholder: 'example.ru',
        },
        phone: {
          id: 'phone',
          label: 'Phone',
          placeholder: '79125555555',
        },
      }
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
    MaskedInput,
    FormGroup: require('./form/FormGroup').default,
    FormInput: require('./form/FormInput').default,
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
      this.resetAgreement();
      this.resetFields();
      this.resetVuelidate();
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
    resetFields() {
      this.username = '';
      this.email = '';
      this.website = '';
      this.phone = '';
    },
    resetVuelidate() {
      this.$v.$reset();
    },
    checkErrors() {
      this.isValid = !this.$v.$anyError;
    },
    setField(value, field) {
      this[field] = value.trim();
      this.$v[field].$touch();

      this.resetAgreement();
      ValidationDelay.methods.validationDelay(this.$v[field]);
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