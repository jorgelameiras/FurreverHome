
const { favoritePet, unfavoritePet } = require('./src/favoritePet.js');

describe("Favorite a Pet Function", () => {
    //Testing user who is logged in looks at favorites list
    test("Favorites list", () => {
        let favoritesList = [];  // Temporary favorites list
    
        function favoritePet(user, petID) {
            if (user === "loggedInUser") {
                favoritesList.push(petID);  // Add the pet to the temp favorites list
                return { success: true };
            }
            return { success: false };
        }
    
        // Call the function with a logged-in user and a pet ID
        favoritePet("loggedInUser", "petID123");
    
        // Expect the favorites list to contain the pet ID
        expect(favoritesList).toContain("petID123");
    });    

    //Testing user who is not logged in attempts to favorite a pet
    test("Denying favorites for user not logged in", () => {
        const result = favoritePet("guestUser", "petID123");
        expect(result.message).toBe("You must log-in to favorite a pet");
    });

    //Testing user removes a pet from their favorites list
    test("Pet removed from favorites list", () => {
        const favoritesList = ["petID123"];  // Set up the initial state with the pet already in the favorites list

        function unfavoritePet(user, petID) {
            if (user === "loggedInUser") {
                const index = favoritesList.indexOf(petID);
                if (index !== -1) {
                    favoritesList.splice(index, 1);  // Remove pet from favorites
                    return { success: true, message: "Pet removed from favorites list" };
                }
            }
            return { success: false };
        }

        // Ensure the pet is initially in the favorites list
        expect(favoritesList).toContain("petID123");

        // Remove the pet from the favorites list
        unfavoritePet("loggedInUser", "petID123");

        // Verify the pet is no longer in the favorites list
        expect(favoritesList).not.toContain("petID123");
    });

});
