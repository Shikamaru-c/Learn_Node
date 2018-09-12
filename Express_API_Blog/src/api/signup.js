import axios from 'axios'

export default function (user) {
  const url = '/api/v1/user/signup'
  return axios.post(url, {user}).then(res => {
    return res.data
  })
}
