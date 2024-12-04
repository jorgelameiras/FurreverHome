
const { forgotPassword, resetPassword } = require('./src/forgotPassword.js');


describe("Forgot Password Function", () => {
    //Testing password reset attempt where the email entered does not match an existing account
    test("Unsuccessful - Email does not match existing account", () => {
        const result = forgotPassword("nonexistent@example.com");
        expect(result.message).toBe("The email entered does not match an existing account");
    });

    //Testing password reset attempt where the email is valid but the password only meets 1 requirement
    test("Unsuccessful - password meets only 1 requirement", () => {
        const result = resetPassword("existingEmail@example.com", "weak1");
        expect(result.message).toBe("Password does not meet all requirements");
    });

    //Testing password reset attempt where the email is valid but the password only meets 2 requirements
    test("Unsuccessful - password meets only 2 requirements", () => {
        const result = resetPassword("existingEmail@example.com", "WeakPass1");
        expect(result.message).toBe("Password does not meet all requirements");
    });

    //Testing password reset attempt where the email is valid but the password only meets 3 requirements
    test("Unsuccessful - password meets only 3 requirements", () => {
        const result = resetPassword("existingEmail@example.com", "WeakPass!");
        expect(result.message).toBe("Password does not meet all requirements");
    });
    //Testing password reset attempt where the email is valid and the password meets all requirements
    test("Successful - all requirements met", () => {
        const result = resetPassword("existingEmail@example.com", "StrongPass1!");
        expect(result.success).toBe(true);
        expect(result.message).toBe("Password is reset");
    });
});
