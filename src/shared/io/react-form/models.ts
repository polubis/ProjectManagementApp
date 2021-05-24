import { Dict, SubmitEvent } from "../form";

export type SetHandler<A extends Dict> = (values: A) => void;
export type SubmitHandler = (e?: SubmitEvent) => void;
export type ResetHandler = () => void;

export interface Handlers<A extends Dict> {
    set: SetHandler<A>;
    submit: SubmitHandler;
    reset: ResetHandler;
}