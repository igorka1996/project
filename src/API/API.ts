import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "ffccc8fc-6a3f-4bee-9cbf-d9533eb51624"
    }
})


export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`,
        )
            .then(response => {
                return response.data
            })

    },
    follow(id: number | null) {
        return instance.post(`follow/${id}`)
    },
    Unfollow(id: number | null) {
        return instance.delete(`follow/${id}`)
    },
    getProfile(userId: string | undefined) {
        return instance.get(`profile/` + userId)
    }
}


export const profileAPI = {
    getStatus(userId: string) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status/`, {status: status})
    }
}


export const authAPI = {
    login() {
        return instance.get(`auth/me`).then(response => {
                return response.data
            }
        )
    },
    log(email: string, password: string, rememberMe: boolean = false) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logOut() {
        return instance.delete(`auth/login`)
    }
}
