import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./modules/layout/pages/home/Home";
import NotFound404 from "./modules/layout/pages/not-found/NotFound404";
import ContactsAdmin from "./modules/contacts/pages/contacts-admin/ContactsAdmin";
import LendersAdmin from "./modules/contacts/pages/lenders-admin/LendersAdmin";
import AddContact from "./modules/contacts/pages/add-contact/AddContact";
import AddLender from "./modules/contacts/pages/add-lender/AddLender";
import EditContact from "./modules/contacts/pages/edit-contact/EditContact";
import EditLender from "./modules/contacts/pages/edit-lender/EditLender";
import ViewContact from "./modules/contacts/pages/view-contact/ViewContact";
import ViewLender from "./modules/contacts/pages/view-lender/ViewLender";
import {ToastContainer} from "react-toastify";
import LoginUser from "./modules/users/pages/LoginUser";
import RegisterUser from "./modules/users/pages/RegisterUser";
import {AppDispatch, useAppDispatch} from "./redux/store";
import {TokenUtil} from "./util/TokenUtil";
import * as userActions from "./redux/users/users.actions";

const App: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();


    useEffect(() => {
        if (TokenUtil.isLoggedIn()) {
            dispatch(userActions.getUserInfoAction());
        }
    }, [])

    return (
        <>
            <ToastContainer
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/contacts/admin'} element={<ContactsAdmin/>}/>
                    <Route path={'/contacts/add'} element={<AddContact/>}/>
                    <Route path={'/lenders/admin'} element={<LendersAdmin/>}/>
                    <Route path={'/lenders/add'} element={<AddLender/>}/>
                    <Route path={'/contacts/edit/:contactId'} element={<EditContact/>}/>
                    <Route path={'/lenders/edit/:contactId'} element={<EditLender/>}/>
                    <Route path={'/lenders/view/:contactId'} element={<ViewLender/>}/>
                    <Route path={'/contacts/view/:contactId'} element={<ViewContact/>}/>
                    <Route path={'/users/login'} element={<LoginUser/>}/>
                    <Route path={'/users/register'} element={<RegisterUser/>}/>
                    <Route path={'*'} element={<NotFound404/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
