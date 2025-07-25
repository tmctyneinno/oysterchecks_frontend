<template>
    <div class="fw-600">Basic Information</div>
    <div class="text-muted">This is your personal information that you can update anytime</div>
    <hr>

    <div class="row g-3">
        <div class="col-md-4">
            <div class="fw-600">Profile Photo</div>
            <div class="small"> This image will be shown publicly
                as your display picture</div>
        </div>

        <div class="col-md-5 d-flex justify-content-center align-items-center">
            <div>
                <div class="d-flex justify-content-center">
                    <ImageCircle :src="'/images/avatar.png'" />
                </div>
                <div class="text-center fw-600 text-capitalize">{{ authStore.profile?.name }}</div>
            </div>

        </div>
    </div>

    <hr>
    <div class="row g-3">
        <div class="col-md-4">
            <div class="fw-600">Profile Details</div>
        </div>

        <div class="col-md-6">
            <div class="row g-3">
                <div class="col-lg-6">
                    <div class="form-labe">First Name
                        <RedAsteric />
                    </div>
                    <CustomTextField :float-label="false" v-model="first_name" v-bind="first_nameAttr" placeholder="" />
                    <div class="small text-danger">{{ errors?.first_name }}</div>
                </div>

                <div class="col-lg-6">
                    <div class="form-labe">Last Name
                        <RedAsteric />
                    </div>
                    <CustomTextField :float-label="false" v-model="last_name" v-bind="last_nameAttr" placeholder="" />
                    <div class="small text-danger">{{ errors?.last_name }}</div>
                </div>

                <div class="col-lg-6">
                    <div class="form-labe">Phone
                        <RedAsteric />
                    </div>
                    <CustomPhoneField :class-name="'normal-field'" placeholder="" v-model="phone" v-bind="phoneAttr" />
                    <div class="small text-danger">{{ errors?.phone }}</div>
                </div>

                <div class="col-lg-6">
                    <div class="form-labe">Company Name
                        <RedAsteric />
                    </div>
                    <CustomTextField :float-label="false" v-model="company_name" v-bind="company_nameAttr"
                        placeholder="" />
                    <div class="small text-danger">{{ errors?.company_name }}</div>
                </div>

                <div class="col-12 mt-5">
                    <loadingButton style="width: 200px;" @click="submitForm" type="submit"
                        className="btn-theme float-end" :loading="isSubmitting">
                        Save Settings
                    </loadingButton>
                    <button @click="updatesFieldsFromStore" class="btn btn-outline-dark rounded-5 float-end me-2">Cancel
                    </button>
                </div>
            </div>
        </div>

    </div>



</template>

<script setup lang="ts">
import RedAsteric from '@/components/redAsteric.vue';
import { useAuthStore } from '@/stores/authStore';
import api from '@/api'
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import helperFunctions from '@/stores/helperFunctions';
import CustomTextField from '@/components/Inputs/customTextField.vue';
import CustomPhoneField from '@/components/Inputs/customPhoneField.vue';
import { onMounted, ref, watch } from 'vue';


const authStore = useAuthStore()

onMounted(async () => {
    await authStore.getProfile()
    updatesFieldsFromStore()

})

const aFieldHasBeenChanged = ref<boolean>(false)

function updatesFieldsFromStore() {
    setFieldValue('first_name', authStore.profile?.first_name)
    setFieldValue('last_name', authStore.profile?.last_name)
    setFieldValue('company_name', authStore.profile?.company_name)
    setFieldValue('phone', authStore.profile?.phone)
    aFieldHasBeenChanged.value = false
}



// form and validation
const validationRules = {
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

};

const { errors, handleSubmit, defineField, setFieldValue, isSubmitting } = useForm({
    validationSchema: toTypedSchema(yup.object(validationRules)),
    initialValues: {
        // 
    },
});

const [first_name, first_nameAttr] = defineField('first_name');
const [last_name, last_nameAttr] = defineField('last_name');
const [company_name, company_nameAttr] = defineField('company_name');
const [phone, phoneAttr] = defineField('phone');


const submitForm = handleSubmit(async (values: any) => {

    try {

        values.phone = values.phone.replace(/\s+/g, ''); // Remove spaces
        values.first_name = values.first_name.trim();
        values.last_name = values.last_name.trim();
        values.company_name = values.company_name.trim();

        await api.profileUpdate(values)
        authStore.getProfile()
        helperFunctions.toast('Profile Updated', 'success')


    }
    catch (err: any) {
        const errorMessage = err.response?.data?.errors;
        errors.value.phone = errorMessage?.phone?.[0]
    }
})



</script>