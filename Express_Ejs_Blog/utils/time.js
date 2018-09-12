module.exports = function time() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const date = now.getDate()
  const hour = now.getHours()
  const minutes = now.getMinutes() + 1
  const time = `${year}年${month}月${date}日${hour}时${minutes}分`
  return time
}