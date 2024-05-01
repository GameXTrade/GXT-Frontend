import SignUpFormular from "../components/SignUpFormular"
import { SimpleRegistrationForm } from '../components/SimpleRegistrationForm'
function SignUp() {

    return (
    <div className='flex justify-center items-center' style={{ height: "calc(100dvh - 65px)" }}>
        <SimpleRegistrationForm />
        {/* <SignUpFormular/> */}
    </div>
    )
}

export default SignUp