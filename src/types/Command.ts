import Action from "./Action";

export default interface Command {
    action: Action,
    params: string[]
}