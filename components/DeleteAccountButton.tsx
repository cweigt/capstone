import { Alert, TouchableOpacity, Text } from "react-native";
// import { useAuth } from '@/context/AuthContext';
import { deleteUser, getAuth } from "firebase/auth";
import { getDatabase, ref, remove } from "firebase/database";
import { AccountStyles as styles } from '@/styles/Account.styles';
// import { auth } from '@/firebase';

const DeleteAccountButton = () => {
    const auth = getAuth();
    const database = getDatabase();

    const handleDeleteAccount = async () => {
        const user = auth.currentUser;
    
        if (!user) return;
    
        try {
          const userId = user.uid;
    
          // delete saved articles
          const savedRef = ref(database, `users/${user.uid}/savedArticles`);
          await remove(savedRef);
    
          // delete profile picture
          const profilePictureRef = ref(database, `users/${user.uid}/photoURL`);
          await remove(profilePictureRef)
    
          // Delete Firebase Authentication account (I believe this should include email, 
          // password hash, OAuth credentials)
          await deleteUser(user);
    
          // Optionally redirect to login screen
        } catch (error: any) {
          if (error.code === 'auth/requires-recent-login') { // chatGPT suggested handling this error code
            Alert.alert('Error', 'Please log in again to delete your account.');
          } else {
            Alert.alert('Error', error.message);
          }
        }
      };
    
      // delete confirmation function
      const confirmDelete = () => {
        Alert.alert(
          'Delete Account',
          'Are you sure you want to delete your account and all associated data? This action cannot be undone.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: handleDeleteAccount },
          ]
        );
      };
    
    return (
        <TouchableOpacity
        onPress={() => {
            confirmDelete();
        }}
        style={{ alignItems: 'center', paddingTop: 40 }}
    >
        <Text style={styles.deleteAccount}>Delete Account</Text>
        </TouchableOpacity>
    );
  }
  
  export default DeleteAccountButton; 