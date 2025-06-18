<template>
    <button type="button" ref="openModal" class="d-none" data-bs-toggle="modal" data-bs-target="#modalId">
        Launch
    </button>

    <div class="modal fade" id="modalId" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog"
        aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollabl modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title" id="modalTitleId">
                        New Client
                    </h5>
                    <button ref="closeModal" type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row g-3">

                        <div class="col-lg-6">
                            <div class="form-label">
                                First name
                                <redAsteric />
                            </div>
                            <CustomTextField :float-label="false" v-model="first_name" v-bind="first_nameAttr"
                                placeholder="" />
                            <div class="xsmall text-danger">{{ errors?.first_name }}</div>
                        </div>

                        <div class="col-lg-6">
                            <div class="form-label">
                                Last name
                                <redAsteric />
                            </div>
                            <CustomTextField :float-label="false" v-model="last_name" v-bind="last_nameAttr"
                                placeholder="" />
                            <div class="xsmall text-danger">{{ errors?.last_name }}</div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-label">
                                Telephone
                                <redAsteric />
                            </div>
                            <CustomPhoneField :size="'normal'" placeholder="" v-model="telephone" />
                            <div class="xsmall text-danger">{{ errors?.telephone }}</div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-label">
                                Mobile
                                <redAsteric />
                            </div>
                            <CustomPhoneField :size="'normal'" placeholder="" v-model="mobile" />
                            <div class="xsmall text-danger">{{ errors?.mobile }}</div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-label">
                                Date of Birth
                                <redAsteric />
                            </div>
                            <CustomDatePicker :max-date="new Date()" v-model="dob" />
                            <div class="xsmall text-danger">{{ errors?.dob }}</div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-label">
                                Country
                                <redAsteric />
                            </div>
                            <CustomSelect v-model="country" :options="clientsStore.countries"
                                placeholder="select country" />
                            <div class="xsmall text-danger">{{ errors?.country }}</div>
                        </div>


                        <div class="col-12">
                            <div class="form-label">
                                Email
                                <redAsteric />
                            </div>
                            <CustomTextField :float-label="false" type="email" v-model="email" v-bind="emailAttr"
                                placeholder="" />
                            <div class="xsmall text-danger">{{ errors?.email }}</div>
                        </div>

                        <!-- <div class="col-12">
                            <div class="form-label">
                                Upload Image
                            </div>
                            <DropzoneComponent @fileUploaded="updateFile" />
                        </div> -->
                    </div>
                </div>
                <div class="modal-footer border-0">
                    <button type="button" class="btn btn-outline-secondary rounded-4" data-bs-dismiss="modal">
                        Cancel
                    </button>
                    <div style="width: 150px;">
                        <loadingButton @click="addClient" className="btn-theme w-100" :loading="isSubmitting">
                            Add Client
                        </loadingButton>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useClientsStore } from '@/stores/clientsStore';
import { onBeforeRouteLeave } from 'vue-router';
import helperFunctions from '@/stores/helperFunctions';

import api from '@/api'

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
// import DropzoneComponent from '@/components/Inputs/dropzoneComponent.vue';
import CustomTextField from '@/components/Inputs/customTextField.vue';
import CustomPhoneField from '@/components/Inputs/customPhoneField.vue';
import CustomDatePicker from '@/components/Inputs/customDatePicker.vue';
import CustomSelect from '@/components/Inputs/customSelect.vue';


const clientsStore = useClientsStore()

const emit = defineEmits(['done'])

// form and validation
const validationRules = {
    email: yup.string().email('Invalid email format').required('Email is required'),
    first_name: yup.string().required('First Name is required'),
    country: yup.object().required('Country is required'),
    last_name: yup.string().required('Last Name is required'),
    dob: yup.date().required('DOB is required'),
    telephone: yup.string().required('Phone Number is required').test(
        'phone-format',
        'Invalid format (e.g., +1234567890)',
        (value) => { return helperFunctions.validatePhoneNo(value) }
    ),
    mobile: yup.string().required('Phone Number is required').test(
        'phone-format',
        'Invalid format (e.g., +1234567890)',
        (value) => { return helperFunctions.validatePhoneNo(value) }
    ),

};

const { errors, handleSubmit, defineField, isSubmitting, resetForm } = useForm({
    validationSchema: toTypedSchema(yup.object(validationRules)),
});

const [email, emailAttr] = defineField('email');
const [first_name, first_nameAttr] = defineField('first_name');
const [last_name, last_nameAttr] = defineField('last_name');
const [telephone, telephone_Attr] = defineField('telephone');
const [mobile, mobileAttr] = defineField('mobile');
const [dob, dobAttr] = defineField('dob');
const [country, countryAttr] = defineField('country');




const addClient = handleSubmit(async (values) => {

    try {
        const newClient = {
            type: "person",
            email: values.email.trim().toLowerCase(),
            mobile: values.mobile.replace(/\s+/g, ''),
            telephone: values.telephone.replace(/\s+/g, ''),
            joinedDate: helperFunctions.dateDisplay(new Date(), 'YYYY-MM-DD'),
            personDetails: {
                firstName: values.first_name.trim(),
                lastName: values.last_name.trim(),
                dob: helperFunctions.dateDisplay(new Date(values.dob), 'YYYY-MM-DD'),
                // @ts-ignore
                nationality: values.country?.isoCode

            }
        }

        const { data } = await api.createClient(newClient)
        if (data.status == 201) {
            helperFunctions.toast(data.message, 'success')
            closeModal.value?.click()
            emit('done')
        }
    }
    catch (err: any) {
        helperFunctions.toast(err.response?.message ?? 'Could not create Client, Something went wrong', 'error')
    }
})



const openModal = ref<any>(null)
const closeModal = ref<any>(null)

watch(() => clientsStore.toggleAddModal, () => {
    resetForm()
    openModal.value?.click()
})

onBeforeRouteLeave(() => {
    closeModal.value?.click()
})
</script>