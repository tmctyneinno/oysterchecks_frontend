<template>
    <div>
        <div class="d-md-flex gap-2">
            <div v-for="(card, index) in dashboardStore.summaryCards" :key="index" class="col mb-2">
                <div class="card border-0 h-100">
                    <div class="card-body pb-0">
                        <div v-html="card.icon"></div>
                        <div class="small mt-2">{{ card.info }}</div>
                    </div>
                    <div class="card-footer fw-500 fs-4 bg-transparent border-0 pt-0">
                        {{ useFunctions.addCommas(card.number) }}
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-2">
            <div class="row g-2">
                <div class="col-md-8">
                    <div class="card border-0">
                        <div class="card-header border-0 bg-transparent fw-bold py-4">
                            Clients Added This Year
                            <div class="float-end">
                                <select class="form-select form-select-sm bg-white">
                                    <option selected>Last 7 Days</option>
                                    <option value="1">Last 30 Days</option>
                                </select>
                            </div>
                        </div>
                        <div class="card-body">
                            <apexchart type="line" :options="chartOptions" :series="series">
                            </apexchart>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card border-0 h-100">
                        <div class="card-body">
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import useFunctions from '@/stores/useFunctions';
import { useDashboardStore } from './dashboardStore';
import { onMounted, reactive, ref } from 'vue';


const dashboardStore = useDashboardStore()


onMounted(() => {
    loadChartOptions()
})




// charts
const series = ref<any>([{
    name: 'Clients',
    data: [500, 200, 500, 800, 500]
}])
const datesArray = ref(['2025-01-03', '2025-03-03', '2025-06-03', '2025-07-03', '2025-08-03'])
const chartOptions = ref({})
function loadChartOptions() {
    chartOptions.value = {
        chart: {
            // height: 800,
            // width: 600,
            type: 'line',
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 1000
                }
            },
            toolbar: {
                show: true
            },
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 1,
        },
        stroke: {
            curve: 'smooth',
            show: true,
            lineCap: 'round', //butt, square
            width: 3,
            dashArray: 0,
        },
        states: {
            hover: {
                enabled: false,
            }
        },

        xaxis: {
            categories: datesArray.value,
            type: "datetime",
            labels: {
                datetimeFormatter: {
                    year: 'yyyy',
                    month: 'MMM \'yyyy',
                    day: 'dd MMM',
                    hour: 'HH:mm'
                }
            }
        },
        yaxis: {
            title: {
                // text: 'Clients'
            },
            // tickAmount: 5,
            min: 0,
            max: 1000,
        },
        colors: ['#E63468'],
        legend: {
            show: true
        },
        tooltip: {
            enabled: true,
        },
    }
}

</script>

<style scoped>
.card {
    background-color: #E5E6FF;
}
</style>