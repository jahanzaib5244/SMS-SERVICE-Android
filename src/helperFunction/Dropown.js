import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Modal, StyleSheet, ActivityIndicator, TextInput } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { size, Colors, font } from '../utils/Utils'

export default function Dropdown({ select, customstyle }) {
    const [show, setshow] = useState(false)
    const [selected, setselected] = useState(null)
    const [Url, setUrl] = useState(null)
    const [invalid, setinvalid] = useState(false)
    const [InavlidText, setInavlidText] = useState('')


    const saveBaseUrl = async () => {

        await AsyncStorage.setItem('URL', Url);
        setshow(false)
    }





    useEffect(() => {
        const getURLFROMStorage = async () => {
            const StoredUrl = await AsyncStorage.getItem('URL');
            console.log(StoredUrl)
            setUrl(StoredUrl)
        }
        getURLFROMStorage()
    }, [])

    return (
        <View>
            <TouchableOpacity style={[styles.Input, customstyle]} onPress={() => setshow(true)} >
                <Text style={styles.text}>Base Url</Text>
                <View style={styles.textinput} >
                    <Text>{Url}</Text>
                </View>

            </TouchableOpacity>
            {invalid ? <Text style={{ paddingLeft: 40, color: Colors.danger }}>{InavlidText}</Text> : null}
            <Modal
                style={styles.modalstyle}
                animationType='fade'
                transparent={true}
                visible={show}
                onRequestClose={() => {

                    setshow(!show);
                }}
            >
                <TouchableOpacity style={styles.ModalView} onPress={() => setshow(!show)}>
                    <View style={styles.inner}>
                        <Text style={{ alignSelf: 'center', color: Colors.black, fontWeight: '700', marginTop: 10 }}>Enter Your Base URL</Text>
                        <TextInput
                            value={Url}
                            keyboardType='url'
                            placeholder='https://baseUrl.com'
                            style={{ borderWidth: 1, paddingLeft: 20, marginHorizontal: 20, borderRadius: 10, marginTop: 10 }}
                            onChangeText={(e) => setUrl(e)}
                        />
                        <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 20, justifyContent: 'space-around', top: 30 }}>
                            <TouchableOpacity onPress={() => setshow(false)} style={{ backgroundColor: Colors.danger, height: 40, width: '30%', borderRadius: 10, justifyContent: 'center', alignItems: 'center', }} >
                                <Text style={{ fontSize: font.h3, color: Colors.white, fontWeight: '700' }}>Cancel </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => saveBaseUrl()} style={{ backgroundColor: Colors.success, height: 40, width: '30%', borderRadius: 10, justifyContent: 'center', alignItems: 'center', }} >
                                <Text style={{ fontSize: font.h3, color: Colors.white, fontWeight: '700' }}>Submit </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>

    )

}
export const LoadingBussiness = ({ customstyle }) => {
    return (
        <TouchableOpacity style={[styles.Input, customstyle]} >
            <Text style={styles.text}>Enter Base URL</Text>
            <View style={styles.textinput} >
                <ActivityIndicator size='small' color={Colors.black} />
            </View>

        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    modalstyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ModalView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inner: {
        padding: 10,
        width: "85%",
        minHeight: size.height20 + 50,
        borderRadius: 20,
        marginHorizontal: 30,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'rgba(100,100,100,0.3)'
    },
    options: {
        width: '100%',
        padding: 5,
        paddingVertical: 15,
        // elevation: 0.3,
        borderBottomWidth: 0.7,

        borderColor: 'rgba(100,100,100,0.5)',
        // backgroundColor:'red'
    },
    dropdownSelector: {

        height: 80,
        // backgroundColor:'green',
        marginVertical: 5,
        marginHorizontal: 30,
        borderRadius: 10,
        elevation: 1,

    },
    Input: {
        marginHorizontal: 30,
        // marginBottom: 28,
        backgroundColor: Colors.primary,
        elevation: 6,
        shadowColor: Colors.primary,
        borderRadius: 10,
        padding: 10,
    },
    text: {

        color: Colors.black,
        fontSize: font.h3,
        fontWeight: '700',
        letterSpacing: 1,
        alignSelf: 'center'
    },
    textinput: {

        marginVertical: 5,
        marginHorizontal: 5,
        fontSize: font.h3,
        padding: 5,
        paddingHorizontal: 10,
        marginTop: 5
    },
    optionText: {
        color: Colors.black,
        fontSize: font.h3
    }
})
