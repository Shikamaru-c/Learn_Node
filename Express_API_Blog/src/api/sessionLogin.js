import axios from 'axios'

export default function (user) {
  const url = '/api/v1/user/login'
  return axios.get(url).then(res => {
    return res.data
  })
}
