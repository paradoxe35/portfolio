import { wait } from "./wait";

export class Queue {
  private running = false;
  private queues: (() => void)[] = [];

  private _failure_tasks = 0;
  private _success_tasks = 0;
  private _submitted_tasks = 0;

  constructor(private poolSize = 1) {}

  public get busy_workers() {
    return this.queues.length;
  }

  public get failure_tasks() {
    return this._failure_tasks;
  }

  public get success_tasks() {
    return this._success_tasks;
  }

  public get submitted_tasks() {
    return this._submitted_tasks;
  }

  private _task(func: (...params: any) => void, ...params: any[]) {
    return () => func(...params);
  }

  public task<F extends any[], T extends (...params: F) => void>(
    func: T,
    ...params: F
  ) {
    this._submitted_tasks += 1;
    this.queues.push(this._task(func, ...params));

    if (this.running === false) {
      this.running = true;
      wait(0.1).then(() => this.work());
    }
  }

  private async work() {
    const tasks = this.queues.splice(0, this.poolSize);
    if (tasks.length === 0) {
      this.running = false;
      return;
    }

    const results = await Promise.allSettled(tasks.map((fn) => fn()));
    results.forEach(({ status }) => {
      switch (status) {
        case "fulfilled":
          this._success_tasks += 1;
          break;
        case "rejected":
          this._failure_tasks += 1;
          break;
      }
    });

    this.work();
  }
}
