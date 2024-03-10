import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

const passwordSchema = Yup.object().shape({ passwordLength: Yup.number().min(4, "should be min of 4 charcters").max(16, "should be max of 16 charcters").required('Length is required') })
export default function App() {

  const [pass, setPass] = useState('');
  const [isPassGenearted, setIsPassGenearted] = useState(false);

  const [lowecase, setLowecase] = useState(true);
  const [uppercase, setUppercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);


  const generatePass = function (passWordLength: number) {
    let characterList = '';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTRUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';

    if (uppercase) {
      characterList += upperCaseChars;
    }

    if (lowecase) {
      characterList += lowerCaseChars;
    }

    if (numbers) {
      characterList += numberChars;
    }

    if (symbols) {
      characterList += symbolChars;
    }
    const result = createPassword(characterList, passWordLength);
    setPass(result);
    setIsPassGenearted(true);
    return result
  }

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));

    }

    return result;
  }

  const resetPasswordState = () => {
    setPass("");
    setIsPassGenearted(false);
    setLowecase(false);
    setUppercase(false);
    setSymbols(false);
    setNumbers(false);
  }

  return (
   <ScrollView keyboardShouldPersistTaps='handled'>
<SafeAreaView style={styles.appContainer}>
  <View style={styles.formContainer}>
  <Formik
       initialValues={{  passwordLength: '' }}
       validationSchema={passwordSchema}
       onSubmit={(val) => {
        generatePass(Number(val.passwordLength));
        console.log(val);
       }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
        handleReset,
        handleSubmit,
        
         /* and other goodies */
       }) => (
        <>
        <View style={styles.inputWrapper}>
        <View style={styles.inputColumn}>
          <Text style={styles.heading}>Password Length</Text>
          {touched.passwordLength && errors.passwordLength && (
            <Text style={styles.errorText}>
              {errors.passwordLength}
            </Text>
          )}
          
          </View>
          <TextInput
          style={styles.inputStyle}
          value={values.passwordLength}
          onChangeText={handleChange('passwordLength')}
          placeholder='Ex.8'
          keyboardType='numeric'
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputWrapper}>
            <Text style={styles.heading}>
              Include lowercase
            </Text>
            <BouncyCheckbox 
            disableBuiltInState
            isChecked={lowecase}
            onPress={()=>setLowecase(!lowecase)}
            fillColor='#29AB87'
            />
          </Text>
          </View>

          <View style={styles.inputWrapper}>
          <Text style={styles.inputWrapper}>
            <Text style={styles.heading}>
              Include uppercase letters
            </Text>
            <BouncyCheckbox 
            disableBuiltInState
            isChecked={uppercase}
            onPress={()=>setUppercase(!uppercase)}
            fillColor='#29AB97'
            />
          </Text>
          </View>

          <View style={styles.inputWrapper}>
          <Text style={styles.inputWrapper}>
            <Text style={styles.heading}>
              Include Numbers
            </Text>
            <BouncyCheckbox 
            disableBuiltInState
            isChecked={numbers}
            onPress={()=>setNumbers(!numbers)}
            fillColor='#29ED87'
            />
          </Text>
          </View>

          <View style={styles.inputWrapper}>
          <Text style={styles.inputWrapper}>
            <Text style={styles.heading}>
              Include symbols
            </Text>
            <BouncyCheckbox 
            disableBuiltInState
            isChecked={symbols}
            onPress={()=>setSymbols(!symbols)}
            fillColor='#70AB87'
            />
          </Text>
          </View>

            <View style={styles.formActions}>

            <TouchableOpacity
            disabled={!isValid}
            style={styles.primaryBtn}
            onPress={handleSubmit}
            ><Text style={styles.primaryBtnTxt}>Generate Password</Text></TouchableOpacity>

            <TouchableOpacity 
            style={styles.secondaryBtn}
            onPress={
              ()=>{handleReset();
                  resetPasswordState();
              }}
            >
             
              <Text style={styles.secondaryBtnTxt}>Reset</Text></TouchableOpacity>


            </View>
        </>
       )}
     </Formik>
  </View>
{isPassGenearted && (
<View style={[styles.card,styles.cardElevated]}>
  <Text style={styles.subTitle}>
    Result:
  </Text>
  <Text style={styles.description}>
    Long Press to copy
  </Text>
  <Text selectable={true} style={styles.generatedPassword}>
    {pass}
  </Text>
</View>

)  }
</SafeAreaView>
   </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
    fontWeight: '600',
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
});