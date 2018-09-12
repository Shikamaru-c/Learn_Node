import axios from 'axios'

export default function (user) {
  const url = '/api/v1/user/login'
  return axios.post(url, { user }).then(res => {
    return res.data
  })
}
