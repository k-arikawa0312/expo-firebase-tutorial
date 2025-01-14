import { View, Text, ScrollView, StyleSheet } from "react-native"
import  Header  from "../../components/Header"
import CircleButton from "../../components/CircleButton"


const Detail = (): JSX.Element => {
    return (
        <View style={styles.container}>
            <Header/>
            <View style={styles.memoHeader}>
                <Text style={styles.memoTitle}>買い物リスト</Text>
                <Text style={styles.memoDate}>時間</Text>
            </View>
            <ScrollView style={styles.memoBody}>
                <Text style={styles.memoBodyText}>
                    買い物リスト
                    書体やレイアウト確認
                    本文用のため使い方を間違えた場合不自然になる
                </Text>
            </ScrollView>
            <CircleButton style={{ top:160, bottom:'auto' }}>+</CircleButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#ffffff'
    },
    memoHeader: {
        backgroundColor: '#467FD3',
        height:96,
        justifyContent:'center',
        paddingVertical:24,
        paddingHorizontal:19
    },
    memoTitle:{
        color:'#ffffff',
        fontSize:20,
        lineHeight:32,
        fontWeight:'bold'

    },
    memoDate:{
        color:'#ffffff',
        fontSize:12,
        lineHeight:16
    },
    memoBody:{
        paddingVertical:32,
        paddingHorizontal:27
    },
    memoBodyText:{
        lineHeight:24,
        fontSize:16,
        color:'#000000'
    }
})

export default Detail