export const logIn = (data) => {
    return {
        type : 'LOG_IN',
        payload : data
    }
}

export const logOut = () => {
    return {
        type : 'LOG_OUT'
    }
}