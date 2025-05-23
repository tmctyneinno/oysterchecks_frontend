<template>
  <section class="min-vh-100">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6 ">

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
                  <p class="text-muted mb-4">Access Oysterchecks using your email and password.</p>

                  <div v-if="loginError" class=" alert alert-danger border-0 py-2">
                    <i class="bi bi-exclamation-circle-fill"></i> {{ loginError }}
                  </div>
                  <form @submit.prevent="login" class="row g-3 animate__animated animate__fadeIn">

                    <div class="col-12">
                      <div class="form-floating">
                        <input v-model="email" v-bind="emailAttr" type="text" class="form-control" id="email_input"
                          placeholder="" />
                        <label for="email_input">Email Address</label>
                      </div>
                      <div class="small text-danger">{{ errors?.email }}</div>
                    </div>

                    <div class="col-12">
                      <CustomPasswordField v-model="password" v-bind="passwordAttr" />

                      <div class="small text-danger">{{ errors?.password }}</div>
                      <router-link to="#" class="mt-1 float-end small text-decoration-none">
                        Forgot password?
                      </router-link>
                    </div>

                    <div class="col-12 mt-4">
                      <loadingButton type="submit" className="btn-theme btn-lg w-100" :loading="isSubmitting">
                        SIGN-IN
                      </loadingButton>
                    </div>

                    <div class="mt-4 text-center">
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

const authStore = useAuthStore()

// form and validation
const validationRules = {
  email: yup.string().email('Invalid email format').required('Password is required'),
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
  validationSchema: toTypedSchema(yup.object(validationRules),)
});

const [email, emailAttr] = defineField('email');
const [password, passwordAttr] = defineField('password');

const loginError = ref<string>('')

const login = handleSubmit(async (values) => {
  loginError.value = ''
  try {
    const payload = helperFunctions.encrypedLoginCredentials(values.email, values.password);
    const { data } = await api.login(payload)
    authStore.login(data.token)
  }
  catch (error: any) {
    if (error?.status == 401) loginError.value = error?.response?.data?.message
    else helperFunctions.toast('Network Error!', 'error')
  }
})

</script>
