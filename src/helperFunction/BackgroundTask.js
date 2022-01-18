
import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SmsAndroid from 'react-native-get-sms-android';

import { CheckingForNewMessage } from "./CheckingNewSms";


export const onStart = () => {
    // Checking if the task i am going to create already exist and running, which means that the foreground is also running.
    if (ReactNativeForegroundService.is_task_running('taskid')) return;
    // Creating a task.
    ReactNativeForegroundService.add_task(
        async () => {

            const array = await AsyncStorage.getItem('sms')
            const ArrayLength = await AsyncStorage.getItem('lngth')
            const Getindex = await AsyncStorage.getItem('index')

            if (array !== null, Getindex !== null, ArrayLength !== null) {
                // console.log(array)
                let StoredArray = JSON.parse(array);
                let length = JSON.parse(ArrayLength);
                let index = JSON.parse(Getindex);
                console.log(index, StoredArray.length)

                if (index + 1 <= length) {

                    console.log(StoredArray[index].message);
                    console.log(StoredArray[index].phone);
                    await SmsAndroid.autoSend(
                        StoredArray[index].phone,
                        StoredArray[index].message,
                        (fail) => {
                            console.log('Failed with this error: ' + fail);
                        },
                        (success) => {
                            console.log('SMS sent successfully', success);
                            const update = async () => {
                                try {
                                    const Url = await AsyncStorage.getItem('URL')

                                    const res = await axios.get(`${Url}?action=updateSMS&id=${StoredArray[index].id}&status=sent`)
                                    if (res.data.sts == 'success') {
                                        await AsyncStorage.setItem('index', `${(index + 1)}`)
                                    }
                                } catch (error) {
                                    console.log(error)
                                }
                            }
                            update()

                        },
                    );

                } else {
                    CheckingForNewMessage()
                }
            }

        },

        {
            delay: 10000,
            onLoop: true,
            taskId: 'taskid',
            onError: (e) => console.log(`Error logging:`, e),
        },
    );

    return ReactNativeForegroundService.start({
        id: 144,
        title: 'Sms Service',
        message: "please don't turn off your internet",
    });
};

export const onStop = () => {
    // Make always sure to remove the task before stoping the service. and instead of re-adding the task you can always update the task.
    if (ReactNativeForegroundService.is_task_running('taskid')) {
        ReactNativeForegroundService.remove_task('taskid');
    }
    // Stoping Foreground service.
    return ReactNativeForegroundService.stop();
};