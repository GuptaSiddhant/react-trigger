# React Trigger

Publish and listen to changes of Tiggers. Implementation of RxJs Subject.

Requires: React ^16.8 for hooks and RxJS.

## Trigger

Trigger instances can publish information and subscribe/listen to it anywhere else in the program.

_In TypeScript, Pass a PayloadType to let the Trigger know what to expect while observing._

### methods

- **publish**: Publish (set) new payload
- **suscribe**: Suscribe and listen to changes and execute a function.

### example

    import { Trigger } from "@guptasiddhant/trigger";

    // TypeScript
    type PayloadType = string;
    const myTrigger = new Trigger<PayloadType>();

    // JavaScript
    const myTrigger = new Trigger();

    // somewhere in code
    myTrigger.publish("text");

    // somewhere else in code
    myTrigger.useSubscribe((payload) => console.log(payload));
    ==or==
    useEffect(()=>{
        const sub = myTrigger.suscribe((payload) => console.log(payload))
        return () => sub.unsubscribe();
    }

## useTrigger

Hook to listen to changes of Tiggers (multiple)

### params

- **execute**: Function to run on Trigger
- **deps**: Array of Triggers to listen to.

### example

    useTrigger((payload) => console.log(payload), [Trigger])

    === or ===

    useTrigger((payload) => console.log(payload), [Trigger1, Trigger2])
