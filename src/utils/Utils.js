import { Dimensions } from "react-native"

const {height,width} = Dimensions.get('window')
const darkthem=true

export const Colors={
    primary : darkthem ?'#F5F5F5': '#121212',
    black: darkthem ?'#000000': '#fff',
    secondary: darkthem ?'#000000': '#fff',
    danger: "#FF6666",
    white: darkthem ?'#FFFFFF': '#1f1f1f',
    lightBlack: darkthem ?'#2E2F33': '#fff',
    profileCard: darkthem ?'#2F3541': '#fff', 
    success: darkthem ?'#20bf6b': '#fff',
    drawer: darkthem ?'#E6AC00': '#fff'
    // #43445B
//#2B2A3A
}
export const font={
    h1:30,
    h3:15,
    h2:18,
    h4:13,
    Extralarge:40
}
export const size={
       height10:height *0.1,
       height20:height *0.2,
       height30:height *0.3,
       height40:height*0.4,
       height50:height*0.5,
       height60:height*0.6,
       height70:height*0.7,
       height80:height*0.8,
       height90:height*0.9,
       height100:height,
       width10:width *0.1,
       width20:width *0.2,
       width30:width *0.3,
       width40:width*0.4,
       width50:width*0.5,
       width60:width*0.6,
       width70:width*0.7,
       width80:width*0.8,
       width90:width*0.9,
       width100:width,
       width95:width *0.95,
}