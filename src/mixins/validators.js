import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  data() {
    return { email: null, password: null }
  },
  validations: {
    user: {
      email: { required, email },
      password: { required, minLength: minLength(8) },
    },
  },
}
