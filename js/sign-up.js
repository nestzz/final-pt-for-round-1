// Get form elements
const signupForm = document.getElementById('signupForm');
const errorMessage = document.getElementById('error-message');
const signoutButton = document.getElementById('signoutButton');

// Initially hide the sign out button
signoutButton.style.display = 'none';

// Handle form submission
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Create user with email and password
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Update user profile with username
        await user.updateProfile({
            displayName: username
        });

        // Clear any error messages
        errorMessage.textContent = '';
        
       
        
    } catch (error) {
        console.error('Error:', error);
        
        // Check if error is due to existing email
        if (error.code === 'auth/email-already-in-use') {
            errorMessage.textContent = 'This email is already registered. Redirecting to login page...';
            errorMessage.style.color = '#4a9eff'; // Make it blue to look less like an error
            
            // Redirect to login page after 2 seconds
            setTimeout(() => {
                window.location.href = '../pages/login.html';
            }, 2000);
        } else {
            // Handle other errors normally
            errorMessage.textContent = error.message;
            errorMessage.style.color = '#ff4444'; // Red for actual errors
        }
    }
}); 

// Handle sign out
signoutButton.addEventListener('click', async () => {
    try {
        await firebase.auth().signOut();
    } catch (error) {
        console.error('Error signing out:', error);
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