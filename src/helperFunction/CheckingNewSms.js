import AsyncStorage from '@react-native-async-storage/async-storage'

export const CheckingForNewMessage = async () => {
    const Url = await AsyncStorage.getItem('URL')
    console.log(`${Url}?action=getSMS`)
    try {
        const res = await axios.get(`${Url}?action=getSMS`)
        console.log(res.data)
        if (res.data.sts == 'success') {
            const array = JSON.stringify(res.data.data);
            const length = JSON.stringify((res.data.data).length)
            console.log(length)
            await AsyncStorage.setItem('index', `${0}`)
            await AsyncStorage.setItem('lngth', `${length}`)
            await AsyncStorage.setItem('sms', array)

            onStart()
        } else {

        }

    } catch (error) {
        console.log(error)
    }
}