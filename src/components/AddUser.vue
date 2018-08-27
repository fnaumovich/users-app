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
            v-model.trim="$v.username.$model"
            @input="onInput($v.username)"
            @blur="onBlur"
          >
            <template slot="requiredError">
              Поле обязательно для заполнения
            </template>
            <template slot="validationError">
              Поле должно содержать только латинские буквы
            </template>
          </FormInput>
        </FormGroup>

        <FormGroup>
          <FormInput
            v-bind="baseFields.email"
            :isError="$v.email.$error"
            :isValid="!$v.email.$invalid"
            :isRequiredError="!$v.email.required && $v.email.email"
            :isValidationError="$v.email.required && !$v.email.email"
            v-model.trim="$v.email.$model"
            @input="onInput($v.email)"
            @blur="onBlur"
          >
            <template slot="requiredError">
              Поле обязательно для заполнения
            </template>
            <template slot="validationError">
              Адрес должен обязательно содержать символы «@» и «.».
            </template>
          </FormInput>
        </FormGroup>

        <FormGroup>
          <FormInput
            v-bind="baseFields.website"
            :isError="$v.website.$error"
            :isValid="!!(!$v.website.$error && $v.website.$model)"
            :isValidationError="!$v.website.url"
            v-model.trim="$v.website.$model"
            @input="onInput($v.website)"
            @blur="onBlur"
          >
            <template slot="validationError">
              Адресс сайта должен быть заполнен в формате example.com
            </template>
          </FormInput>
        </FormGroup>

        <FormGroup>
          <FormInput
            v-bind="baseFields.phone"
            :isError="$v.phone.$error"
            :isValid="!!(!$v.phone.$error && $v.phone.$model)"
            :isValidationError="!$v.phone.phone"
            :value="phone"
            @input="setField($event, 'phone')"
            @blur="onBlur"
          >
            <template slot="validationError">
              Телефон должен быть заполнен в формате +7(9XX)-XXX-XX-XX.
            </template>
          </FormInput>
        </FormGroup>

        <FormGroup :isCheckbox="true">
          <FormCheckbox
            v-bind="baseFields.checkbox"
            :value="isChecked"
            @change="onCheck"
          >
            I agree to the terms & conditions
          </FormCheckbox>
        </FormGroup>

        <button
          type="submit"
          class="btn btn-primary"
          :disabled="isSubmitDisabled"
          @click.prevent="onSubmit"
        >Add User
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { required, email, helpers } from 'vuelidate/lib/validators';
import { ValidationDelay } from '../mixins';
import MaskedInput from 'vue-masked-input';
import * as Regexp from '../tools/regexp';

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
          upperFirst: true,
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
          mask: '\\+\\7 (111) 111-11-11',
        },
        checkbox: {
          id: 'check'
        }
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
    FormCheckbox: require('./form/FormCheckbox').default,
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
    onCheck(value) {
      this.isChecked = value;
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
  },
}
</script>

<style>
  .btn[disabled] {
    cursor: not-allowed;
  }
</style>
