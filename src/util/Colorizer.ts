export default abstract class Colorizer {
    public static randomColor(): string {
        return `hsl(${Math.random() * 360}, 50%, 50%)`;
    }
}
