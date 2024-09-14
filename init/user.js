async function insertUsers() {
    try {
        await User.insertMany([
            {
                username: 'alice_wonder',
                email: 'alice.wonder910@gmail.com',
                password: 'AliceWon@123',
                profilePicture: 'https://example.com/profiles/alice.jpg',
                role: 'user',
            },
            {
                username: 'bob_builder',
                email: 'bob.builder@example.com',
                password: 'hashed_password_bob456',
                profilePicture: 'https://example.com/profiles/bob.jpg',
                role: 'user',
            },
            {
                username: 'charlie_brown',
                email: 'charlie.brown@example.com',
                password: 'hashed_password_charlie789',
                profilePicture: 'https://example.com/profiles/charlie.jpg',
                role: 'user',
            },
            {
                username: 'daisy_duke',
                email: 'daisy.duke@example.com',
                password: 'hashed_password_daisy012',
                profilePicture: 'https://example.com/profiles/daisy.jpg',
                role: 'user',
            },
            {
                username: 'edward_snow',
                email: 'edward.snow@example.com',
                password: 'hashed_password_edward345',
                profilePicture: 'https://example.com/profiles/edward.jpg',
                role: 'user',
            }
        ]);
        console.log("Users inserted successfully!");
    } catch (error) {
        console.error("Error inserting users:", error);
    }
}

insertUsers();
