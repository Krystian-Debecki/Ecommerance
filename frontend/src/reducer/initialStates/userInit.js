const initialState = {
    logged: (localStorage.getItem('token') ?true :false),  
}

export default initialState