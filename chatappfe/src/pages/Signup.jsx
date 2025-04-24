import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    role: 'patient' // or doctor
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Min 6 characters').required('Required')
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post('/auth/signup', values);
      alert('Signup successful, now login');
      navigate('/');
    } catch (error) {
      alert('Error: ' + error.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label>Name:</label>
              <Field name="name" />
              <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label>Email:</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label>Password:</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label>Role:</label>
              <Field as="select" name="role">
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </Field>
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Signing up...' : 'Signup'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
