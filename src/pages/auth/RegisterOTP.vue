<template>
  <section class="min-vh-100">
    <div class="container-fluid">
      <div class="row">

        <AuthSideSlider />

        <div class="col-md-6">
          <div class="row min-vh-100 justify-content-center align-items-center">
            <div class="col-md-9">
              <div class="card border-0 bg-transparent">
                <div class="card-header bg-transparent border-0 pb-4">
                  <router-link to="#">
                    <img src="/images/logo.png" width="150" alt="">
                  </router-link>
                </div>

                <div class="card-body text-center">


                  <h4 class=" fw-bold fw-700 lh-1">Verify your Identity</h4>
                  <p class="text-muted mb-4 small">Enter the code sent to your email.</p>
                  <p class="text-muted mb-4 small">A verification code has been sent to your email address
                    <span>{{ email }}</span>
                  </p>

                  <div class="row g-3">

                    <div class="col-12">
                      <div class="d-flex justify-content-center">
                        <v-otp-input :is-disabled="isDisabled" ref="otpInputRef" input-classes="otp-input" separator=" "
                          inputType="number" inputmode="numeric" :num-inputs="6" v-model:value="otpInput"
                          :should-auto-focus="true" :should-focus-order="true" @on-change="handleOnChange"
                          @on-complete="handleOnComplete" />
                      </div>
                    </div>

                    <div class="col-12">
                      <a @click="resendOtp" class="float-end" href="#">Resend code</a>
                    </div>

                    <div class="col-12">
                      <div v-if="errorMessage" class="alert alert-danger border-0 py-2">
                        <i class="bi bi-exclamation-circle"></i> {{ errorMessage }}
                      </div>
                    </div>


                    <div class="col-12">
                      <button v-if="!otpIsCompleted" class="btn btn-theme btn-lg w-100" disabled>VERIFY</button>

                      <loadingButton @click="verifyOtp" v-else type="submit" className="btn-theme btn-lg w-100"
                        :loading="isSubmitting">
                        VERIFY
                      </loadingButton>
                    </div>

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
import helperFunctions from '@/stores/helperFunctions';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import type VOtpInput from "vue3-otp-input";

const router = useRouter()
const route = useRoute()

const email = ref<string>("");
const stroredValues = ref<any>({});

onMounted(() => {
  const stored = localStorage.getItem('oysterTempRegData');
  stroredValues.value = stored ? JSON.parse(stored) : {};
  email.value = String(route.query.e || '');

  if (!helperFunctions.isValidEmail(email.value) || email.value !== stroredValues.value.email) {
    router.push({ path: '/register' });
  }
});


const otpInputRef = ref<InstanceType<typeof VOtpInput> | null>(null);
const otpInput = ref("");
const errorMessage = ref("");
const isDisabled = ref<boolean>(false);
const otpIsCompleted = ref<boolean>(false)
const isSubmitting = ref<boolean>(false)

const handleOnComplete = async (value: string) => {
  // console.log("OTP completed: ", value);
  otpIsCompleted.value = true

};


const handleOnChange = (value: string) => {
  // console.log("OTP changed: ", value);
  otpIsCompleted.value = false
};


async function verifyOtp() {
  errorMessage.value = "";
  isSubmitting.value = true;
  isDisabled.value = true;

  try {
    const resp = await api.verifyOtp({
      email: email.value,
      otp_code: otpInput.value
    });

    if (resp?.status === 200) {
      await api.register(stroredValues.value)
      helperFunctions.toast('Registration Successful, Please Login', 'success')
      localStorage.removeItem('oysterTempRegData');
      router.push({ path: '/login' })
    }

  } catch (error: any) {
    errorMessage.value = error?.response?.data?.message || 'Error verifying OTP'
  } finally {
    isSubmitting.value = false;
    isDisabled.value = false;
    otpIsCompleted.value = false;
    otpInputRef.value?.clearInput();
  }
}
async function resendOtp() {
  errorMessage.value = "";
  isDisabled.value = true;

  try {
    await api.sendOtp({ email: email.value });
    helperFunctions.toast(`OTP sent to ${email.value}`, 'success');
  } catch (error: any) {
    errorMessage.value = error?.response?.data?.message || 'Error sending OTP';
  } finally {
    isDisabled.value = false;
  }
}


</script>

<style>
.otp-input {
  width: 45px;
  height: 45px;
  padding: 5px;
  margin: 0 10px;
  font-size: 18px;
  border-radius: 10px;
  border: 1px solid var(--bs-border-color);
  text-align: center;
  background-color: #D1E3FF;
}


/* .otp-input.is-complete {
   
} */

.otp-input:focus {
  border-color: var(--theme-color) !important
}

.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

@media(max-width: 767px) {
  .otp-input {
    width: 30px;
    height: 30px;

  }
}
</style>
