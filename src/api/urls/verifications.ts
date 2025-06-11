import { $instance, $instanceForm } from '../instances'

export default {
    getClient(id: string) {
        return $instance.get(`clients/details/${id}`)
    },

    getClients(params: string) {
        return $instance.get(`clients/all?${params}`)
    },

    getClientChecks(params: string) {
        return $instance.get(`clients/checks?${params}`)
    },

    createClient(data: any) {
        return $instance.post(`clients/new`, JSON.stringify(data))
    },

    verifyAML_Standard(data: any) {
        return $instance.post(`clients/verify/aml-standard`, JSON.stringify(data))
    },

    verifyAML_Extensive(data: any) {
        return $instance.post(`clients/verify/aml-extensive`, JSON.stringify(data))
    },
}