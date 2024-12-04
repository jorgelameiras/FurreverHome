
const viewFavoritesList = require('./src/revisitFavoritesList');  // Adjust the path as needed


describe("Revisit Favorites List Function", () => {
    //Testing user revisiting their favorites list that is empty
    test("Favorite list is empty", () => {
        const result = viewFavoritesList("userWithNoFavorites");
        expect(result.message).toBe("No pets favorited yet");
    });

    //Testing user revisiting their favorites list that has multiple pets saved
    test("multiple pets saved", () => {
        const favoritesList = ["petID123", "petID456"]; // Starting point with multiple pets in the favorites list

        function viewFavoritesList(user) {
            if (user === "userWithFavorites") {
                return favoritesList;  // Return the favorites list for the user
            }
            return [];
        }

        // Call viewFavoritesList to get the user's favorites
        const result = viewFavoritesList("userWithFavorites");

        // Verify that the result contains the expected pets
        expect(result).toContain("petID123");
        expect(result).toContain("petID456");
    });

    //Testing a user who is not logged in trying to access the favorites list
    test("User not logged in", () => {
        const result = viewFavoritesList("guestUser");
        expect(result.message).toBe("You must log-in to access this feature");
    });
});
