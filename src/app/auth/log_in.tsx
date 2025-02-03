import { StyleSheet, View, Text } from "react-native"
import Header from "../../components/Header"

const Login = (): JSX.Element => {
    return (
        <View style={styles.container}>
            <Header />
            <View>
                <Text>Login</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Login