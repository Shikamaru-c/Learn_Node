import axios from 'axios'

export default function (article) {
  const url = '/api/v1/articles/article'
  return axios.post(url, {article}).then(res => {
    return res.data
  })
}
