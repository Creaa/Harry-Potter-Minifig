import React, { FC } from 'react';
import { Text, TextInput, View, StyleSheet, ScrollView, InputModeOptions } from 'react-native';
import { Formik } from 'formik';
import Button from '../../../../common/components/Button/Button';
import * as Yup from 'yup';
import { IPersonalDetails } from '../../../../common/interfaces/Common';
import { isEmpty } from 'lodash';

interface FormProps {
  onSubmit: (details: IPersonalDetails | null) => void;
  initialState: IPersonalDetails | null;
}

interface FormFieldProps {
  handleChange: (field: string) => void;
  value: string;
  inputMode: InputModeOptions;
  label: string;
  error: string | undefined;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zipCode: Yup.string().required('Zip Code is required'),
});

const FormField: FC<FormFieldProps> = ({ handleChange, value, inputMode, label, error }) => {
  return (
    <View>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        onChangeText={handleChange}
        value={value}
        inputMode={inputMode}
        style={styles.input}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const Form: FC<FormProps> = ({ onSubmit, initialState }) => {
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={
        initialState || {
          name: '',
          email: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
        }
      }
      validateOnMount={true}
      onSubmit={(values: IPersonalDetails) => onSubmit(values)}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={styles.container}
          contentContainerStyle={styles.contentContainerStyle}
        >
          <FormField
            label="Full name"
            handleChange={handleChange('name')}
            inputMode="text"
            value={values.name}
            error={errors.name}
          />
          <FormField
            label="Email"
            handleChange={handleChange('email')}
            inputMode="email"
            value={values.email}
            error={errors.email}
          />
          <FormField
            label="Address"
            handleChange={handleChange('address')}
            inputMode="text"
            value={values.address}
            error={errors.address}
          />
          <FormField
            label="City"
            handleChange={handleChange('city')}
            inputMode="text"
            value={values.city}
            error={errors.city}
          />
          <FormField
            label="State"
            handleChange={handleChange('state')}
            inputMode="text"
            value={values.state}
            error={errors.state}
          />
          <FormField
            label="Zip Code"
            handleChange={handleChange('zipCode')}
            inputMode="text"
            value={values.zipCode}
            error={errors.zipCode}
          />
          <View style={styles.buttonContainer}>
            <Button
              disabled={Boolean(!isEmpty(errors) || isEmpty(values))}
              onPress={() => handleSubmit()}
              title="VIEW SUMMARY"
            />
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: { rowGap: 20, paddingBottom: 300 },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 12,
  },
  container: {
    width: '80%',
    height: 400,
    flex: 1,
    rowGap: 30,
    paddingBottom: 600,
  },
  inputLabel: {
    fontWeight: '700',
    fontSize: 12,
    marginBottom: 6,
    color: '#fff',
  },
  input: {
    width: '100%',
    height: 46,
    backgroundColor: 'white',
    paddingLeft: 15,
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2236',
    borderWidth: 1,
    borderColor: '#2C2C2C4D',
    borderRadius: 4,
  },
});

export default Form;
