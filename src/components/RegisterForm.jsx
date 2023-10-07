import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, 'Минимум 4 символа')
    .max(20, 'Максимум 20 символов')
    .matches(/^[a-z][a-z\d]+$/gi, 'Должен содержать только латинские буквы и цифры. Первый символ - буква.')
    .required('Обязательное поле'),
  firstName: Yup.string()
    .matches(/^[a-zа-я]+$/gi, 'Введите корректное имя')
    .required('Обязательное поле'),
  lastName: Yup.string()
    .matches(/^[a-zа-я]+$/gi, 'Введите корректную фамилию')
    .required('Обязательное поле'),
  email: Yup.string()
    .email('Неверный email')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(6, 'Минимум 6 символов')
    .matches(/(?=.*[A-Za-z])(?=.*\d)(?=.*[$><\[\]+:%*?&])/, 'Должен содержать как минимум одну заглавную латинскую букву, цифру и спецсимвол($><[]+:%*?)')
    .required('Обязательное поле'),
});

export default function RegisterForm() {

  return (
    <div>
      <Formik
        initialValues={{
          username: '',
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        }}
        validationSchema={RegisterSchema}
        onSubmit={ async (values) => {
          console.log(values);
          const response = await fetch('http://localhost:8000/users/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
          })   
          console.log(response)      
        }}
      >
        {({ errors, touched }) => (
          <Form className="form form-register">
            <div className="form__group">
              <label htmlFor="username">Логин</label>
              <Field name="username" />
              {errors.username && touched.username ? (
              <div className="error-message">{errors.username}</div>
              ) : null}
            </div>   
            <div className="form__group">
              <label htmlFor="firstName">Имя</label>
              <Field name="firstName" />
              {errors.firstName && touched.firstName ? (
                <div className="error-message">{errors.firstName}</div>
              ) : null}
            </div> 
            <div className="form__group">
              <label htmlFor="form-register__last-name">Фамилия</label>
              <Field name="lastName" />
              {errors.lastName && touched.lastName ? (
                <div className="error-message">{errors.lastName}</div>
              ) : null}
            </div>
            <div className="form__group">
              <label htmlFor="form-register__email">Эл. почта</label>
              <Field name="email" type="email" />
              {errors.email && touched.email ? (
              <div className="error-message">{errors.email}</div>
              ) : null}
            </div>
            <div className="form__group">
              <label htmlFor="form-register__password">Пароль</label>
              <Field name="password" type="password"/>
              {errors.password && touched.password ? (
                <div className="error-message">{errors.password}</div>
              ) : null}
            </div>
            <button type="submit" className="btn form__btn">Регистрация</button>
          </Form>
        )}
      </Formik>
  </div>
  )
}