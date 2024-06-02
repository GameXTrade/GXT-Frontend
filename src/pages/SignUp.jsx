import { SimpleRegistrationForm } from "../components/SimpleRegistrationForm";
function SignUp() {
  return (
    <div
      className="flex justify-center items-center"
      style={{ height: "calc(100dvh - 65px)" }}
    >
      <title>GameXTrade | sign-up</title>
      <SimpleRegistrationForm />
      {/* <SignUpFormular/> */}
    </div>
  );
}

export default SignUp;
