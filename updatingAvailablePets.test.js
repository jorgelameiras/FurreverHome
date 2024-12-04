
const { removeAdoptedPet, checkPetExists, favoritePet, getUserFavorites } = require('./src/updatingAvailablePets');


describe("Updating List of Available Pets Function", () => {
    //Testing that a pet that has been removed from the system is no longer visible
    test("A pet is removed from the system", () => {
        removeAdoptedPet("petID123");
        const result = checkPetExists("petID123");
        expect(result.exists).toBe(false);
    });
    
    //Testing that a pet that has been removed from the system is no longer visible in a user's favorites list
    test("favorite list updates when a pet is removed", () => {
        // Simulate user favoriting a pet
        favoritePet("loggedInUser", "petID123");
        
        // Simulate pet adoption and removal
        removeAdoptedPet("petID123");
        
        // Check that the pet is no longer in the user's favorite list
        const favorites = getUserFavorites("loggedInUser");
        expect(favorites.includes("petID123")).toBe(false);
    });
    
});
