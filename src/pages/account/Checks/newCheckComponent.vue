<template>
    <div class="col-12">
        <div class="card min-vh-50 border-0 rounded-4">
            <div class="card-header bg-transparent border-0 fw-500">
                New Check
            </div>

            <div class="card-body">

                <div class="row g-3 small">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-md-6 col-lg-4">
                                <CustomSelect v-model="selectedCheckType" :options="availableChecks"
                                    placeholder="select type" label="name" />
                            </div>
                        </div>
                    </div>

                    <div v-if="selectedCheckType?.fields?.length" class="col-12">
                        <div class="card border-0 bg-light">
                            <div class="card-body">
                                <div class="row g-3">
                                    <div v-if="showFieldFromSelection('line')" class="col-md-8">
                                        <div class="form-label">Address</div>
                                        <CustomTextField v-model="form.line" :floatLabel="false" />
                                    </div>
                                    <div v-if="showFieldFromSelection('country')" class=" col-lg-4 col-md-6">
                                        <div class="form-label">Country</div>
                                        <CustomSelect v-model="form.country" :options="clientsStore.countries"
                                            placeholder="select country" />
                                    </div>

                                    <div v-if="showFieldFromSelection('state')" class=" col-lg-4 col-md-6">
                                        <div class="form-label">State</div>
                                        <CustomSelect v-model="form.state" :options="statesArray"
                                            placeholder="select state" />
                                    </div>

                                    <div v-if="showFieldFromSelection('city')" class=" col-lg-4 col-md-6">
                                        <div class="form-label">City</div>
                                        <CustomSelect v-model="form.city" :options="citiesArray"
                                            placeholder="select city" />
                                    </div>

                                    <div v-if="showFieldFromSelection('postalCode')" class=" col-lg-4 col-md-6">
                                        <div class="form-label">Postal Code</div>
                                        <CustomTextField v-model="form.postalCode" :floatLabel="false" />
                                    </div>
                                </div>

                                <!-- <div class="col-md-6">
                                    <div class="small text-muted">Required Document</div>
                                    <CustomSelect :options="resources.documentTypes" placeholder="select type"
                                        label="name" />
                                </div> -->

                                <!-- <div class="col-md-6 d-none">
                                    <div class="form-label">Uplaod Document</div>
                                    <div class="small text-muted">Front Side (2MB MAX)</div>
                                    <DropzoneComponent />
                                </div> -->

                                <!-- <div class="col-md-6 d-none">
                                    <div class="form-label">Upload Document</div>
                                    <div class="small text-muted">Back Side (2MB MAX)</div>
                                    <DropzoneComponent />
                                </div> -->
                            </div>
                        </div>
                    </div>



                </div>
            </div>
            <div class="card-footer bg-transparent border-0">
                <div class="row justify-content-end g-1">
                    <div class="col-md-2">
                        <button @click="emit('done', false)"
                            class="btn btn-outline-dark me-2 rounded-4 float-end w-100">
                            Cancel
                        </button>
                    </div>
                    <div v-if="selectedCheckType" class="col-md-3 col-lg-2">
                        <loadingButton @click="runCheck" className="btn-theme w-100" :loading="isSaving">
                            RUN CHECk
                        </loadingButton>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useClientsStore } from '../Clients/clientsStore';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DropzoneComponent from '@/components/Inputs/dropzoneComponent.vue';
import helperFunctions from '@/stores/helperFunctions';
import api from '@/api';
import CustomSelect from '@/components/Inputs/customSelect.vue';
import LoadingButton from '@/components/loadingButton.vue';
import CustomTextField from '@/components/Inputs/customTextField.vue';

const clientsStore = useClientsStore()
const { clientDetails, availableChecks } = storeToRefs(clientsStore)

const route = useRoute()
const router = useRouter()

onMounted(async () => {
    if (!route.query?.refId || !route.query?.client) router.back()
    await clientsStore.getClientResources()
    isLoadingDetails.value = false
})

const emit = defineEmits(['done'])


const selectedCheckType = ref<any>(null)
const statesArray = ref<any[]>([])
const citiesArray = ref<any[]>([])

const countryIsoCode = computed(() => { return form.country?.isoCode ?? '' })
const stateIsoCode = computed(() => { return form.state?.isoCode ?? '' })

interface FormInterface {
    line: string,
    country: any,
    state: any,
    city: any,
    postalCode: string,
}

const form = reactive<FormInterface>({
    line: '',
    country: null,
    state: null,
    city: null,
    postalCode: '',
})

watch(() => form.country, () => {
    form.state = null
    statesArray.value = []
    if (form.country) {
        statesArray.value = clientsStore.statesByCountry(countryIsoCode.value)
    }
})

watch(() => form.state, () => {
    form.city = null
    citiesArray.value = []
    if (form.state) {
        citiesArray.value = clientsStore.citiesByState(countryIsoCode.value, stateIsoCode.value)
    }
})



const isLoadingDetails = ref<boolean>(true)

const isSaving = ref<boolean>(false);


function runCheck() {
    // validations
    helperFunctions.confirm('Run this check?', '', 'Continue').then(async (confirm) => {
        if (confirm.value) {

            try {
                isSaving.value = true

                const obj = {
                    check_type: selectedCheckType.value?.type,
                    clientId: clientDetails.value?.client_id,
                    country: countryIsoCode.value,
                    state: stateIsoCode.value,
                    city: form.city?.label,
                    postalCode: form.postalCode,
                    line: form.line,
                    // ...form
                }

                const { data } = await api.verify(obj)
                if (data.status == 201) {
                    helperFunctions.toast(data.message, 'success')
                    selectedCheckType.value = null
                    emit('done', true)
                }

            } catch (error) {
                helperFunctions.toast('Could not verify, Pls try again', 'error')
            }
            finally { isSaving.value = false }
        }
    })
}



const showFieldFromSelection = (field: string) =>
    availableChecks.value
        .find(x => x.type === selectedCheckType.value?.type)
        ?.fields
        ?.includes(field) ?? false


</script>