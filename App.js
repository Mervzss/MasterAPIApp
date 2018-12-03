import React, { Component } from 'react';
import { Alert, Keyboard, Text, View, StyleSheet, Button, TextInput } from 'react-native';
import { Formik, Field } from 'formik';
// import Yup,{string, number, object} from 'yup'
import * as Yup from 'yup'
// import axios from 'axios'
const axios = require('axios');


export default class App extends Component {

  render() {

    const yupSchema = Yup.object().shape({
      email: Yup.string().email('email this'),
      pass: Yup.string().min(5, 'minimum is 5')
    })

    return (
      <View style={styles.container}>
        <View>
          <Text>"Formik & React Native"</Text>
        </View>
        <View style={styles.content}>
          <Formik
            validationSchema={yupSchema}
            validateOnChange={true}
            validateOnBlur={true}
            // validate={values => {
            //   let errors = {};

            //   if (!values.email) {

            //     errors.email = 'Required';
            //   } else if (!/^[A-Z0-9._+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            //     errors.email = 'Invalid email address';
            //   }

            //   //...
            //   // console.log(errors)
            //   return errors;
            // }} 
            initialValues={{ email: '', pass: '' }}
            onSubmit={(values, s) => {
              Alert.alert("name entered", values.email.toString() + values.pass.toString(), null, { cancelable: false })
              // console.log('Submmited', s)
              // Alert.alert(JSON.stringify(values.email, null, 2));
              // s.resetForm(values)

              axios.get('/posts')
                .then(res => console.log(res))
                .catch(err => console.log(err))
                .then(val => console.log(val))

              Keyboard.dismiss();
            }

            }>

            {({ handleChange, handleSubmit, values, submitCount, errors, resetForm, handleBlur }) => (
              <View>
                <TextInput
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  label="Email"
                  placeholder="I am ready!"
                />
                <Text> {submitCount} {errors.email}</Text>

                <TextInput
                  onChangeText={handleChange('pass')}
                  value={values.pass}
                  label="Pass"
                  placeholder="pass ready!"
                />
                <Text> {submitCount} {errors.pass} {console.log(errors)}</Text>

                <Button onPress={() => errors.email === undefined ? handleSubmit() : alert(errors.email)
                  // resetForm.bind(this,values)


                } style={styles.button} title='Submit' />
              </View>
            )}


          </Formik>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  content: {
    padding: 16,
  },
  button: {
    marginTop: 16,
  }
});
