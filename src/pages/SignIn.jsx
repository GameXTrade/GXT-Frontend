import React from 'react'
import SignInFormular from '../components/SignInFormular'
import { SimpleLoginForm } from '../components/SimpleLoginForm'

function SignIn() {
  return (
    <div className='flex justify-center items-center' style={{ height: "calc(100dvh - 65px)" }}>
    <title>GameXTrade | sign-in</title>
    {/* <SignInFormular /> */}
    <SimpleLoginForm />
    
    </div>
  )
}

export default SignIn