import { $instance, $instanceForm } from '../instances'

export default {

    getClients(params: string) {
        return $instance.get(`clients?${params}`)
    },

    createClient(data: any) {
        return $instance.post(`clients`, JSON.stringify(data))
    },

    getClient(id: string) {
        return $instance.get(`clients/${id}`)
    },

    checksResources() {
        return $instance.get(`checks/resources`)
    },

    getChecks(params: string) {
        return $instance.get(`checks?${params}`)
    },

    getAddresses(params: string) {
        return $instance.get(`client/addresses?${params}`)
    },

    newAddress(data: any) {
        return $instance.post(`client/addresses`, JSON.stringify(data))
    },

    deleteAddresse(addressID: string) {
        return $instance.delete(`client/addresses/${addressID}`)
    },


    verify(data: any, check_type: string) {
        return $instanceForm.post(`client/verify/${check_type}`, data)
    },
}