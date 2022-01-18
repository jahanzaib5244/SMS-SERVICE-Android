import axios from 'axios';
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, DeviceEventEmitter, PermissionsAndroid,ToastAndroid } from 'react-native'
import SmsAndroid from 'react-native-get-sms-android';
import SendSMS from 'react-native-sms'
import { onStart, onStop } from './src/helperFunction/BackgroundTask';
import Dropdown from './src/helperFunction/Dropown';
import AsyncStorage from '@react-native-async-storage/async-storage'

DeviceEventEmitter.addListener('sms_onDelivery', (Sms) => {
  console.log('event', Sms);
});
export default function App() {

  const [online, setonline] = useState(false)
  const [total, settotal] = useState(0)
  const [remaing, setremaing] = useState(0)

  const sendSMS = async () => {
    const requestResult = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.SEND_SMS,
      {
        title: "App Need Send SMS Permission",
        message:
          "App Need Send SMS Permission " +
          "so you can Send sms.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (requestResult == 'granted') {
      
      const Url = await AsyncStorage.getItem('URL')
      console.log(`${Url}?action=getSMS`)
      try {
        const res = await axios.get(`${Url}?action=getSMS`)
        console.log(res.data)
        if (res.data.sts == 'success') {
          setonline(true)
          const array = JSON.stringify(res.data.data);
          const length = JSON.stringify((res.data.data).length)
          console.log(length)
          settotal((res.data.data).length)
          await AsyncStorage.setItem('index', `${0}`)
          await AsyncStorage.setItem('lngth', `${length}`)
          await AsyncStorage.setItem('sms', array)

          onStart()
        }

      } catch (error) {
        ToastAndroid.show("Check Internet connection or Base URL and try again" , 5000)
      }
    } else {
      if(requestResult == 'denied'){
        ToastAndroid.show("Sms service could't start because you don't have sms permission" , 3000)
      }
    }

  }

  return (
    <View style={{ flex: 1, }}>

      <Dropdown customstyle={{ marginTop: 40 }} />

      <View style={{ flex: 3, alignItems: 'center', marginTop: 100 }}>
        <TouchableOpacity onPress={() => sendSMS()} style={{ alignItems: 'center', justifyContent: 'center', padding: 20, borderColor: online ? "green" : 'red', height: 250, width: 250, borderRadius: 250 / 2, borderWidth: 2 }}>
          <Text style={{ fontSize: 30, color: 'black' }}>{online ? "Working" : "Start"}</Text>
          {online ? <Text style={{fontSize:22,color:'gray'}}>{remaing}/{total}</Text>    : null}
          
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onStop()
            setonline(false)
          }} style={{ alignItems: 'center', justifyContent: 'center', padding: 20, marginTop: 100, borderWidth: 2 }}>
          <Text>Stop sms service</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
