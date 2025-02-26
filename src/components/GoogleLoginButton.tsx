import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth'
import { auth } from '../config'
import * as Google from 'expo-auth-session/providers/google'
import { router } from 'expo-router'

const GoogleLoginButton = (): JSX.Element => {
    const [ request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: 'あなたのGoogle Client ID' // Google Cloud ConsoleからのクライアントIDを入力
    })

    const handleGoogleLogin = async () => {
        try {
            const result = await promptAsync()
            if (result?.type === 'success') {
                const { id_token } = result.params
                const credential = GoogleAuthProvider.credential(id_token)
                const userCredential = await signInWithCredential(auth, credential)
                console.log('Google認証成功:', userCredential.user.uid)
                router.replace('/memo/list')
            }
        } catch (error) {
            console.error('Google認証エラー:', error)
        }
    }

    return (
        <TouchableOpacity 
            style={styles.button}
            onPress={() => handleGoogleLogin()}
        >
            <Text style={styles.buttonText}>Googleでログイン</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#dddddd',
        borderRadius: 4,
        padding: 12,
        marginBottom: 16,
        alignItems: 'center',
        marginHorizontal: 24
    },
    buttonText: {
        color: '#333333',
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export default GoogleLoginButton
