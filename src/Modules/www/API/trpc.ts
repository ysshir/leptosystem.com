import {createTRPC} from "core/TRPC/create"
import type {ContextType} from "./context";

const TRPC = createTRPC<ContextType>()

export const router    = TRPC.router;
export const procedure = TRPC.procedure;
