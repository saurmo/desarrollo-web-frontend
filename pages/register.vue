<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
  <v-container fill-height>
    <v-row justify="center">
      <v-col cols="6">
        <v-card>
          <v-card-title>
            <v-spacer></v-spacer>
            Crear cuenta
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text>
            <v-form ref="formAccount" v-model="form_is_valid">
              <v-row justify="center">
                <v-col cols="5">
                  <v-text-field v-model="user.firstname" :counter="20" label="First name" :rules="namesRules" required>
                    <template #label>
                      Firstname <span v-if="!user.firstname">(<span class="red--text">*</span>)</span>
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="5">
                  <v-text-field v-model="user.lastname" :rules="namesRules" :counter="20" label="Last name" required />
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="5">
                  <v-text-field v-model="user.email" :rules="emailRules" label="Email" required type="email" />
                </v-col>
                <v-col cols="5">
                  <v-text-field v-model="user.repeat_email" :rules="emailRules" label="Repeat Email" required
                    type="email" />
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="5">
                  <v-text-field v-model="user.password" :type="passwordType ? 'password' : 'text'" :rules="passwordRules"
                    label="Password" required :append-icon="passwordType ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="passwordType = !passwordType" />

                </v-col>
                <v-col cols="5">
                  <v-text-field v-model="user.repeat_password" :type="repeatPasswordType ? 'password' : 'text'"
                    :rules="passwordRepeatRules" label="Repeat password" required
                    :append-icon="repeatPasswordType ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="repeatPasswordType = !repeatPasswordType" />
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="2">
                  <v-btn color="success" class="text-none" @click="createAccount">
                    Create Account
                  </v-btn>

                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Account, AccountService } from "../assets/domain/account";
export default {
  layout: 'blank',

  data: () => ({
    form_is_valid: false,
    passwordType: true,
    repeatPasswordType: true,
    user: {
      firstname: null,
      lastname: null,
      email: null,
      repeat_email: null,
      password: null,
      repeat_password: null,
    },
    namesRules: [
      // (value: string) => {
      //   if (value) return true
      //   else return 'The field is required.'
      // },
      (v: string) => !!v || 'The field is required.',
      (value: string) => (value?.length <= 20) || 'Field must be less than 20 characters.',
    ],
    emailRules: [
      (v: string) => !!v || 'E-mail is requred.',
      (v: string) => (/.+@.+\..+/.test(v)) || 'E-mail must be valid.',
    ],
    passwordRules: [
      (v: string) => !!v || 'The field is requred.',
      (v: string) => (/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(v))
        || 'The password must have between 8 and 16 characters, at least one digit, at least one lower case and at least one upper case',
    ],

  }),
  computed: {
    passwordRepeatRules() {
      return [
        (v: string) => !!v || 'The field is requred.',
        (v: string) => (/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(v))
          || 'The password must have between 8 and 16 characters, at least one digit, at least one lower case and at least one upper case',
        (v: string) => {
          return v === this?.user.password || "Password must match"
        }
      ]
    }
  },
  methods: {
    createAccount() {
      const formAccount: any = this.$refs.formAccount
      if (!formAccount.validate()) {
        return
      }
      const account: Account = {
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        email: this.user.email,
        password: this.user.password,
      }
      const accountService = new AccountService(account)
      accountService.createAccount()



    },
    reset() {
      // this.$refs.form.reset()
    },
    resetValidation() {
      // this.$refs.form.resetValidation()
    },
  },

}
</script>

<style></style>
