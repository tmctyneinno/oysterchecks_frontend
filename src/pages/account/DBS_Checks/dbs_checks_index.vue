<template>

    <div class="border-0 card min-vh-100">

        <div class="card-body">
            <div class="row g-3">
                <section class="col-12">
                    <button @click="goToTypesSelectPage" class="btn btn-theme float-end px-lg-3 hover-tiltX">
                        Start DBS Check <i class="bi bi-arrow-right"></i>
                    </button>
                </section>
                <section class="col-12">
                    <div class="fw-600">What is a DBS Check?</div>
                    <p class="text-mute">
                        The Disclosure and Barring Service (DBS) check is a UK government background screening process.
                        It helps employers make safer recruitment decisions and prevents unsuitable individuals from
                        working with vulnerable groups like children and adults at risk.
                    </p>
                </section>

                <section class="col-12">
                    <div class="fw-600">Who Needs a DBS Check?</div>
                    <p class="text-mute">
                        This check is essential for anyone working in education, healthcare, social care, or roles
                        involving children or vulnerable adults. Some financial and legal sector jobs also require it.
                    </p>
                </section>

                <section class="col-12">
                    <div class="fw-600">What is The Process?</div>
                    <div>STEPS:</div>
                    <ol>
                        <li>Choose DBS Check Type</li>
                        <li>Fill in Candidate Details</li>
                        <li>Upload Required Documents</li>
                        <li>Submit for Processing</li>
                    </ol>
                </section>


                <section class="col-12">
                    <div class="fw-600 fs-5 mb-2">Types of DBS Check</div>
                    <div class="row g-3">
                        <div class="col-md-4"
                            v-for="({ title, icon, roles, info, use_case, shows }, index) in DBSCheckTypes"
                            :key="index">
                            <div class="card border-0 bg-light h-100 small">
                                <div class="card-body">

                                    <div v-html="icon" class="d-flex justify-content-center fs-2 mb-4 "> </div>

                                    <div class="fw-600">{{ title }}</div>

                                    <div class="mb-3">
                                        <span class="rounded-2 bg-success-subtle p-1 xsmall me-2">
                                            {{ roles[0] }}
                                        </span>
                                        <span class="rounded-2 bg-info-subtle p-1 xsmall">
                                            {{ roles[1] }}
                                        </span>
                                    </div>

                                    <p>{{ info }}</p>

                                    <p> Use Case: {{ use_case }} </p>
                                    <div>
                                        Shows:
                                        <ul>
                                            <li v-for="(li, i) in shows" :key="i">{{ li }}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>

                <section class="col-12">
                    <div class="fw-600">Documents Required</div>
                    <div>To complete a DBS Check, the applicant must provide:</div>
                    <ol>
                        <li>Valid Photo ID (e.g., Passport or Driving Licence - Front & Back)</li>
                        <li>Proof of Address (e.g., Utility Bill, Bank Statement, Council Tax - dated within the last 3
                            months)</li>
                        <li>National Insurance Number</li>
                        <li>Address History (All addresses from the past 5 years)</li>
                    </ol>
                    <div>Tip: Ensure documents are clear, unedited, and show full details.</div>
                </section>

                <section class="col-12">
                    <div class="fw-600 fs-5"> DBS Check Pricing</div>

                    <div class="table-responsive">
                        <table class="table table-sm">
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Typical Cost (GBP)</th>
                                    <th>Who Can Request</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="({ type, cost, who }, index) in pricing" :key="index">
                                    <td>{{ type }}</td>
                                    <td>{{ cost }}</td>
                                    <td>{{ who }}</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <div>Note: An additional admin fee may apply. Display exact fees at checkout.</div>

                </section>



                <section class="col-12">
                    <div class="fw-600">Documents Required</div>
                    <div>To complete a DBS Check, the applicant must provide:</div>
                    <ol>
                        <li>Valid Photo ID (e.g., Passport or Driving Licence - Front & Back)</li>
                        <li>Proof of Address (e.g., Utility Bill, Bank Statement, Council Tax - dated within the last 3
                            months)</li>
                        <li>National Insurance Number</li>
                        <li>Address History (All addresses from the past 5 years)</li>
                    </ol>
                    <div>Tip: Ensure documents are clear, unedited, and show full details.</div>
                </section>


                <section class="col-12">
                    <div class="fw-600 fs-5">Frequently Asked Questions</div>

                    <div class="accordion accordion-flush" id="accordionFAQs">

                        <div v-for="({ question, answer }, index) in faqs" :key="index" class="accordion-item">
                            <h2 class="accordion-header" :id="'flush-headingOne' + index">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    :data-bs-target="'#flush-collapseOne' + index" aria-expanded="true"
                                    :aria-controls="'flush-collapseOne' + index">
                                    {{ question }}
                                </button>
                            </h2>
                            <div :id="'flush-collapseOne' + index" class="accordion-collapse collapse"
                                :aria-labelledby="'flush-headingOne' + index" data-bs-parent="#accordionFAQs">
                                <div class="accordion-body text-muted pt-0">
                                    {{ answer }}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useDBSCheckStore } from './useDBSCheckStore';
import { useRouter } from 'vue-router';

const DBSCheckStore = useDBSCheckStore()
const { DBSCheckTypes, pricing, faqs } = storeToRefs(DBSCheckStore)

const router = useRouter()

function goToTypesSelectPage() {
    router.push({
        name: 'Admin-DBS-Checks',
        query: { page: 'select', t: new Date().getTime(), }
    })
}


</script>

<style scoped>
table th {
    background-color: var(--bs-secondary-bg-subtle);
}

.accordion-button:not(.collapsed) {
    background: transparent;
}
</style>