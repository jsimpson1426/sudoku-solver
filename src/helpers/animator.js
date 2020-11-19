import {
  NumberAnimation,
  ProgressAnimation,
  DeletionAnimation,
  BacktrackAnimation,
  CompletionAnimation,
  EnableAnimation
} from "./animations";

class Animator {
  constructor(delay) {
    this.delay = delay;
    this.animationQueue = [];
  }

  setDelay(delay) {
    this.delay = delay;
  }

  getDelay() {
    return this.delay;
  }

  disableUI = () => {
    document.getElementById("slider").disabled = true;
    document.getElementById("start").disabled = true;
    document.getElementById("new").disabled = true;
  }

  queueNumberAnimation = (value, position) => {
    const animation = new NumberAnimation(value, position, this.delay);
    this.animationQueue.push(animation);
  }

  queueProgressAnimation = (position) => {
    const animation = new ProgressAnimation(position, this.delay);
    this.animationQueue.push(animation);
  }

  queueDeletionAnimation = (position) => {
    const animation = new DeletionAnimation(position, this.delay);
    this.animationQueue.push(animation);
  }

  queueBacktrackAnimation = (position) => {
    const animation = new BacktrackAnimation(position, this.delay);
    this.animationQueue.push(animation);
  }

  queueCompletionAnimation = () => {
    const animation = new CompletionAnimation(this.delay);
    this.animationQueue.push(animation);
  }

  queueEnableAnimation = () => {
    const animation = new EnableAnimation(this.delay);
    this.animationQueue.push(animation);
  }

  animate(ani = 0) {
    if(ani){
      ani.animate(0);
    }
    else{
      for (let i = 0; i < this.animationQueue.length; i++) {
        this.animationQueue[i].animate(i);
      }
    }
  }
}

export default Animator;
