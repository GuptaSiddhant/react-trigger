import { Subject } from "rxjs";
import { useEffect } from "react";

/**
 * Implementation of RxJs Subject
 * @author Siddhant Gupta <me@guptasiddhant.com>
 * @description Pass a PayloadType to let the Trigger know what to expect while observing.
 * @method publish Publish (set) new payload
 * @method suscribe Suscribe and listen to changes and execute a function.
 * @example
 * type PayloadType = string;
 * const myTrigger = new Trigger<PayloadType>();
 * ------
 * myTrigger.publish("Item");
 * ------
 * myTrigger.useSubscribe((payload) => console.log(payload));
 * --or--
 * useEffect(()=>{
 *  const sub = myTrigger.suscribe((payload) => console.log(payload))
 *  return () => sub.unsubscribe();
 * })
 */
export class Trigger<D> {
  private _subject: Subject<D>;
  constructor() {
    this._subject = new Subject<D>();
  }
  /**
   * Publish (set) new payload to the trigger
   * @param {D} payload Data to send/set
   * @example
   * myTrigger.publish("Item");
   */
  publish = (payload: D) => this._subject.next(payload);

  /**
   * Suscribe and listen to changes to a trigger and execute a function.
   * Needs to be unsubscribed. Otherwise use useSubscribe.
   * @param {Function} execute Function to execute (receives payload as argument)
   * @example
   * useEffect(()=>{
   *  const sub = myTrigger.suscribe((payload) => console.log(payload))
   *  return () => sub.unsubscribe();
   * })
   */
  subscribe = (execute: (payload: D) => any) =>
    this._subject.subscribe(execute);

  /**
   * Hook to Suscribe and listen to changes and execute a function.
   * It manages subscribtions and unsubscribtions.
   * Can only be used inside component or other Hook.
   * @param {Function} execute Function to execute (receives payload as argument)
   * @example
   * myTrigger.useSubscribe((payload) => console.log(payload));
   */
  useSubscribe = (execute: (payload: D) => any) => {
    useEffect(() => {
      const sub = this._subject.subscribe(execute);
      return () => sub.unsubscribe();
    }, []);
  };
}

/**
 * Hook to listen to changes of Tiggers (without Topic).
 * @author Siddhant Gupta <me@guptasiddhant.com>
 * @param execute Function to run on Trigger
 * @param deps Array of Triggers to listen to.
 * @example
 * useTrigger((payload) => console.log(payload), [Trigger])
 * @example
 * useTrigger((payload) => console.log(payload), [Trigger1, Trigger2])
 */
export const useTrigger = (
  execute: (payload: any) => any,
  deps: Trigger<any>[]
) => deps.map(dep => dep.useSubscribe(execute));

export default useTrigger;
