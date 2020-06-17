import {
  NumberAnimation,
  ProgressAnimation,
  DeletionAnimation,
  BacktrackAnimation,
  CompletionAnimation,
} from "./animations";

class Animator {
  constructor() {
    this.delay = 100;
    this.animationQueue = [];
  }

  setDelay(delay) {
    this.delay = delay;
  }

  getDelay() {
    return this.delay;
  }

  queueNumberAnimation(value, position) {
    const animation = new NumberAnimation(value, position, this.delay);
    this.animationQueue.push(animation);
  }

  queueProgressAnimation(position) {
    const animation = new ProgressAnimation(position, this.delay);
    this.animationQueue.push(animation);
  }

  queueDeletionAnimation(position) {
    const animation = new DeletionAnimation(position, this.delay);
    this.animationQueue.push(animation);
  }

  queueBacktrackAnimation(position) {
    const animation = new BacktrackAnimation(position, this.delay);
    this.animationQueue.push(animation);
  }

  queueCompletionAnimation() {
    const animation = new CompletionAnimation(this.delay);
    this.animationQueue.push(animation);
  }

  animate() {
    for (let i = 0; i < this.animationQueue.length; i++) {
      this.animationQueue[i].animate(i);
    }
  }
}

export default new Animator();
