import { View, Text, ScrollView } from "react-native"
import  Header  from "../../components/Header"
import CircleButton from "../../components/CircleButton"


const Detail = (): JSX.Element => {
    return (
        <View>
            <Header/>
            <View>
                <Text>買い物リスト</Text>
                <Text>時間</Text>
            </View>
            <ScrollView>
                <Text>
                    買い物リスト
                    書体やレイアウト確認
                    本文用のため使い方を間違えた場合不自然になる
                </Text>
            </ScrollView>
            <CircleButton>+</CircleButton>
        </View>
    )
}

export default Detail