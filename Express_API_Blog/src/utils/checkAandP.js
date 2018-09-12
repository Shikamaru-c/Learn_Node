export default function (account, password, repassword) {
  let errorMessage
  if (!account) {
    errorMessage = '帐号不能为空 The account cannot be empty.'
  } else if (!checkAccount(account)) {
    errorMessage = '帐号不符合规则 The account does not comply with the rules.'
  } else if (password !== repassword) {
    errorMessage = '两次密码不同 Two passwords are different.'
  } else if (!checkPassword(password)) {
    errorMessage = '密码不符合规则 The password is not in accordance with the rules.'
  }
  return errorMessage
}

const accountReg = /^[a-zA-Z\-_0-9]{6,12}$/ // 大小写字母'_''-' 6-12位
const pwReg1 = /[a-zA-Z]/ // 大小写字母
const pwReg2 = /[\d\-_]/ // 有数字或者'_''-'
const pwReg3 = /^.{6,12}$/ // 长度6-12

function checkAccount (account) {
  return accountReg.test(account)
}

function checkPassword (password) {
  return pwReg1.test(password) && pwReg2.test(password) && pwReg3.test(password)
}
