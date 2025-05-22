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
                      <button v-if="!isSubmitting" type="submit" class="btn btn-theme btn-lg w-100">
                        SIGN-IN
                      </button>
                      <loadingButton v-else />
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
import { reactive, ref } from 'vue';
import api from '@/api'

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import useFunctions from '@/stores/useFunctions';


// form and validation

const rules = {
  email: yup.string().email('Invalid email format').required('Password is required'),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .test(
      'password-complexity',
      'Must contain at least one number and one special character',
      useFunctions.passwordRegex
    ),
};

const { errors, handleSubmit, defineField, setFieldValue, isSubmitting } = useForm({
  validationSchema: toTypedSchema(yup.object(rules),)
});

const [email, emailAttr] = defineField('email');
const [password, passwordAttr] = defineField('password');


const login = handleSubmit(async (values) => {
  const payload = {
    c: btoa(values.email) + 'oystercheck' + btoa(values.password),
    t: Date.now(),
    v: 1
  }
  const { data } = await api.login(payload)
  // isLoggingIn.value = true
  // setTimeout(() => {
  //   isLoggingIn.value = false
  // }, 5000)
})

</script>
