import { StyleSheet, Text, View,Image, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { AuthContext } from '../navigation/AuthProvider';

const Loginscreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false); 

  const { Login } = useContext(AuthContext);

  const onLoginPress = async () => {
    setLoading(true); 

    try {
      await Login(email, password); 
    } catch (error) {
      console.log(error); // handle error appropriately
    } finally {
      setLoading(false); 
    }
  };

  return (
    <View style={styles.container}>
       <Image
        source={require('../assets/CNM.png')}
        style={styles.logo}
      />
    <Text style={styles.text}>CNM App</Text>

      <FormInput
          labelValue={email}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholderText="Email"
          iconType= 'user'
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />
       {loading && <ActivityIndicator size="large" color="#0000ff" />}

      <FormButton
        buttonTitle="Sign In"
        onPress={onLoginPress} 
      />
      <TouchableOpacity
      style={styles.forgotButton}
      onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.navButtonText}>
          Don't have an acount? Create here
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Loginscreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50
    
    //color:#ffff
  },
  logo: {
    height: 120,
    width: 120,
    //borderRadius: 150/2,
    resizeMode: 'contain',
    backgroundColor:'transparent',
    
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
})