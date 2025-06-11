<template>
  <section class="min-vh-100">
    <div class="container-fluid">
      <div class="row">

        <AuthSideSlider />

        <div class="col-md-6  py-3">
          <div class="row min-vh-100 justify-content-center align-items-center">
            <div class="col-md-9">
              <div class="card border-0 bg-transparent">
                <div class="card-header bg-transparent border-0 pb-4">
                  <router-link to="#">
                    <img src="/images/logo.png" width="150" alt="">
                  </router-link>
                </div>

                <div class="card-body">

                  <h4 class=" fw-bold fw-700">Sign Up</h4>
                  <p class="text-muted mb-4 small">Hassle-free sign up proces. Start verifying individuals and
                    businesses
                    within 5 minutes.</p>

                  <form @submit.prevent="signup" class="row g-3 animate__animated animate__fadeIn">
                    <div class="col-lg-6">
                      <CustomTextField v-model="first_name" v-bind="first_nameAttr" placeholder="First Name *" />
                      <div class="small text-danger">{{ errors?.first_name }}</div>
                    </div>

                    <div class="col-lg-6">
                      <CustomTextField v-model="last_name" v-bind="last_nameAttr" placeholder="Last Name *" />
                      <div class="small text-danger">{{ errors?.last_name }}</div>
                    </div>


                    <div class="col-12">
                      <CustomTextField type="email" v-model="email" v-bind="emailAttr" placeholder="Work Email *" />
                      <div class="small text-danger">{{ errors?.email }}</div>
                    </div>

                    <div class="col-12">
                      <CustomTextField v-model="company_name" v-bind="company_nameAttr" placeholder="Company Name *" />
                      <div class="small text-danger">{{ errors?.company_name }}</div>
                    </div>

                    <div class="col-12">
                      <CustomPhoneField placeholder="Company Phone" v-model="phone" />
                      <div class="small text-danger">{{ errors?.phone }}</div>
                    </div>

                    <div class="col-12">
                      <CustomPasswordField v-model="password" v-bind="passwordAttr" placeholder="Enter Password *" />
                      <div class="small text-danger">{{ errors?.password }}</div>
                    </div>

                    <div class="col-12">
                      <CustomPasswordField v-model="repeat_password" v-bind="repeat_passwordAttr"
                        placeholder="Repeat Password *" />
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


                    <div class="mt-2 text-center">
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

import AuthSideSlider from './authSideSlider.vue';
import api from '@/api'
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import helperFunctions from '@/stores/helperFunctions';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CustomTextField from '@/components/Inputs/customTextField.vue';
import CustomPhoneField from '@/components/Inputs/customPhoneField.vue';
import CustomPasswordField from '@/components/Inputs/customPasswordField.vue';
import { useStorage } from '@vueuse/core';


const router = useRouter()

const tempRegisterStorage = useStorage<any>('oysterTempRegData', null, localStorage);


// form and validation
const validationRules = {
  email: yup.string().email('Invalid email format').required('Email is required'),
  first_name: yup.string().required('First Name is required'),
  last_name: yup.string().required('Last Name is required'),
  company_name: yup.string().required('Company Name is required'),
  phone: yup.string().required('Phone Number is required').test(
    'phone-format',
    'Phone number must be in international format (e.g., +1234567890)',
    (value) => {
      // Allow empty value for optional field
      if (!value) return true;
      // Check if the phone number starts with '+' and contains only digits after that but allow spaces
      value = value.replace(/\s+/g, ''); // Remove spaces
      return /^\+?\d+$/.test(value);
    }
  ),
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
    .required('Repeat Password is required')
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

    values.phone = values.phone.replace(/\s+/g, ''); // Remove spaces
    // values.phone = values.phone.startsWith('+') ? values.phone : `+${values.phone}`; // Ensure phone starts with '+'
    values.agree = values.agree ? true : false; // Ensure agree is a boolean
    values.first_name = values.first_name.trim();
    values.last_name = values.last_name.trim();
    values.company_name = values.company_name.trim();
    values.email = values.email.trim().toLowerCase(); // Normalize email
    values.password = values.password.trim();
    values.repeat_password = values.repeat_password.trim();

    await api.sendOtp({ email: values.email })
    tempRegisterStorage.value = JSON.stringify(values)
    router.push({
      path: '/register/otp',
      query: { e: values.email, tm: new Date().getTime() }
    })

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
