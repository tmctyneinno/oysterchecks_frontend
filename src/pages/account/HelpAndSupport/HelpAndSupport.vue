<template>
    <!-- <div class="fs-4">Help & Support</div> -->
    <div class="row g-3">
        <div class="col-12 text-center mb-3">
            <div class="fs-5 fw-500">Hi, how can we help?</div>
            <div>Find answers, get support, or reach out for assistance with any issue</div>
        </div>
        <div class="col-md-4" v-for="({ icon, iconColor, iconBg, topic, text }, index) in optionCards" :key="index">
            <div class="card h-100 border-0 hover-tiltY cursor-pointer">
                <div class="card-body d-flex justify-content-center text-center">
                    <span>
                        <div class="d-flex justify-content-center mb-2">
                            <div class="option-icon" :style="{ 'background-color': iconBg, 'color': iconColor }">
                                <i :class="icon"></i>
                            </div>
                        </div>
                        <div>{{ topic }}</div>
                        <p class=" small">{{ text }}</p>
                    </span>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card min-vh-100 border-0">
                <div class="card-body">
                    <div class="row g-1">
                        <div class="col-lg-4">
                            <div class="fs-5 fw-bold">Frequently Asked Questions (FAQ’s) </div>
                            <div class="small">Everything you need to know about Oysterchecks and other informations
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <div v-for="({ question, answer }, index) in accordionHelps" :key="index"
                                class="accordion accordion-flush" id="accordionFlushExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingOne">
                                        <button class="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse" :data-bs-target="'#flush-collapse' + index"
                                            aria-expanded="true" :aria-controls="'flush-collapse' + index">
                                            {{ question }}
                                        </button>
                                    </h2>
                                    <div :id="'flush-collapse' + index" class="accordion-collapse collapse"
                                        aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                        <div class="accordion-body pt-0">
                                            {{ answer }}
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">


const optionCards: { icon: string, iconColor: string, iconBg: string, topic: string, text: string }[] = [
    { icon: 'bi bi-chat-right-text', iconColor: '#071427', iconBg: '#D0D7E6', topic: 'Live Chat', text: 'Instantly connect with support for assistance and course-related inquiries. 🚀' },
    { icon: 'bi bi-envelope', iconColor: '#E89A14', iconBg: '#FEE5B9', topic: 'Send Email', text: ' Send mails for assistance with your courses, account, or any inquiries. 📩' },
    { icon: 'bi bi-question-circle', iconColor: '#4411DB', iconBg: '#DCEDFD', topic: 'Support Ticket', text: 'Submit a request for help and track responses from the support team. 🎟️' },
]

const accordionHelps: { question: string, answer: string }[] = [
    {
        question: 'What is the Best thing about Switzerland', answer: ` Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, rem.
       Odit tempore corporis nam nemo non, temporibus harum id, saepe atque errorfacilis quasi molestias laudantium consequuntur, dolor exercitationem
        corrupti.`
    },
    {
        question: 'What is the Best thing about Switzerland', answer: ` Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, rem.
       Odit tempore corporis nam nemo non, temporibus harum id, saepe atque errorfacilis quasi molestias laudantium consequuntur, dolor exercitationem
        corrupti.`
    },
    {
        question: 'What is the Best thing about Switzerland', answer: ` Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, rem.
       Odit tempore corporis nam nemo non, temporibus harum id, saepe atque errorfacilis quasi molestias laudantium consequuntur, dolor exercitationem
        corrupti.`
    },
    {
        question: 'What is the Best thing about Switzerland', answer: ` Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, rem.
       Odit tempore corporis nam nemo non, temporibus harum id, saepe atque errorfacilis quasi molestias laudantium consequuntur, dolor exercitationem
        corrupti.`
    },
    {
        question: 'What is the Best thing about Switzerland', answer: ` Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, rem.
       Odit tempore corporis nam nemo non, temporibus harum id, saepe atque errorfacilis quasi molestias laudantium consequuntur, dolor exercitationem
        corrupti.`
    },
]
</script>

<style scoped>
.option-icon {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    font-size: 11px;
    display: flex;
    justify-content: center;
    align-items: center;
}


.accordion-item {
    border-bottom: 1px solid #ccc !important;
}

.accordion-button:not(.collapsed) {
    font-weight: bolder;
    background-color: transparent !important;
    box-shadow: inset 0 calc(-1 * var(--bs-accordion-border-width)) 0 var(--bs-accordion-border-color);
}
</style>