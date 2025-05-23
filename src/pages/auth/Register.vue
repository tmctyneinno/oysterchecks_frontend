<template>
  <section class="min-vh-100">
    <div class="container-fluid">
      <div class="row">

        <AuthSideSlider />

        <div class="col-md-6 ">
          <div class="row min-vh-100 justify-content-center align-items-center">
            <div class="col-md-9">
              <div class="card border-0 bg-transparent">
                <div class="card-header bg-transparent border-0 pb-4">
                  <router-link to="/">
                    <img src="/images/logo.png" width="150" alt="">
                  </router-link>
                </div>

                <div class="card-body">

                  <h4 class=" fw-bold fw-700">Sign Up</h4>
                  <p class="text-muted mb-4">Hassle-free sign up proces. Start verifying individuals and businesses
                    within 5 minutes.</p>

                  <form @submit.prevent="signup" class="row g-3 animate__animated animate__fadeIn">
                    <div class="col-lg-6">
                      <div class="form-floating">
                        <input v-model="first_name" v-bind="first_nameAttr" type="text" class="form-control"
                          id="firstanme_input" placeholder="" />
                        <label for="firstanme_input">First Name *</label>
                      </div>
                      <div class="small text-danger">{{ errors?.first_name }}</div>
                    </div>

                    <div class="col-lg-6">
                      <div class="form-floating">
                        <input v-model="last_name" v-bind="last_nameAttr" type="text" class="form-control"
                          id="lastname_input" placeholder="" />
                        <label for="lastname_input">Last Name *</label>
                      </div>
                      <div class="small text-danger">{{ errors?.last_name }}</div>
                    </div>


                    <div class="col-12">
                      <div class="form-floating">
                        <input v-model="email" v-bind="emailAttr" type="email" class="form-control"
                          id="work_email_input" placeholder="" />
                        <label for="work_email_input">Work Email *</label>
                      </div>
                      <div class="small text-danger">{{ errors?.email }}</div>
                    </div>



                    <div class="col-12">
                      <div class="form-floating">
                        <input v-model="company_name" v-bind="company_nameAttr" type="text" class="form-control"
                          id="companyname_input" placeholder="" />
                        <label for="companyname_input">Company Name *</label>
                      </div>
                      <div class="small text-danger">{{ errors?.company_name }}</div>
                    </div>

                    <div class="col-12">
                      <CustomNumberField v-model="phone" :is-form-floating="true" placeholder="Phone"
                        :is-money-format="false" />
                      <!-- <div class="small text-danger">{{ errors?.phone }}</div> -->
                    </div>

                    <div class="col-12">
                      <CustomPasswordField v-model="password" v-bind="passwordAttr" placeholder="Enter Password" />
                      <div class="small text-danger">{{ errors?.password }}</div>
                    </div>

                    <div class="col-12">
                      <CustomPasswordField v-model="repeat_password" v-bind="repeat_passwordAttr"
                        placeholder="Repeat Password" />
                      <div class="small text-danger">{{ errors?.repeat_password }}</div>
                    </div>

                    <div class="col-12">
                      <div class="form-check form-check-inline">
                        <input v-model="agree" v-bind="agreeAttr" class="form-check-input" type="checkbox" id="agree" />
                        <label class="form-check-label" for="agree">
                          I agree to Oystercheck's
                          <router-link to="#">Privacy Policy</router-link>
                          & <router-link to="#">Terms of Service</router-link>
                        </label>
                      </div>
                      <div class="small text-danger">{{ errors?.agree }}</div>

                    </div>

                    <div class="col-12 mt-4">
                      <loadingButton type="submit" className="btn-theme btn-lg w-100" :loading="isSubmitting">
                        SIGN-UP
                      </loadingButton>
                    </div>


                    <div class="mt-4 text-cente">
                      Already have an account?
                      <router-link to="/login">Login</router-link>
                    </div>
                  </form>


                  <div class="mt-5 text-muted">
                    <i class="bi bi-c-circle"></i>
                    Oysterchecks {{ new Date().getFullYear() }}.
                    All Rights Reserved
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import CustomNumberField from '@/components/customNumberField.vue';
import CustomPasswordField from '@/components/customPasswordField.vue';
import AuthSideSlider from './authSideSlider.vue';

import api from '@/api'

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import helperFunctions from '@/stores/helperFunctions';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter()




// form and validation
const validationRules = {
  email: yup.string().email('Invalid email format').required('Password is required'),
  first_name: yup.string().required('Password is required'),
  last_name: yup.string().required('Password is required'),
  company_name: yup.string().required('Password is required'),
  phone: yup.string(),
  agree: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .test(
      'password-complexity',
      'Must contain at least one number and one special character',
      helperFunctions.passwordRegex
    ),
  repeat_password: yup.string()
    .required('Password is required')
    .oneOf([yup.ref('password')], 'Passwords do not match')
};

const { errors, handleSubmit, defineField, setFieldValue, isSubmitting } = useForm({
  validationSchema: toTypedSchema(yup.object(validationRules)),
  initialValues: {
    agree: false, // Default unchecked
  },
});

const [email, emailAttr] = defineField('email');
const [password, passwordAttr] = defineField('password');
const [repeat_password, repeat_passwordAttr] = defineField('repeat_password');
const [first_name, first_nameAttr] = defineField('first_name');
const [last_name, last_nameAttr] = defineField('last_name');
const [company_name, company_nameAttr] = defineField('company_name');
const [phone, phoneAttr] = defineField('phone');
const [agree, agreeAttr] = defineField('agree');

const signup = handleSubmit(async (values) => {

  try {
    const { data } = await api.register(values)
    helperFunctions.toast('Registration Successful, Please Login', 'success')
    router.push({ path: '/login' })
  }
  catch (err: any) {
    const errorMessage = err.response?.data?.errors;
    errors.value.email = errorMessage?.email?.[0]
    errors.value.password = errorMessage?.password?.[0]
    errors.value.phone = errorMessage?.phone?.[0]
  }
})

</script>

<style></style>
