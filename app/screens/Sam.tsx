import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const Sam = ({onSubmit}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = () => {
      // Perform form validation and submit data
      onSubmit({ email, password });
    };
    return (
      <View style={{margin:30}}>
        <TextInput
          placeholder="Emailvhgvkhgvhgvk"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Button title="Fuck" onPress={handleSubmit} />
      </View>
    )
  }
  
export default Sam