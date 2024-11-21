// Get form elements
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('error-message');
const signoutButton = document.getElementById('signoutButton');

// Initially hide the sign out button
signoutButton.style.display = 'none';

// Handle login form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Sign in user with email and password
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Clear any error messages
        errorMessage.textContent = '';
        
        // Show success message
        errorMessage.style.color = '#4CAF50';  // Green color
        errorMessage.textContent = 'Successfully logged in!';
        
        // Clear form
        loginForm.reset();
        
    } catch (error) {
        console.error('Error:', error);
        errorMessage.style.color = '#ff4444';  // Red color
        errorMessage.textContent = error.message;
    }
}); 

// Handle sign out
signoutButton.addEventListener('click', async () => {
    try {
        await firebase.auth().signOut();
        errorMessage.style.color = '#4CAF50';
        errorMessage.textContent = 'Successfully logged out!';
    } catch (error) {
        console.error('Error signing out:', error);
        errorMessage.style.color = '#ff4444';
        errorMessage.textContent = error.message;
    }
});

// Check auth state to show/hide sign out button
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        signoutButton.style.display = 'block';
        console.log('Current user:', user.email);
    } else {
        // User is signed out
        signoutButton.style.display = 'none';
    }
});