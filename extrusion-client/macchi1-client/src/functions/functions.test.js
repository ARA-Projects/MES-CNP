const { currentTime } = require("./functions");

test("currentTime returns the current time in the Africa/Tunis time zone", () => {
    // Arrange
    const now = new Date();
    const mockDate = jest.spyOn(global, "Date").mockImplementation(() => now);

    // Act
    const result = currentTime();

    // Assert
    expect(result).toEqual(
        now.toLocaleString("en-US", { timeZone: "Africa/Tunis" })
    );
    expect(mockDate).toHaveBeenCalledWith(
        now.toLocaleString("en-US", { timeZone: "Africa/Tunis" })
    );
});
