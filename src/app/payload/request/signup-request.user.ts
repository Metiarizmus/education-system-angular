
export interface SignupRequestUser {
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  password: String
  avatar: File | null
}
