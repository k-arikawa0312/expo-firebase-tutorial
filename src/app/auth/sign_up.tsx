import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from "react-native"
import Button from "../../components/button"
import { Link, router } from "expo-router"
import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../config"

const handlePress = (email: string, password: string): void => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential.user.uid)
            router.replace('/memo/list')
        })
        .catch((error) => {
            const { code, message } = error
            console.log(code, message)
            Alert.alert(message)
        })
}


const Signup = (): JSX.Element => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <Text style={styles.title}>Sign Up</Text>
                <TextInput 
                    style={styles.input} 
                    value={email} 
                    onChangeText={(text) => { setEmail(text) }} 
                    autoCapitalize="none" 
                    keyboardType="email-address" 
                    placeholder="Email Address"
                    textContentType="emailAddress"
                />
                <TextInput 
                    style={styles.input} 
                    value={password} 
                    onChangeText={(text) => { setPassword(text) }} 
                    autoCapitalize="none" 
                    secureTextEntry
                    placeholder="Password"
                    textContentType="password"
                />
            </View>
            <View style={{alignItems: 'flex-start',marginLeft: 24}}>
            <Button label="Submit" onPress={() => { handlePress(email, password) }}/>
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>Already registered?</Text>
                <Link href='/auth/log_in' asChild replace>
                <TouchableOpacity>
                <Text style={styles.footerLink}>Log In.</Text>
                </TouchableOpacity>
                </Link>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F8'
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: 'bold',
        marginBottom: 24
    },
    inner: {
        paddingVertical: 24,
        paddingHorizontal: 27
    },
    input: {
        backgroundColor: '#dddddd',
        borderWidth: 1,
        borderColor: '#ffffff',
        height: 48,
        padding: 8,
        fontSize: 16,
        marginBottom: 16
    },
    footer: {
        flexDirection: 'row',
        marginLeft: 27
    },
    footerText: {
        fontSize: 14,
        lineHeight: 24,
        marginRight: 8
    },
    footerLink: {
        fontSize: 14,
        lineHeight: 24,
        color: '#467FD3'
    }
})

export default Signup