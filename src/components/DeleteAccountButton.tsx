import { getAuth } from "firebase/auth"
import { TouchableOpacity, Text, StyleSheet, Alert } from "react-native"
import { router } from "expo-router"
import { ErrorMessages } from "../../types/authErrorMessages"

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

const handlePress = async () => {
    const confirm = await new Promise((resolve) => {
        Alert.alert(
            "確認",
            "本当にアカウントを削除しますか？",
            [
                { text: "キャンセル", onPress: () => resolve(false), style: "cancel" },
                { text: "削除", onPress: () => resolve(true) }
            ]
        )
    })

    if (!confirm) return

    const auth = getAuth()
    const user = auth.currentUser

    if (user) {
        try {
            await user.delete()
            Alert.alert("成功", "アカウントが削除されました。")
            router.replace('/auth/log_in')
        } catch (error) {
            const errorObj = error as { code?: string }
            const message = errorMessages[errorObj.code ?? ''] || "アカウント削除中にエラーが発生しました。"
            Alert.alert(message)
        }
    } else {
        Alert.alert("エラー", "ユーザーがログインしていません。")
    }
}

const DeleteAccountButton = (): JSX.Element => {
    return (
        <TouchableOpacity onPress={handlePress} style={styles.container}>
            <Text style={styles.text}>アカウント削除</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 16
    },
    text: {
        fontSize: 12,
        lineHeight: 24,
        color: 'rgba(255,255,255,0.7)'
    }
})

export default DeleteAccountButton
