import {data as backend_data} from "../store/data"

// YOU CAN SWITCH TO REJECT OR RESOLVE APIS HERE
const statuses = {
    isAddFailed: false,
    isCheckFailed: false,
    isGetFailed: false,
}

export const addClient = (data, {date, room_number}) => {
    return new Promise(((resolve, reject) => {
        setTimeout(() => {
            if (!statuses.isAddFailed) {
                if (!!data.length) {
                    if (data?.find(i => i.room_number === room_number).busy_dates.some(p => p === date)) {
                        reject({
                            status: 505,
                            message: "Failed",
                        })
                    } else {
                        resolve({
                            status: 204,
                            message: "Created",
                            data: [
                                ...data.map(
                                    i => i.room_number !== room_number ? i
                                        :
                                        {
                                            id: i.id,
                                            room_number: i.room_number,
                                            busy_dates: [...i.busy_dates, date]
                                        }
                                )
                            ]
                        })
                    }
                } else {
                    resolve({
                        status: 204,
                        message: "Created",
                        data: [
                            ...backend_data.map(
                                i => i.room_number !== room_number ? i
                                    :
                                    {
                                        id: i.id,
                                        room_number: i.room_number,
                                        busy_dates: [...i.busy_dates, date]
                                    }
                            )
                        ]
                    })
                }
            } else {
                reject({
                    code: 500,
                    message: "Failed"
                })
            }
        }, 3000)
    }))
}

export const checkStatus = (data, {room_number, date}) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!statuses.isCheckFailed) {
                resolve({
                    status: 200,
                    message: "checked",
                    data: data.find(i => i.room_number === room_number)?.busy_dates.some(p => p === date) ?? false
                })
            } else {
                reject({
                    status: 500,
                    message: "cannot check",
                })
            }
        }, 3000)
    })
}

export const getData = (data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!statuses.isGetFailed) {
                if (!!data.length) {
                    resolve({
                        status: 200,
                        message: "success",
                        data: data
                    })
                } else {
                    resolve({
                        status: 200,
                        message: "success",
                        data: backend_data
                    })
                }
            } else {
                reject({
                    status: 500,
                    message: "failed",

                })
            }
        }, 3000)
    })
}
