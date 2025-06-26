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

    getAddresses(clientId: string) {
        return $instance.get(`client/addresses/${clientId}`)
    },

    deleteAddresse(addressID: string) {
        return $instance.delete(`client/addresses/${addressID}`)
    },


    verify(data: any) {
        return $instance.post(`client/verify`, JSON.stringify(data))
    },
}