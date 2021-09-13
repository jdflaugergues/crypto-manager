class CronJobManager {
  constructor(intervalTime, job) {
    this.intervalTime = intervalTime * 1000
    this.intervalId = undefined
    this.job = job
  }

  start(startImmediately = true) {
    if (startImmediately) {
      this.job()
    }
    this.intervalId = setInterval(this.job, this.intervalTime)
  }
  stop() {
    clearInterval(this.intervalId)
  }
  updateInterval(intervalTime) {
    this.stop()
    this.intervalTime = intervalTime * 1000
    this.start()
  }
}

module.exports = CronJobManager
