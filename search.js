import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
export default class Search extends React.Component {

    render(){
        return(
            <View>
                <Text style={stylez.Searchsty}>
                    Search
                </Text>
            </View>
        )
    }
}
const stylez = StyleSheet.create({
    Searchsty:{
        justifyContent:'center',
        backgroundColor:'green',
        alignText:'center',
        Textsize:'10',
        fontWeight:'5',
        Textcolor:'Red',

    }
})