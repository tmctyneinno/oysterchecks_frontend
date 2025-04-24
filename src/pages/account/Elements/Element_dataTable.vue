<template>
    <EasyDataTable :headers="headers" :items="items">
        <!-- Bottom Row -->
        <template #item-bottom>
            <tr class="summary-row">
                <td><strong>Total:</strong></td>
                <td v-for="(header, index) in headers.slice(1)" :key="index">
                    <strong>{{ getTotal(header.value) }}</strong>
                </td>
            </tr>
        </template>

        <template #footer>
            fjdhfbdjfhdjfdhfjhfdjh
        </template>
    </EasyDataTable>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const headers = ref([
    { text: "Product", value: "product" },
    { text: "Quantity", value: "quantity" },
    { text: "Price", value: "price" },
]);

const items: any = ref([
    { product: "Apple", quantity: 10, price: 5 },
    { product: "Orange", quantity: 15, price: 7 },
    { product: "Banana", quantity: 8, price: 3 },
]);

const getTotal = (field: any) => {
    return items.value.reduce((sum: any, item: { [x: string]: any; }) => sum + (item[field] || 0), 0);
};
</script>

<style scoped>
.summary-row {
    background-color: #f0f0f0;
    font-weight: bold;
}
</style>