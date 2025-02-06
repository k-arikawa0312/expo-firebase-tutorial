import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native"
import Header from "../../components/Header"
import Button from "../../components/button"
import { Link } from "expo-router"

const Signup = (): JSX.Element => {
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.inner}>
                <Text style={styles.title}>Sign Up</Text>
                <TextInput style={styles.input} value="Email Address" />
                <TextInput style={styles.input} value="Password" />
            </View>
            <View style={{alignItems: 'flex-start',marginLeft: 24}}>
            <Button label="Submit"/>
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>Already registered?</Text>
                <Link href='/auth/log_in' asChild>
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