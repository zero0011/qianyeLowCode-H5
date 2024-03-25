import {
  login,
  register,
  getUserInfo
} from '@/api'

const userModel = {
  /**
   * 登录
   * @param options
   * @param type
   * @returns {Promise<void>}
   */
  async doLogin(data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      login(data).then((res) => {
        // TODO: redux
        
        // resolve(res.body)
      })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default userModel;