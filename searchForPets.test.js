
const searchForPets = require('./src/searchForPets.js');


describe("Search for Pets Function", () => {
    //Testing browsing with no filters applied
    test("Search with no filters applied", () => {
        const result = searchForPets({});
        expect(result.petsDisplayed).toBe("All pets displayed");
    });

    //Testing searching with the breed filter
    test("Search with breed filter", () => {
        const result = searchForPets({ breed: "Labrador" });
        expect(result.petsDisplayed).toBe("Pets that satisfy the breed filter displayed");
    });

    //Testing searching with the age filter applied
    test("Search with age filter", () => {
        const result = searchForPets({ age: "Puppy" });
        expect(result.petsDisplayed).toBe("Pets that satisfy the age filter displayed");
    });

    //Testing searching with the gender filter applied
    test("Search with gender filter", () => {
        const result = searchForPets({ gender: "Female" });
        expect(result.petsDisplayed).toBe("Pets that satisfy the gender filter displayed");
    });

    //Testing searching with the size filter applied
    test("Search with size filter", () => {
        const result = searchForPets({ size: "Medium" });
        expect(result.petsDisplayed).toBe("Pets that satisfy the size filter displayed");
    });

    //Testing searching with the vaccinatoin status filter applied
    test("Search with vaccination status filter", () => {
        const result = searchForPets({ vaccinated: true });
        expect(result.petsDisplayed).toBe("Pets that satisfy the vaccination status filter displayed");
    });

    //Testing searching with multiple filters applied
    test("Search with multiple filters applied", () => {
        const result = searchForPets({ breed: "Labrador", age: "Adult", gender: "Male" });
        expect(result.petsDisplayed).toBe("Pets that satisfy the filters applied displayed");
    });
});
