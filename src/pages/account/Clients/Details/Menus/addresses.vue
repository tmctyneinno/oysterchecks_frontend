<template>
    <div class="card h-100 border-0 rounded-4">
        <div class="card-header bg-transparent border-0">
            <span v-if="!isAddingNew" class="fw-500">Addresses ({{ items.length }})</span>
            <span v-else>
                <i @click="isAddingNew = false" class="bi bi-arrow-left cursor-pointer"></i>
                Add New Address
            </span>
            <span v-if="isLoadingAddresses" class="text-warning ms-3">
                <span class="spinner-border spinner-border-sm" role="status"> </span> please Wait..

            </span>
            <button v-if="!isAddingNew" @click="openNewAddressForm"
                class="btn btn-sm btn-outline-dark float-end rounded-4 ">
                <i class="bi bi-plus"></i> Add New Address
            </button>
        </div>
        <div class="card-body">
            <div v-if="!isAddingNew">
                <EasyDataTable :loading="isLoadingAddresses" show-index alternating :headers="headers" :items="items"
                    buttons-pagination>

                    <template #empty-message>
                        <EmptyDataComponent :text="'No Addresses'" />
                    </template>


                    <template #header="header">
                        <span>{{ header.text == '#' ? 'S/N' : header.text }}</span>
                    </template>

                    <template #item-country="item">
                        <span>{{ clientsStore.countryName(item.country) }}</span>
                    </template>

                    <template #item-state="item">
                        <span>{{ clientsStore.stateName(item.state, item.country) }}</span>
                    </template>


                    <template #item-action="item">
                        <a @click="showDetails(item)" href="#" data-bs-toggle="modal"
                            data-bs-target="#addressDetailsModal">View</a>
                        |

                        <span @click="deleteAddress(item.id)"
                            class="text-danger cursor-pointer hover-tiltY">Delete</span>

                    </template>
                </EasyDataTable>
            </div>
            <div v-else>
                <AddressesForm @done="formEmit()" />
            </div>
        </div>

    </div>


    <!-- address Details Modal -->
    <div class="modal fade" id="addressDetailsModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog  modal-dialog-centered modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title" id="modalTitleId">
                        Address Details
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="table-responsive">
                        <table class="table table-sm table-bordered">
                            <tbody>
                                <tr>
                                    <td>Country:</td>
                                    <td>{{ clientsStore.countryName(addressItemsToShow.country) }}</td>
                                </tr>
                                <tr>
                                    <td>State:</td>
                                    <td>
                                        {{ clientsStore.stateName(addressItemsToShow.state, addressItemsToShow.country)
                                        }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>City:</td>
                                    <td>{{ addressItemsToShow.city }}</td>
                                </tr>

                                <tr>
                                    <td>Address:</td>
                                    <td>{{ addressItemsToShow.line }}</td>
                                </tr>

                                <tr>
                                    <td>Address Type:</td>
                                    <td class="text-capitalize">{{ addressItemsToShow.type ?? '-' }}</td>
                                </tr>

                                <tr>
                                    <td>Property Number:</td>
                                    <td>{{ addressItemsToShow.propertyNumber ?? '-' }}</td>
                                </tr>

                                <tr>
                                    <td>Bulding Name:</td>
                                    <td class="text-capitalize">{{ addressItemsToShow.buildingName ?? '-' }}</td>
                                </tr>

                                <tr>
                                    <td>Postal Code:</td>
                                    <td>{{ addressItemsToShow.postalCode }}</td>
                                </tr>

                                <tr>
                                    <td>Moved In:</td>
                                    <td>{{ helperFunctions.dateDisplay(addressItemsToShow.fromDate) }}</td>
                                </tr>

                                <tr>
                                    <td>Moved Out:</td>
                                    <td>{{ helperFunctions.dateDisplay(addressItemsToShow.toDate) }}</td>
                                </tr>

                                <tr>
                                    <td>Created:</td>
                                    <td>{{ helperFunctions.dateTimeDisplay(addressItemsToShow.createdAt) }}</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>

                </div>
                <div class="modal-footer border-0">
                    <button ref="closeDetailModal" type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Close
                    </button>

                </div>
            </div>
        </div>
    </div>


</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useClientsStore } from '@/stores/clientsStore';
import { onMounted, ref } from 'vue';
import type { Header, Item } from 'vue3-easy-data-table';
import api from '@/api';
import { onBeforeRouteLeave } from 'vue-router';
import helperFunctions from '@/stores/helperFunctions';
import EmptyDataComponent from '@/components/emptyDataComponent.vue';
import AddressesForm from './addressesForm.vue';
import { useTemplateStore } from '@/stores/template';

const clientsStore = useClientsStore()
const { clientDetails } = storeToRefs(clientsStore)

const headers = ref<Header[]>([
    { text: 'Country', value: 'country', sortable: true },
    { text: 'State', value: 'state', sortable: true },
    { text: 'City', value: 'city', sortable: true },
    { text: 'Action', value: 'action' },
])


const isAddingNew = ref<boolean>(false)

const isLoadingAddresses = ref(true)
const items = ref<Item[]>([])

onMounted(() => {
    loadAddresses()
})


async function loadAddresses() {
    try {
        isLoadingAddresses.value = true

        const obj = {
            client_id: clientDetails.value.client_id,
        }
        const params = new URLSearchParams(obj as Record<string, string>);
        const { data } = await api.getAddresses(params.toString())
        items.value = data.items ?? []
    }
    catch { }
    finally { isLoadingAddresses.value = false }
}

const templateStore = useTemplateStore()
function openNewAddressForm() {
    templateStore.activateToolTip++
    isAddingNew.value = true
}

function formEmit() {
    isAddingNew.value = false;
    loadAddresses()
}


const addressItemsToShow = ref<any>({})
const closeDetailModal = ref<any>(null)
function showDetails(item: any) {
    addressItemsToShow.value = item
}

function deleteAddress(addressId: any) {
    helperFunctions.confirmDelete('Are you sure?', 'This Address will be deleted for this Client', 'Yes Delete')
        .then(async (confirm) => {
            if (confirm.value) {
                try {
                    await api.deleteAddresse(addressId)
                    helperFunctions.toast('Address Deleted', 'success')
                    loadAddresses()
                }
                catch {
                    helperFunctions.toast('Address not deleted Something Went Wrong', 'error')
                }
            }
        })
    console.log(addressId);
}

onBeforeRouteLeave(() => {
    closeDetailModal?.value?.click()
})
</script>