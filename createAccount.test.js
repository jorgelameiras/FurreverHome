
const createAccount = require('./src/createAccount.js');

describe("Create Account Function", () => {
    //Testing valid passwords, but invalid email
    test("Account not created - Invalid email", () => {
        const result = createAccount("invalidEmail", "ValidPassword1!", "ValidPassword1!");
        expect(result.success).toBe(false);
    });
    //Testing valid email, but password meets only 1 requirement
    test("Account not created - invalid password 1", () => {
        const result = createAccount("validEmail@example.com", "password", "password");
        expect(result.success).toBe(false);
    });
    //Testing valid email, but password meets only 2 requirements
    test("Account not created - invalid password 2", () => {
        const result = createAccount("validEmail@example.com", "Password1", "Password1");
        expect(result.success).toBe(false);
    });
    //Testing valid email, but password meets only 3 requirements
    test("Account not created - invalid password 3", () => {
        const result = createAccount("validEmail@example.com", "Password!", "Password!");
        expect(result.success).toBe(false);
    });
    //Testing valid email, password meets all 4 requirements, but confirm password does not match
    test("Account not created - confirm password does not match", () => {
        const result = createAccount("validEmail@example.com", "ValidPassword1!", "MismatchPassword1!");
        expect(result.success).toBe(false);
    });
    //Testing valid email, password meets all 4 requirements, and confirm password matches
    test("Successful account creation", () => {
        const result = createAccount("validEmail@example.com", "ValidPassword1!", "ValidPassword1!");
        expect(result.success).toBe(true);
    });
});
