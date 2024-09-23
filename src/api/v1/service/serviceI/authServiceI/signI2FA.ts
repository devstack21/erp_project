import { SignApp } from "./signI";


export interface SignApp2FA extends SignApp{
 
    loginWithGoogle : () => void

    loginWithFacebook : () => void

}