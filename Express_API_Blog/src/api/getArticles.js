import axios from 'axios'

export default function () {
  const url = '/api/v1/articles'
  return axios.get(url).then(res => {
    return res.data
  })
}
