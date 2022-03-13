import { IMovement } from "./domain/movement";

export interface IMovementRepository {
    find(id: number): Promise<IMovement | null>;
    all(): Promise<IMovement[]>;
    store(entry: IMovement): Promise<void>;
    update(entry: IMovement): Promise<void>;
    remove(id: number): Promise<void>;
}