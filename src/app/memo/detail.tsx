import { View, Text, ScrollView, StyleSheet } from "react-native"
import CircleButton from "../../components/CircleButton"
import Icon from "../../components/Icon"
import { router, useLocalSearchParams } from "expo-router"

const handlePress = (): void => {
    router.push('/memo/edit')
}

const Detail = (): JSX.Element => {
    const { id } = useLocalSearchParams()
    console.log(id)
    return (
        <View style={styles.container}>
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
            <CircleButton onPress={handlePress} style={{ top:60, bottom:'auto' }}>
                <Icon name="pencil" size={40} color="#ffffff"/>
            </CircleButton>
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