/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from "react"
import { useAsync } from 'shared/hooks/useAsync';
import { useLocalStorage } from 'shared/hooks/useLocalStorage';
import {
    MdOutlineNightlightRound, MdOutlineWbSunny
} from "react-icons/md"
import { Spinner } from 'shared/components/lib';
import { Link as RouterLink, useRouteMatch } from "react-router-dom";
import { useAuth } from 'context/AuthContext';
import { Listbox, ListboxOption } from 'shared/components/Dropdown/Dropdown';

const TopMenuContext = React.createContext()
TopMenuContext.displayName = "TopMenuContext"



function TopMenuProvider({ children,type, ...props }) {
    return (
        <TopMenuContext.Provider value={{}}>
            <div
                css={{
                    display: 'flex',
                    boxShadow: '0 1px 2px -1px rgba(191, 191, 191, 1)',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px',
                    padding: '15px',
                    backgroundColor: 'var(--colors-top-menu)'
                }}
                aria-label='top-menu'
            >
                {children}
                <div css={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <UserProfile />
                    <div css={{ fontSize: '17px',fontFamily:'Poppins', marginRight: '8px', color:'var(--colors-text)',padding: '0px' }}>
                        {type}
                    </div>
                    <ThemeToggler />
                    
                </div>
            </div>
        </TopMenuContext.Provider>
    )
}

function TopMenuLogo({ children }) {
    return (
        <div>
            {children}
        </div>
    )
}

function Link(props) {
    const match = useRouteMatch(props.to)
    return (
        <div
            css={{
                marginBottom: '15px',
                marginTop: '8px',
                textAlign: 'center',
                padding: '5px',
                display: 'flex',
                alignItems: 'center',
                borderRadius:'10px',
                transition:'all .3s linear',
                textDecoration: match ? 'underline' : '',
                ":hover": { background: 'var(--menu-item)' },

            }}>
            <RouterLink  {...props} />
        </div>
    )
}

function TopMenuLink({ children, to }) {
    return (
        <Link to={to}>
            {children}
        </Link>
    )
}

function ThemeToggler() {
    const [theme, setTheme] = useLocalStorage('theme', 'light')
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    const { isLoading, run } = useAsync()

    const changeTheme = React.useCallback(async function changeTheme() {
        return document.body.dataset.theme = theme
    }, [theme]);

    React.useEffect(() => {
        run(changeTheme());
    }, [theme, run, changeTheme])


    return (
        <span role="button" tabIndex={0} onClick={() => setTheme(nextTheme)}>
            {
                isLoading
                    ? <Spinner css={{ color: 'var(--menu-item-theme-toggler)' }} />
                    : theme === 'dark'
                        ? <MdOutlineNightlightRound color='var(--menu-item-theme-toggler)' size={21} />
                        : <MdOutlineWbSunny color='var(--menu-item-theme-toggler)' size={21} />
            }
        </span>
    )
}

function UserProfile() {
    const { user, logout } = useAuth()
    function selectHandler(value) {
        if (value === 'logout') {
            return logout()
        }
    }
    return (
        <div css={{ margin: '0px 8px' }}>
            <Listbox onChange={selectHandler} name="profiles" value="profile" css={{ color: 'var(--colors-text)', display: 'flex', alignItems: 'center' }}
                arrow={
                    <div css={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>

                        <div css={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
                            <img alt="profile" css={{ borderRadius: '50%', maxWidth: '40px' }} src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" />
                            <p css={{ fontSize: '18px', margin: '0px', padding: '0px' }}>{user.name}</p>
                        </div>
                    </div>

                } aria-labelledby="my-label">
                <ListboxOption value="logout">
                    Logout
                </ListboxOption>
            </Listbox>
        </div>
    )
}


export { TopMenuProvider, TopMenuLogo, TopMenuLink }