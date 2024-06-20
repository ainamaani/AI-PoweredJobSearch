
// function to generate 6-digit verification code
const generateResetPasswordCode = () => {
    const min = 100000; // The minimum 6-digit number (100000)
    const max = 999999; // The maximum 6-digit number (999999)
    // Generate a random number between min and max (inclusive)
    const passwordResetCode = Math.floor(Math.random() * (max - min + 1)) + min;
    // Convert the number to a string and return it
    return passwordResetCode.toString();

}


export default generateResetPasswordCode;