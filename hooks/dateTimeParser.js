const parser = (data) => {
  var date = new Date(data)
  var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  var month =
    date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  switch (month) {
    case '01':
      month = 'Ocak'
      break
    case '02':
      month = 'Şubat'
      break
    case '03':
      month = 'Mart'
      break
    case '04':
      month = 'Nisan'
      break
    case '05':
      month = 'Mayıs'
      break
    case '06':
      month = 'Haziran'
      break
    case '07':
      month = 'Temmuz'
      break

    case '08':
      month = 'Ağustos'
      break
    case '09':
      month = 'Eylül'
      break
    case '10':
      month = 'Ekim'
      break
    case '11':
      month = 'Kasım'
      break
    case '12':
      month = 'Aralık'
      break

    default:
      break
  }
  var year = date.getFullYear()
  var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  var min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  var sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  var time = day + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec
  return time
}
export default parser
