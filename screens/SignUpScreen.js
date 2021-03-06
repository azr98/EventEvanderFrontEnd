import React, { useState } from 'react';
import {View, StyleSheet, Button, Text, TextInput, FlatList} from 'react-native';
import Card from '../components/Card';
import  Colors  from '../constants/colors';
import VenueItem from '../components/VenueItem';



const SignUpScreen = props => {
    console.log("Called");
    
    const [venues, setVenues] = useState('');
    const [email, setEmail] = useState('');
    const[choosenVenues, setChoosenVenues] = useState([]);
  
     const handleChooseVenues = () => {
        const url = "http://localhost:8080/api/venues"

        fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {
            setVenues(responseJson)
        
          })
          .catch((error) =>{
            console.error(error);
          });
    };

    const reMapChoosenVenueArray = () => {
        const newArray = [];

        const newVenues = choosenVenues.map((venue) =>{
            const newVenue = {
                name: venue.name, 
                capacity: venue.capacity, 
                placeId: venue.placeId,
                id: venue.id
            }
            newArray.push(newVenue);
        } )
        return newArray;
    }
    
   const handleSignUp = () => {

    const newUser = { emailAddress:  email,
                        venues: reMapChoosenVenueArray()   };
                        console.log(newUser);
   
    const urltest = "http://localhost:8080/api/users";

    

        fetch((urltest), {
            method: "POST",
            headers: {
                Accept: 'application/json',
            'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        });
        
   };

    
    const emailInputHandler = (email) => {
            setEmail(email);
          };
    
    const handleVenueCheckboxOn = (venue) => {
            setChoosenVenues(currentVenue => [...choosenVenues, venue] );
          };

    const handleVenueCheckboxOff = (venue) => {
        const newChoosenVenues = choosenVenues.filter(function(item) {
            return item.name !== venue.name });

        setChoosenVenues( newChoosenVenues);
           
    };

    const handleClear = () => {
        setEmail('');
    };

    
    
          

return (
    <View>
        
    <Card style={styles.signUpCard}>
        <Text>Please enter email address: </Text>
        <TextInput onChangeText={emailInputHandler} style={styles.input} value={email} ></TextInput>
        <Button title='Clear Email' onPress={handleClear}/>
        <Button color={Colors.darkAccent} title="Choose Venues" onPress={handleChooseVenues}  />

        <FlatList data={venues}
          renderItem={({item}) => 
           <VenueItem venue={item} checkOn={handleVenueCheckboxOn} checkOff={handleVenueCheckboxOff} ></VenueItem>
            }
          keyExtractor={({id}, index) => id.toString()} />

          
    </Card>
    <Card style={styles.allEventsButton}>
        <Button color={Colors.darkAccent} title="SIGN UP" onPress={()=>{handleSignUp(), props.moveButton()}}  />
        
    </Card>

    </View>
    
        
    );

};


const styles = StyleSheet.create({
    allEventsButton: {
        marginTop: 10,
        width: 200,
        maxWidth: '80%',
        alignSelf: "center",
        backgroundColor: Colors.primary
    },

    signUpCard: {
        marginTop: 10,
        width: 300,
        maxWidth: '80%',
        alignSelf: 'center', 
        alignItems: "center",
        backgroundColor: Colors.primary
        
    },

    button: {
        color: Colors.primary
    },
    input: {
        width: '80%',
        textAlign: 'center',
        height: 30,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginVertical: 10
    },
});

export default SignUpScreen;