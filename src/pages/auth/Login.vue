<template>
  <section class="min-vh-100">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6 py-3">

          <div class="row min-vh-100 justify-content-center align-items-center">
            <div class="col-md-8">

              <div class="card border-0 bg-transparent">
                <div class="card-header bg-transparent border-0 pb-4">
                  <router-link to="/">
                    <img src="/images/logo.png" width="150" alt="">
                  </router-link>
                </div>
                <div class="card-body">

                  <h4 class=" fw-bold fw-700">Sign-In</h4>
                  <p class="text-muted mb-4 small">Access Oysterchecks using your email and password.</p>

                  <div v-if="loginError" class=" alert alert-danger border-0 py-2">
                    <i class="bi bi-exclamation-circle"></i> {{ loginError }}
                  </div>
                  <form @submit.prevent="login" class="row g-3 animate__animated animate__fadeIn">

                    <div class="col-12">
                      <CustomTextField type="email" v-model="email" v-bind="emailAttr" placeholder="Email Address" />
                      <div class="small text-danger">{{ errors?.email }}</div>
                    </div>

                    <div class="col-12">
                      <CustomPasswordField v-model="password" v-bind="passwordAttr" />
                      <div class="small text-danger">{{ errors?.password }}</div>
                    </div>



                    <div class="col-12 my-0">
                      <router-link to="#" class="mt-1 float-end small text-decoration-none">
                        Forgot password?
                      </router-link>
                    </div>

                    <div class="col-12 py-0">
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="rememberMe" v-model="rememberMe">
                        <label class="form-check-label" for="rememberMe">
                          Remember me
                        </label>
                      </div>
                    </div>

                    <div class="col-12 mt-3">
                      <loadingButton type="submit" className="btn-theme btn-lg w-100" :loading="isSubmitting">
                        SIGN-IN
                      </loadingButton>
                    </div>

                    <div class="mt-2 text-center">
                      Dont have an account yet?
                      <router-link to="/register" class="text-decoration-none">Sign up</router-link>
                    </div>

                    <div class="mt-5 text-muted">
                      <i class="bi bi-c-circle"></i>
                      Oysterchecks {{ new Date().getFullYear() }}.
                      All Rights Reserved
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AuthSideSlider />

      </div>
    </div>
  </section>


</template>

<script setup lang="ts">
import CustomPasswordField from '@/components/customPasswordField.vue';
import AuthSideSlider from './authSideSlider.vue';
import api from '@/api'

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import helperFunctions from '@/stores/helperFunctions';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import CustomTextField from '@/components/customTextField.vue';
import { useStorage } from '@vueuse/core';

const authStore = useAuthStore()

const rememberMeEmail = useStorage('rememberMeEmail', '', localStorage);



// form and validation
const validationRules = {
  email: yup.string().email('Invalid email format').required('Email is required'),
  rememberMe: yup.bool(),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .test(
      'password-complexity',
      'Must contain at least one number and one special character',
      helperFunctions.passwordRegex
    ),
};

const { errors, handleSubmit, defineField, setFieldValue, isSubmitting } = useForm({
  validationSchema: toTypedSchema(yup.object(validationRules)),
  initialValues: {
    rememberMe: rememberMeEmail.value ? true : false,
    email: rememberMeEmail.value || '',
  },
});

const [email, emailAttr] = defineField('email');
const [password, passwordAttr] = defineField('password');
const [rememberMe] = defineField('rememberMe');

const loginError = ref<string>('')

const login = handleSubmit(async (values) => {
  loginError.value = ''

  try {
    const payload = helperFunctions.encrypedLoginCredentials(values.email, values.password);
    const { data } = await api.login(payload)
    authStore.login(data.token)
    rememberMeEmail.value = values.rememberMe ? values.email : '';
  }
  catch (error: any) {
    loginError.value = error?.response?.data?.message || 'An error occurred while logging in.'
  }
})

</script>
