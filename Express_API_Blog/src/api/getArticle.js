import axios from 'axios'

export default function (id) {
  const url = `/api/v1/articles/article/${id}`
  return axios.get(url).then(res => {
    return res.data
  })
}
