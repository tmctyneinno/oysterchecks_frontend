<template>
    <div class="row g-3 pt-4">
        <div class="col-lg-4">
            <div class="fw-bold">Password Change</div>
            <div class="text-muted mb-2">Change your password here.</div>
        </div>



        <div class="col-lg-8">
            <form @submit.prevent="submitForm" class="row g-3 animate__animated animate__fadeIn">

                <div class="col-md-7">
                    <div class="col-md-12">
                        <div class="form-labe">Current Password
                            <RedAsteric />
                        </div>
                        <CustomPasswordField :float-label="false" v-model="password" v-bind="passwordAttr"
                            placeholder="" />
                        <div class="small text-danger">{{ errors?.password }}</div>
                    </div>

                    <div class="col-md-12">
                        <div class="form-labe">New Password
                            <RedAsteric />
                        </div>
                        <CustomPasswordField :float-label="false" v-model="new_password" v-bind="new_passwordAttr"
                            placeholder="" />
                        <div class="small text-danger">{{ errors?.new_password }}</div>
                    </div>

                    <div class="col-md-12">
                        <div class="form-labe">Repeat Password
                            <RedAsteric />
                        </div>
                        <CustomPasswordField :float-label="false" v-model="repeat_password" v-bind="repeat_passwordAttr"
                            placeholder="" />
                        <div class="small text-danger">{{ errors?.repeat_password }}</div>
                    </div>


                    <div class="col-md-12 mt-4">
                        <loadingButton type="submit" className="btn-theme w-100" :loading="isSubmitting">
                            Update Password
                        </loadingButton>
                    </div>
                </div>

            </form>
        </div>

    </div>
</template>


<script setup lang="ts">
import RedAsteric from '@/components/redAsteric.vue';
import api from '@/api'
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import helperFunctions from '@/stores/helperFunctions';
import CustomPasswordField from '@/components/Inputs/customPasswordField.vue';

// form and validation
const validationRules = {

    password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .test(
            'password-complexity',
            'Must contain at least one number and one special character',
            helperFunctions.passwordRegex
        ),
    new_password: yup.string()
        .required('New Password is required')
        .min(8, 'Password must be at least 8 characters')
        .test(
            'password-complexity',
            'Must contain at least one number and one special character',
            helperFunctions.passwordRegex
        ),
    repeat_password: yup.string()
        .required('Repeat Password is required')
        .oneOf([yup.ref('new_password')], 'Passwords do not match')
};


const { errors, handleSubmit, defineField, resetForm, isSubmitting } = useForm({
    validationSchema: toTypedSchema(yup.object(validationRules)),
    initialValues: {
        // 
    },
});

const [password, passwordAttr] = defineField('password');
const [new_password, new_passwordAttr] = defineField('new_password');
const [repeat_password, repeat_passwordAttr] = defineField('repeat_password');


const submitForm = handleSubmit(async (values: any) => {

    try {

        values.password = values.password.trim();
        values.new_password = values.new_password.trim();
        values.repeat_password = values.repeat_password.trim();

        await api.changePassword(values)
        resetForm()
        helperFunctions.toast('Password Updated', 'success')
    }
    catch (err: any) {
        const errorMessage = err.response?.data?.errors;
        errors.value.password = errorMessage?.password?.[0]
    }
})



</script>