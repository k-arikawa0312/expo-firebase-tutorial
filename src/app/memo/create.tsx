import { 
    StyleSheet, View, TextInput,
    Alert
} from "react-native"
import Icon from "../../components/Icon"
import CircleButton from "../../components/CircleButton"
import { router } from "expo-router"
import { addDoc, collection, Timestamp } from "firebase/firestore"
import { auth, db } from "../../config"
import { useState } from "react"
import KeyboardSafeView from "../../components/KeyboardAvoidingView"

const handlePress = (bodyText: string): void => {
    const ref = collection(db, `users/${auth.currentUser?.uid}/memos`)
    addDoc(ref, {
        bodyText,
        updatedAt: Timestamp.fromDate(new Date())
    })
        .then(() => {
            router.back()
        })
        .catch((error) => {
            Alert.alert('エラー','メモの作成に失敗しました。')
            console.log(error)
        })
}

const Create = (): JSX.Element => {
    const [bodyText, setBodyText] = useState<string>('')
    return (
        <KeyboardSafeView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput 
                    multiline
                    style={styles.input} 
                    value={bodyText}
                    onChangeText={(text) => { setBodyText(text) }}
                    autoFocus
                    autoCapitalize="none"
                />
            </View>
            <CircleButton onPress={() => {handlePress(bodyText) }}>
            <Icon name="checkmark" size={40} color="#ffffff"/>
            </CircleButton>
        </KeyboardSafeView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    inputContainer: {
        paddingVertical:32,
        paddingHorizontal:27,
        flex:1
    },
    input: {
        flex:1,
        textAlignVertical:'top',
        fontSize:16,
        lineHeight:24
    }
})

export default Create