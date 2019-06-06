import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View,
    Button
} from 'react-native';

export default class Secured extends Component {
    render() {
        return (
            <ScrollView style={{padding: 20}}>
                <Text 
                    style={{fontSize: 27}}>
                    {/* We can make this page into the waitlist app instantly. So right after you logged in, it'll change into this page, which is the owner waitlist app.
                    We can also use this to same setup for maybe user setup*/}
                    You are logged in.
                </Text>
                <View style={{margin:20}} />
                <Button
                            onPress={this.props.onLogoutPress}
                            title="Logout"
                        />
                </ScrollView>
                )
    }
}