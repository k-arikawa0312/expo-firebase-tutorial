import { 
    StyleSheet, View, TextInput, KeyboardAvoidingView
} from "react-native"
import Icon from "../../components/Icon"
import CircleButton from "../../components/CircleButton"
import { router } from "expo-router"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../../config"

const handlePress = (): void => {
    addDoc(collection(db, 'memos'), {
        bodyText: 'test'
    })
        .then((docRef) => {
            console.log('success', docRef.id) 
            router.back()
        })
        .catch((error) => {
            console.log(error)
        })
}

const Create = (): JSX.Element => {
    return (
        <KeyboardAvoidingView behavior="height" style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} value=''/>
            </View>
            <CircleButton onPress={handlePress}>
            <Icon name="checkmark" size={40} color="#ffffff"/>
            </CircleButton>
        </KeyboardAvoidingView>
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