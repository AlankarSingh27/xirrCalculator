import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import * as userReducer from "../../../../redux/users/users.slice";
import {TokenUtil} from "../../../../util/TokenUtil";
import image1 from "../../../../assets/img/logo.jpeg";
export const Home: React.FC = () => {

    const userState = useSelector((state: RootState) => {
        return state[userReducer.userFeatureKey];
    });

    const {isAuthenticated} = userState;

    return (
        <>
            <div className="landing">
               
                <div className="wrapper">
                <div id="logo"><img src={image1} height='100' width='200' alt="logo" /></div>
                    <div className="d-flex flex-column justify-content-center align-items-center text-center h-25 ">
                        <h1 className=" display-1 text-light">XIRR Calculator App</h1>
                        <div>
                            {
                                isAuthenticated && TokenUtil.isLoggedIn() ?
                                    <Link to={'/contacts/admin'}>
                                        <button className="btn btn-info">Manage Contacts</button>
                                    </Link> :
                                    <Link to={'/users/login'}>
                                        <button className=" mt-4 btn btn-warning ms-3">Login</button>
                                    </Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default Home;