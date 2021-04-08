/**
 * Generates a random hex color
 * @returns Randomly generated hex color as a string
 */
export default function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let generatedColor = "#";

    for(let i = 0; i < 6; i++) {
        let randomLetter = Math.floor(Math.random() * 16);
        generatedColor += letters[randomLetter];
    }

    return generatedColor;
}