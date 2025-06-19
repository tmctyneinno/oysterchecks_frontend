<template>
    <div class="border-0 card min-vh-100">

        <div class="card-body">
            <div class="row g-3">
                <section class="col-12">
                    <!-- <h5 class="fw-bold float-start">
                        DBS CHECKS
                    </h5> -->
                    <button class="btn btn-theme float-end px-lg-3 hover-tiltX">
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
                    <div class="fw-600 fs-4 mb-2">Types of DBS Check</div>
                    <div class="row g-3">
                        <div class="col-md-4"
                            v-for="({ title, icon, roles, info, use_case, shows }, index) in typesOfChecks"
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
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">

const typesOfChecks: { title: string, icon: string, roles: string[], info: string, use_case: string, shows: string[] }[] = [
    {
        title: 'Basic DBS Check',
        icon: '<i class="bi bi-search"></i>',
        roles: ['Individuals', 'All Roles'],
        info: `A Basic DBS check shows if the person has any recent or active convictions. It’s suitable for jobs where no high level of trust or safety is involved.`,
        use_case: `Entry-level jobs, freelance gigs, office work`,
        shows: ['Unspent criminal convictions only']
    },
    {
        title: 'Standard DBS Check',
        icon: '<i class="bi bi-check-square-fill text-success"></i>',
        roles: ['Employers', 'Specific Roles'],
        info: `A Standard DBS check goes deeper. It checks both recent and older convictions, including warnings. It’s used for trusted positions like accountants or legal advisors.`,
        use_case: 'Finance, law, security roles',
        shows: ['Unspent and spent convictions', 'Cautions, reprimands, and final warnings']
    },
    {
        title: 'Enhanced DBS Check',
        icon: '<i class="bi bi-shield-fill text-theme"></i>',
        roles: ['Employers', 'Specific Adults'],
        info: `An Enhanced DBS check includes more detailed information. If police have relevant safety concerns, they might be included — even if they didn’t lead to a conviction.`,
        use_case: 'Teachers, healthcare workers, social care staff',
        shows: ['Everything in Standard check', 'Any relevant police information (even if not a conviction)']
    },
]
</script>