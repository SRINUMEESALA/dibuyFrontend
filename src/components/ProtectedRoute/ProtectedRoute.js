import Cookies from 'js-cookie'
import { Redirect, Route } from 'react-router-dom'
import DiBuyContext from '../../context/DiBuyContext'
const ProtectedRoute = (props) => {
    if (Cookies.get("jwtToken") === undefined) {
        return <Redirect to="/user/login" />
    }


    return (
        <DiBuyContext.Consumer>
            {value => {
                const { currentRoute, setCurrentRoute } = value
                if (props.path !== currentRoute) {
                    setCurrentRoute(props.path)
                }
                return <Route {...props} />
            }}
        </DiBuyContext.Consumer>
    )

}

export default ProtectedRoute