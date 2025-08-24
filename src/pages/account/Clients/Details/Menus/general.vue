<template>
    <div class="card h-100 border-0 rounded-4">
        <div class="card-header bg-transparent border-0">
            <span v-if="!isEditing" class="fw-500">General</span>
            <span v-else>
                <i @click="isEditing = false" class="bi bi-arrow-left cursor-pointer"></i>
                Edit Clients Details
            </span>
            <button v-if="!isEditing" @click="setEditingToTrue"
                class="btn btn-sm btn-outline-dark float-end rounded-4 ">
                <i class="bi bi-pencil-fill"></i> Edit
            </button>
        </div>
        <div class="card-body">
            <!-- <div class="d-flex flex-wrap gap-2"> -->
            <div class="row g-3 small">
                <div class="col-md-4">
                    <div class="small text-muted">First Name</div>
                    <span v-if="!isEditing"> {{ clientDetails?.first_name ?? '-' }}</span>
                    <div v-else>
                        <CustomTextField :float-label="false" v-model="first_name" v-bind="first_nameAttr"
                            placeholder="" />
                        <div class="xsmall text-danger">{{ errors?.first_name }}</div>
                    </div>
                </div>


                <div class="col-md-4">
                    <div class="small text-muted">Last Name</div>
                    <span v-if="!isEditing">{{ clientDetails?.last_name ?? '-' }}</span>

                    <div v-else>
                        <CustomTextField :float-label="false" v-model="last_name" v-bind="last_nameAttr"
                            placeholder="" />
                        <div class="xsmall text-danger">{{ errors?.last_name }}</div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="small text-muted">Email Address</div>
                    <span v-if="!isEditing">{{ clientDetails?.email ?? '-' }}</span>
                    <div v-else>
                        <CustomTextField :float-label="false" v-model="email" v-bind="emailAttr" placeholder="" />
                        <div class="xsmall text-danger">{{ errors?.email }}</div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="small text-muted">Date of birth</div>
                    <span v-if="!isEditing">{{ helperFunctions.dateDisplay(clientDetails?.dob ?? '') }}</span>

                    <div v-else>
                        <CustomDatePicker :max-date="new Date()" v-model="dob" />
                        <div class="xsmall text-danger">{{ errors?.dob }}</div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="small text-muted">Nationality</div>
                    <span v-if="!isEditing">{{ clientsStore.countryName(clientDetails?.nationality ?? '') }}</span>

                    <div v-else>
                        <CustomSelect v-model="country" :options="clientsStore.countries"
                            placeholder="select country" />
                        <div class="xsmall text-danger">{{ errors?.country }}</div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="small text-muted">Telephone</div>
                    <span v-if="!isEditing">{{ clientDetails?.telephone ?? '-' }}</span>
                    <div v-else>
                        <CustomPhoneField :size="'normal'" placeholder="" v-model="telephone" />
                        <div class="xsmall text-danger">{{ errors?.telephone }}</div>
                    </div>
                </div>

                <!-- <div class="col-md-4">
                    <div class="small text-muted">Gender</div>
                    <span v-if="!isEditing">Nil</span>
                    <select v-else class="form-select ">
                        <option selected>Select--</option>
                    </select>
                </div> -->


                <div v-if="!isEditing" class="col-md-4">
                    <div class="small text-muted">Created On</div>
                    <span>{{ helperFunctions.dateTimeDisplay(clientDetails?.created_at ?? '') }}</span>
                </div>
                <!-- <div class="col-md-4">
                    <div class="small text-muted">SSN Number (US Only)</div>
                    <span v-if="!isEditing">Nil</span>
                    <input v-else type="text" class="form-control">
                </div>

                <div class="col-md-4">
                    <div class="small text-muted">Social Insurance Number</div>
                    <span v-if="!isEditing">Nil</span>
                    <input v-else type="text" class="form-control">
                </div>

                <div class="col-md-4">
                    <div class="small text-muted">National Identity Number</div>
                    <span v-if="!isEditing">Nil</span>
                    <input v-else type="text" class="form-control">
                </div>

                <div class="col-md-4">
                    <div class="small text-muted">Tax Identification Number</div>
                    <span v-if="!isEditing">Nil</span>
                    <input v-else type="text" class="form-control">
                </div>

                <div class="col-md-4">
                    <div class="small text-muted">External ID</div>
                    <span v-if="!isEditing">Nil</span>
                    <input v-else type="text" class="form-control">
                </div>

                <div class="col-md-4">
                    <div class="small text-muted">CLient ID</div>
                    <span v-if="!isEditing">Nil</span>
                    <input v-else type="text" class="form-control">
                </div> -->

                <div v-if="isEditing" class="col-12">
                    <div class="row justify-content-end g-2">
                        <div class="col-md-4 col-lg-3 col-6 ">
                            <loadingButton @click="updateClient" className="btn-theme w-100" :loading="isSubmitting">
                                Update Client
                            </loadingButton>
                        </div>
                        <div class="col-md-4 col-lg-3 col-6 ">
                            <button @click="isEditing = false" class="btn btn-outline-dark me-2 rounded-4 w-100">
                                Cancel
                            </button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>


</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useClientsStore } from '@/stores/clientsStore';
import helperFunctions from '@/stores/helperFunctions';
import api from '@/api'
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';

import CustomTextField from '@/components/Inputs/customTextField.vue';
import CustomPhoneField from '@/components/Inputs/customPhoneField.vue';
import CustomDatePicker from '@/components/Inputs/customDatePicker.vue';
import CustomSelect from '@/components/Inputs/customSelect.vue';



const clientsStore = useClientsStore()
const { clientDetails } = storeToRefs(clientsStore)


const isEditing = ref<boolean>(false)


const currentClientCountry = computed(() => {
    return clientsStore.countries.find((country) => country.isoCode === clientDetails.value?.nationality)
})

function setEditingToTrue() {
    isEditing.value = true
    setFieldValue('country', currentClientCountry.value)
    setFieldValue('email', clientDetails.value?.email)
    setFieldValue('first_name', clientDetails.value?.first_name)
    setFieldValue('last_name', clientDetails.value?.last_name)
    setFieldValue('dob', clientDetails.value?.dob)
    setFieldValue('telephone', clientDetails.value?.telephone)
}



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
    // mobile: yup.string().required('Phone Number is required').test(
    //     'phone-format',
    //     'Invalid format (e.g., +1234567890)',
    //     (value) => { return helperFunctions.validatePhoneNo(value) }
    // ),

};

const { errors, handleSubmit, defineField, isSubmitting, setFieldValue } = useForm({
    validationSchema: toTypedSchema(yup.object(validationRules)),
});

const [email, emailAttr] = defineField('email');
const [first_name, first_nameAttr] = defineField('first_name');
const [last_name, last_nameAttr] = defineField('last_name');
const [telephone, telephone_Attr] = defineField('telephone');
// const [mobile, mobileAttr] = defineField('mobile');
const [dob, dobAttr] = defineField('dob');
const [country, countryAttr] = defineField('country');



const updateClient = handleSubmit(async (values: any) => {

    try {
        const clientToupdate = {
            email: values.email.trim().toLowerCase(),
            telephone: values.telephone.replace(/\s+/g, ''),
            mobile: values.telephone.replace(/\s+/g, ''),
            joinedDate: helperFunctions.dateDisplay(new Date(), 'YYYY-MM-DD'),
            personDetails: {
                firstName: values.first_name.trim(),
                lastName: values.last_name.trim(),
                dob: helperFunctions.dateDisplay(new Date(values.dob), 'YYYY-MM-DD'),
                nationality: values.country?.isoCode

            }
        }

        const { data } = await api.updateClient(clientToupdate, clientDetails.value?.id)
        if (data.status == 201) {
            helperFunctions.toast(data.message, 'success')
            clientsStore.getClientDetails(clientDetails.value?.id)
            isEditing.value = false
        }
    }
    catch (err: any) {
        helperFunctions.toast(err.response?.message ?? 'Could not create Client, Something went wrong', 'error')
    }
})






</script>