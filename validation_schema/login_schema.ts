import * as yup from 'yup';

const userSchema = yup.object({
    email: yup.string().email("please enter valid email").required("Email is required"),
    password: yup.string().min(8).required("Password is required"),
  });

  export default userSchema;