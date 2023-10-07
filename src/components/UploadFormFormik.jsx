import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const UploadSchema = Yup.object().shape({
  comment: Yup.string()
    .max(120, 'Максимум 20 символов'),
});

export default function UploadFormFormik() {

  return (
    <div>
      <Formik
        initialValues={{
          file: undefined,
          comment: ''
        }}
        validationSchema={UploadSchema}
        onSubmit={ async (values) => {
          console.log(values);
          // const response = await fetch('http://localhost:8000/files/', {
          // method: 'POST',
          // headers: {
          //   'Content-Type': 'application/json'
          // },
          // body: JSON.stringify(values)
          // })   
          // console.log(response)      
        }}
      >
        {({ errors, touched }) => (
          <Form className="form form-upload">
            <div className="form__group">
              <label htmlFor="username">Файл</label>
              <Field name="file" type="file" />
            </div>   
            <div className="form__group">
              <label htmlFor="firstName">Комментарий</label>
              <Field name="comment" />
              {errors.comment && touched.comment ? (
                <div className="error-message">{errors.comment}</div>
              ) : null}
            </div> 
            <button type="submit" className="btn form__btn">Загрузить</button>
          </Form>
        )}
      </Formik>
  </div>
  )
}