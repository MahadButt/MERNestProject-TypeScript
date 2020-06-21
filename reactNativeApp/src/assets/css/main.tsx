import { StyleSheet } from "react-native";
export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#c9e7ca',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        padding: 10,
        margin: 15,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    button: {
        width: 300,
        margin: 15,
        backgroundColor: "skyblue",
        padding: 10,
        borderRadius: 5,
    },
    multiButtonContainer: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 20,
        color: '#fff',
    },
    LinkText: {
        fontSize: 18,
        color: 'darkblue',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    image:{ width: 130, height: 130,borderRadius: 130/2 }  //width: 60, height: 60,borderRadius: 60/2 
    //to circular images
});