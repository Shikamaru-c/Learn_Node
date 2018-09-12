import axios from 'axios'

export default function (id) {
  const url = `/api/v1/user`
  return axios.delete(url).then(res => {
    return res.data
  })
}
