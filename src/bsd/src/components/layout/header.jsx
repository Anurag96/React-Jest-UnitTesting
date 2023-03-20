import '../../css/header.css';
import { KiteIcon } from '@kite/react-kite';
import { useNavigate, useLocation } from "react-router-dom";
import { KiteMenu, KiteMenuItem } from '@kite/react-kite';
import { useKeyClockContext } from "../../hooks/useAuthContext"
import { KiteDialog } from '@kite/react-kite';
import { useState } from "react";

function Header(props) {
    const authenticatedData = useKeyClockContext();
    const userAccess = authenticatedData.keyClockValue ? authenticatedData.keyClockValue.tokenParsed : {};
    const roles = userAccess.resource_access && userAccess.resource_access['bsdtools-keycloak-client'] ? userAccess.resource_access['bsdtools-keycloak-client'].roles : []
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const [isOpen, setIsOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [dialogAction, setDialogAction] = useState('');

    const navigateHome = () => {
        if (pathname === '/filerecon') {
            setDialogTitle('Are you sure you want to leave this page?');
            setDialogMessage('Changes you have made may not be saved.');
            setDialogAction('home');
            setIsOpen(true);
        } else {
            props.onChange();
            navigate('/');
        }
    };

    const handleDialogChange = (callback) => {
        setIsOpen(false);
        switch (dialogAction) {
            case 'home':
                props.onChange();
                navigate('/');
                break;
            case 'logout':
                authenticatedData.logout();
                break;
            default:
                break;
        }
    }


    return (
        <>
            <KiteDialog
                id="1"
                open={isOpen}
                title={dialogTitle}
                icon="ki-caution-circle-f"
                onClose={() => setIsOpen(false)}
                primaryBtnLabel="OK"
                onPrimaryBtnClick={() => handleDialogChange(true)}
                secondaryBtnLabel="Cancel"
                onSecondaryBtnClick={() => setIsOpen(false)}
            >
                <div className="kite-dialog__content-group">
                    {dialogMessage}
                </div>
            </KiteDialog>
            <nav className="navbar">
                <div>
                    {/* <!-- LOGO --> */}
                    <div className="menu" >
                        <li >
                            <KiteIcon
                                fill="white"
                                icon="ki-home-f"
                                title="HOME"
                                inline="true"
                                size="3rem"
                                onClick={navigateHome}
                            />
                        </li>
                        <><h5 className='my-2' style={{ padding: "10px" }}> Billing Strategy & Design Tools</h5></>
                    </div>
                </div>

                {/* <!-- NAVIGATION MENU --> */}

                <ul className="nav-links">

                    {/* <!-- NAVIGATION MENUS --> */}

                    <div className="menu mx-5">

                        <li ><KiteIcon
                            fill="white"
                            icon="ki-mail-f"
                            title="Mail"
                            inline="true"
                            size="2rem"
                        /></li>

                        <li ><KiteIcon
                            fill="white"
                            icon="ki-question-circle-f"
                            title="Help"
                            inline="true"
                            size="2rem"
                        /></li></div>

                </ul>

                {/* <!-- Profile --> */}

                <KiteMenu menuIcon="ki-person-f" position="top-right" style={{
                    "marginTop": "-10px"
                }}>
                    <KiteMenuItem>
                        {userAccess.name}
                    </KiteMenuItem>
                    <KiteMenuItem>
                        {userAccess.email}
                    </KiteMenuItem>
                    <KiteMenuItem>
                        Access : {roles.join(', ')}
                    </KiteMenuItem>
                </KiteMenu>
            </nav>
        </>
    )
}

export default Header
