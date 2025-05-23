import { $instance, $instanceForm } from '../instances'

export default {
    register(data: any) {
        return $instance.post(`auth/register`, JSON.stringify(data))
    },

    login(data: any) {
        return $instance.post(`auth/login`, JSON.stringify(data))
    },

    profile() {
        return $instance.get(`auth/profile`)
    },

    loginWithGoogle(data: any) {
        return $instance.post(`auth/login-google`, JSON.stringify(data))
    },

    updateProfile(data: any) {
        return $instance.post(`profile/update`, JSON.stringify(data))
    },

    resetPassword(obj: FormData) {
        return $instanceForm.post(`reset/password`, obj)
    },
}