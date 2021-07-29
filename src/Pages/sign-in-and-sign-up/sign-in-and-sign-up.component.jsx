import React from 'react';

import  './sign-in-and-sign-up.style.scss'
import SignIn from '../../Components/sign-in/sign-in.component.jsx'
import SignUp from '../../Components/sign-up/sign-up.component.jsx'

const SignInAndSignUp = () => (
    <div className="sign-in-and-sign-up">
        <SignIn/>
        <SignUp />
    </div>
)

export default SignInAndSignUp;