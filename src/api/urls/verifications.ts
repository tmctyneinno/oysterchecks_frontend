import { $instance, $instanceForm } from '../instances'

export default {
    getClient(id: string) {
        return $instance.get(`clients/details/${id}`)
    },

    getClients(params: string) {
        return $instance.get(`clients/all?${params}`)
    },

    getChecks(params: string) {
        return $instance.get(`checks/all?${params}`)
    },

    clientsResources() {
        return $instance.get(`client/resources`)
    },

    getClientChecks(params: string) {
        return $instance.get(`clients/checks?${params}`)
    },

    createClient(data: any) {
        return $instance.post(`clients/new`, JSON.stringify(data))
    },

    verifyAML(data: any) {
        return $instance.post(`clients/verify/aml`, JSON.stringify(data))
    },
}