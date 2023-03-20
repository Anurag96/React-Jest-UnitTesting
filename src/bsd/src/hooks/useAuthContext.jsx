import React, { useState, useEffect, useRef, createContext, useContext } from 'react'
import Keycloak from 'keycloak-js';
const KeyClockContext = createContext();
const keyclock = Keycloak({
    "url": "https://keycloak.spectrumtoolbox.com/auth",
    "realm": "spectrumtoolbox",
    "clientId": "bsdtools-keycloak-client",
    credentials: 'include'

});


export function KeyClockContextProvider(props) {
    const [keyClockValue, setKeyClockValue] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);

    const isRun = useRef(false)
    const setKeyClock = () => {
        const token = localStorage.getItem('keycloak_token')
        const refreshToken = localStorage.getItem('keycloak_refresh_token')
        const initObj = {
            onLoad: "login-required",
            checkLoginIframe: false,
        }
        if (token) {
            initObj['token'] = token;
        }
        if (refreshToken) {
            initObj['refreshToken'] = refreshToken;
        }
        keyclock.init(initObj).then(async (authenticated) => {
            localStorage.setItem('keycloak_token', keyclock.token)
            localStorage.setItem('keycloak_refresh_token', keyclock.refreshToken)
            setKeyClockValue(keyclock)
            setAuthenticated(authenticated)
        }).catch((err) => console.log('err', err));
    }

    const login = () => {
        setKeyClock();
    }

    const logout = () => {
        setKeyClock(null)
        setAuthenticated(false)
        localStorage.removeItem('keycloak_token')
        localStorage.removeItem('keycloak_refresh_token')
        keyclock.logout();
    }

    useEffect(() => {
        setKeyClock();
    }, []);

    return (
        <KeyClockContext.Provider value={{ keyClockValue, authenticated, login, logout }}>
            {props['children']}
        </KeyClockContext.Provider>
    );
};
export const useKeyClockContext = () => useContext(KeyClockContext)
