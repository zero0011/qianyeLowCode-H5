import {
  login,
  register,
  getUserInfo
} from '@/api'
import store from '@/redux/store';

const userModel = {
  /**
	 * 检测是否登录
	 * @returns {boolean}
	 */
	checkLoginState(): boolean {
    const state = store.getState();
		let userData = state.user;
		return !!userData.access_token
	},
  /**
   * 登录
   * @param options
   * @param type
   * @returns {Promise<any>}
   */
  async doLogin(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      login(data).then((res:any) => {
        resolve(res.body)
      })
        .catch(err => {
          reject(err)
        })
    })
  },
  /**
	 * 注册
	 * @param options
	 * @param type
	 * @returns {Promise<any>}
	 */
	async doRegister(data: any): Promise<any> {
		return new Promise((resolve, reject) => {
			register(data).then((res: any) => {
				resolve(res.body)
			})
				.catch(err => {
					reject(err)
				})
		})
	},
  /**
	 * 获取用户信息
	 * @returns {Promise<void>}
	 * @private
	 */
	getUserInfo(): Promise<void> {
		return new Promise((resolve, reject) => {
			getUserInfo().then((res: any) => {
				resolve(res.body)
			}).catch(err => {
				reject(err)
			})
		})
	}
}

export default userModel;