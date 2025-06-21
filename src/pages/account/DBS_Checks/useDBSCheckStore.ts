import { defineStore } from "pinia";
import { ref } from "vue";

export const useDBSCheckStore = defineStore('DBSCheckStore', () => {
    const selectedDBSType = ref<string>('basic')

    interface DBSCheckTypesInterface {
        title: string, icon: string, roles:
        string[], info: string, use_case: string,
        shows: string[], value: string, desc: string
    }

    const DBSCheckTypes = ref<DBSCheckTypesInterface[]>([
        {
            title: 'Basic DBS Check',
            icon: '<i class="bi bi-search"></i>',
            roles: ['Individuals', 'All Roles'],
            info: `A Basic DBS check shows if the person has any recent or active convictions. It’s suitable for jobs where no high level of trust or safety is involved.`,
            use_case: `Entry-level jobs, freelance gigs, office work`,
            shows: ['Unspent criminal convictions only'],
            value: 'basic',
            desc: '(Available to Individuals & Orgs)'
        },
        {
            title: 'Standard DBS Check',
            icon: '<i class="bi bi-check-square-fill text-success"></i>',
            roles: ['Employers', 'Specific Roles'],
            info: `A Standard DBS check goes deeper. It checks both recent and older convictions, including warnings. It’s used for trusted positions like accountants or legal advisors.`,
            use_case: 'Finance, law, security roles',
            shows: ['Unspent and spent convictions', 'Cautions, reprimands, and final warnings'],
            value: 'standard',
            desc: 'For specific roles (e.g. legal, financial). Requested by organizations only.'
        },
        {
            title: 'Enhanced DBS Check',
            icon: '<i class="bi bi-shield-fill text-theme"></i>',
            roles: ['Employers', 'Specific Adults'],
            info: `An Enhanced DBS check includes more detailed information. If police have relevant safety concerns, they might be included — even if they didn’t lead to a conviction.`,
            use_case: 'Teachers, healthcare workers, social care staff',
            shows: ['Everything in Standard check', 'Any relevant police information (even if not a conviction)'],
            value: 'enhanced',
            desc: '(For roles involving children or vulnerable adults. Organization use only.'
        },
    ])

    const pricing = ref<{ type: string, cost: string, who: string }[]>([
        { type: 'Basic DBS Check', cost: '£18', who: 'Individual or Employer' },
        { type: 'Standard DBS Check', cost: '£18 (plus admin fee)', who: 'Employer Only' },
        { type: 'Enhanced DBS Check', cost: '£18 (plus admin fee)', who: 'Employer Only' },
    ])


    const faqs = ref<{ question: string, answer: string }[]>([
        { question: `How long does a DBS check take?`, answer: `A DBS check usually takes 1 to 2 weeks, but it can be faster or slower depending on the type of check and the information needed.`, },
        { question: `What if a candidate has a criminal record?`, answer: `The DBS Report will show any relevant convictions. Employers will review it to decide if it affects the role. Not all records will stop someone from getting the job.`, },
        { question: `Can an applicant see their results?`, answer: `Yes. The Certificate is sent directly  to the applicant, and they can share it with the employer`, },
        { question: `Do DBS checks expire?`, answer: `N, DBS checks don't officially expire, but employers may request a new oneif it's been a while`, },
        { question: `Who pays for a DBS check?`, answer: `It depends, either the employer or the applicant  can pay. the platform may show the fee during the process`, },
        { question: `Is a DBS check required for volunteers?`, answer: `Yes. But volunteers get a DBS check for free, though it still goes through the same process.`, },
    ])


    return {
        selectedDBSType,
        DBSCheckTypes,
        pricing,
        faqs
    }
})