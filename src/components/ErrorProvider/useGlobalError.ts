import {inject} from "vue";
import type {Ref} from "vue";

export const useGlobalError = () => {
    const error = inject<Ref<Error|null>>('globalError')
    const setError = inject<(err: Error | null) => void>('setGlobalError')
    return {error,setError}
}