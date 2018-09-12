import axios from 'axios'

export default function (article, id) {
  const url = `/api/v1/articles/article/${id}`
  return axios.put(url, { article }).then(res => {
    return res.data
  })
}
