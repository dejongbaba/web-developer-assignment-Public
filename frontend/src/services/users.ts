import {get} from "@/services/index";

export const getUsers = () => {
    return get('users')
}
export const getUserCount = async () => {
    try {
        return await get('/users/count')
    } catch (e) {
        console.log('e')
    }
}
