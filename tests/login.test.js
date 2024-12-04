
const login = require('./src/login.js');

describe("Login Function", () => {
    //Testing login attempt where the account with the entered email exists, but the password is incorrect
    test("Unsuccessful login - incorrect password", () => {
        const result = login("existingEmail@example.com", "wrongPassword");
        expect(result.success).toBe(false);
    });

    //Testing login attempt where the account with the entered email exists, but no password is entered
    test("Unsuccessful login - no password provided", () => {
        const result = login("existingEmail@example.com", "");
        expect(result.success).toBe(false);
    });

    //Testing login attempt where the account with the entered email exists, and the password is correct
    test("Successful login - Account exists, correct password", () => {
        const result = login("existingEmail@example.com", "correctPassword");
        expect(result.success).toBe(true);
    });

    //Testing login attempt where no account matches the entered email, and the password does not match any existing accounts
    test("Unsuccessful login - Nonexistent account, incorrect password", () => {
        const result = login("invalidEmail@example.com", "randomPassword");
        expect(result.success).toBe(false);
    });

    //Testing login attempt where no email or password is entered
    test("Unsuccessful login - Nonexistent account, no password", () => {
        const result = login("", "");
        expect(result.success).toBe(false);
    });

    //Testing login attempt where the no account matches the entered email, but the password matches one for another account
    test("Unsuccessful login - Nonexistent account, correct password for another account", () => {
        const result = login("invalidEmail@example.com", "correctPassword");
        expect(result.success).toBe(false);
    });
});

