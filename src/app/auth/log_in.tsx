import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Modal } from "react-native"
import Button from "../../components/button"
import { Link, router } from "expo-router"
import { useState } from "react"
import {  signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../config"
import { ErrorMessages } from "../../../types/authErrorMessages"
import { sendPasswordResetEmail } from "firebase/auth"

const errorMessages: ErrorMessages = {
    'auth/invalid-email': "無効なメールアドレスです。",
    'auth/user-disabled': "このアカウントは無効化されています。",
    'auth/user-not-found': "メールアドレスが見つかりません。",
    'auth/wrong-password': "パスワードが間違っています。",
    'auth/operation-not-allowed': "この認証方法は無効です。",
    'auth/too-many-requests': "しばらくしてから再試行してください。",
    'auth/timeout': "リクエストがタイムアウトしました。",
    'auth/invalid-credential': '不明なエラーです。メールアドレスまたはパスワードを確認してください。'
}

const handlePress = (email: string, password: string): void => {
    if (email === '' || !password) {
        Alert.alert("エラー", "メールアドレスとパスワードを入力してください。")
    } else {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential.user.uid)
                router.replace('/memo/list')
            })
            .catch((error) => {
                const { code, message } = error
                console.log('firebaseのエラー:', code, message)
                Alert.alert(errorMessages[code])
            })
    }
}

const handleResetPassword = (email: string): void => {
    if (!email) {
        Alert.alert("エラー", "メールアドレスを入力してください。")
        return
    }

    sendPasswordResetEmail(auth, email)
        .then(() => {
            Alert.alert("成功", "パスワード再設定用のメールを送信しました。")
        })
        .catch((error) => {
            const { code } = error
            const message = errorMessages[code] || "パスワード再設定中にエラーが発生しました。"
            Alert.alert(message)
        })
}

const Login = (): JSX.Element => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isModalVisible, setModalVisible] = useState<boolean>(false)
    const [resetEmail, setResetEmail] = useState<string>('')
    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <Text style={styles.title}>Login</Text>
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
            <View style={{alignItems: 'flex-start', marginLeft: 24}}>
                <Button label="Submit" onPress={() => { handlePress(email, password) }}/>
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>Not registered?</Text>
                <Link href='/auth/sign_up' asChild replace>
                <TouchableOpacity>
                <Text style={styles.footerLink}>Sign up here!</Text>
                </TouchableOpacity>
                </Link>
            </View>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={[styles.footerLink, {marginLeft: 24}]}>パスワードを忘れた場合</Text>
                </TouchableOpacity>

            <Modal
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>パスワード再設定</Text>
                    <TextInput
                        style={styles.input}
                        value={resetEmail}
                        onChangeText={setResetEmail}
                        placeholder="メールアドレスを入力"
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <View style={styles.modalButtonContainer}>
                    <Button label="送信" onPress={() => { handleResetPassword(resetEmail); setModalVisible(false) }} />
                    <Button label="キャンセル" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
            <View style={{alignItems: 'flex-start', marginLeft: 24}}>
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
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        color: '#ffffff'
    },
    modalButtonContainer: {
        flexDirection: 'row'
    }
})

export default Login