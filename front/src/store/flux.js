const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            apiUrl: "http://localhost:3000",
            user: {
                authenticated: false,
                token: null,
                username: null,
                email: null,
                id: null
            },
            login: {
                username: null,
                password: null,
                error: null,
                loading: false
            },
            signup: {
                username: null,
                email: null,
                password: null,
                error: null,
                loading: false
            },
        },
        actions: {
            login: (username, password) => {
                setStore({
                    login: {
                        username: username,
                        password: password,
                        error: null,
                        loading: true
                    }
                });
                fetch(getStore().apiUrl + "/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.error) {
                            setStore({
                                login: {
                                    username: username,
                                    password: password,
                                    error: data.error,
                                    loading: false
                                }
                            });
                        } else {
                            setStore({
                                user: {
                                    authenticated: true,
                                    token: data.token,
                                    username: data.username,
                                    email: data.email,
                                    id: data.id
                                },
                                login: {
                                    username: username,
                                    password: password,
                                    error: null,
                                    loading: false
                                }
                            });
                        }
                    });
            },
        },
        logout: () => {
            setStore({
                user: {
                    authenticated: false,
                    token: null,
                    username: null,
                    email: null,
                    id: null
                }
            });
        },
        signup: (creds) => {
            return () => {
                const app = getStore().app;
                const url = `${app.apiUrl}/signup`;
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(creds)
                };
                fetch(url, options)
                    .then(response => response.json())
                    .then(data => {
                        if (data.token) {
                            setStore({
                                user: {
                                    authenticated: true,
                                    token: data.token,
                                    username: data.username,
                                    email: data.email,
                                    id: data.id
                                }
                            });
                        }
                    });
            };
        },
        getUser: () => {
            const app = getStore().app;
            const url = `${app.apiUrl}/user`;
            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${app.user.token}`
                }
            };
            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    if (data.token) {
                        setStore({
                            user: {
                                authenticated: true,
                                token: data.token,
                                username: data.username,
                                email: data.email,
                                id: data.id
                            }
                        });
                    }
                });
        }
    }
}


export default getState