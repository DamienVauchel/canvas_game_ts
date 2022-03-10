import AbstractCircleElement from '../model/abstract/AbstractCircleElement';

export default abstract class DistanceComputer {
    public static computeDistBetweenTwoElements (element1: AbstractCircleElement, element2: AbstractCircleElement): number {
        return Math.hypot(element1.x - element2.x, element1.y - element2.y)
    }
}
