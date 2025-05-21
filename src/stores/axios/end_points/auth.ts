import { $instance, $instanceForm } from '../instances'

export default {
    register(data: any) {
        return $instance.post(`signup`, JSON.stringify(data))
    },

    login(data: any) {
        return $instance.post(`login`, JSON.stringify(data))
    },

    loginWithGoogle(data: any) {
        return $instance.post(`login-google`, JSON.stringify(data))
    },

    profile() {
        return $instance.get(`profile`)
    },

    updateProfile(data: any) {
        return $instance.post(`profile/update`, JSON.stringify(data))
    },

    resetPassword(obj: FormData) {
        return $instanceForm.post(`reset/password`, obj)
    },
}