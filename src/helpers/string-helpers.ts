export function capitalizeFirstLetter(sentence: string): string {
    if (!sentence) return sentence;

    return sentence
        .split(' ') // Divide la cadena en palabras
        .map(word => 
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Capitaliza la primera letra de cada palabra
        )
        .join(' '); // Une las palabras con espacios
}