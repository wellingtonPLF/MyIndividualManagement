
export function IncrementAction (value?: number){
    return {
        type: 'increment',
        payload: value
    }
}

export function DecrementAction (value?: number){
    return {
        type: 'decrement',
        payload: value
    }
}
