import {IContactView} from "../models/IContactView";
import axios from 'axios';

export class ContactService {
    private static serverUrl: string = process.env.REACT_APP_EXPRESS_SERVER_URL ? process.env.REACT_APP_EXPRESS_SERVER_URL : "";

    /**
     @usage : to get all contacts
     @method : GET
     @params : no-params
     @url : http://localhost:9000/contacts
     */
    public static getAllContacts(): Promise<{ data: IContactView[] }> {
        let dataUrl: string = `${this.serverUrl}/contacts`;
        return axios.get(dataUrl);
    }

    /**
     @usage : get a contact
     @method : GET
     @params : no-params
     @url : http://localhost:9000/contacts/:contactId
     */
    public static getContact(contactId: string): Promise<{ data: IContactView }> {
        let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
        return axios.get(dataUrl);
    }

    /**
     @usage : create a contact
     @method : POST
     @params : name, imageUrl, email, mobile, company, title, groupId
     @url : http://localhost:9000/contacts/
     */
    public static createContact(contact: IContactView): Promise<{ data: IContactView }> {
        let dataUrl: string = `${this.serverUrl}/contacts/`;
        return axios.post(dataUrl, contact);
    }

    /**
     @usage : Update a contact
     @method : PUT
     @params : name, imageUrl, email, mobile, company, title, groupId
     @url : http://localhost:9000/contacts/:contactId
     */
    public static updateContact(contact: IContactView, contactId: string): Promise<{ data: IContactView }> {
        let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
        return axios.put(dataUrl, contact);
    }

    /**
     @usage : Delete a contact
     @method : DELETE
     @params : no-params
     @url : http://localhost:9000/contacts/:contactId
     */
    public static deleteContact(contactId: string): Promise<{ data: {} }> {
        let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
        return axios.delete(dataUrl);
    }
}