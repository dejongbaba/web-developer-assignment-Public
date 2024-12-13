import {get} from "@/services/index";
import {PageParams} from "@/lib/definitions";

export const getUsers = (params: PageParams) => {
    return get('users', params)
}
export const getUserCount = async () => {
    try {
        return await get('/users/count')
    } catch (e) {
        console.log('e')
    }
}
