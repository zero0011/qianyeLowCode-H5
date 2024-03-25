import {
  login,
  register,
  getUserInfo
} from '@/api'
import store from '@/redux/store';

const userModel = {
  /**
	 * 检测是否登录
	 * @returns {Promise<boolean>}
	 */
	async checkLoginState(): Promise<boolean> {
    const state = store.getState();
		let userData = state.user;
		return !!userData.access_token
	},
  /**
   * 登录
   * @param options
   * @param type
   * @returns {Promise<void>}
   */
  async doLogin(data: any): Promise<void> {
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
	 * @returns {Promise<void>}
	 */
	async doRegister(data: any): Promise<void> {
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
	},
  /**
	 * 退出
	 * @returns {Promise<void>}
	 */
	async doLogout(): Promise<void> {
		// 清除store user token
		window.sessionStorage.setItem('beforeLoginUrl', '');
		userModel.goLogin()
	},
  /**
	 * 跳转登录
	 * @returns {Promise<void>}
	 */
	async goLogin() {
		// 将路由fullpath 保存在缓存中，用于登录完成后跳转
		let indexOf = window.location.href.indexOf('#/')
		let currentUrl = window.location.href.slice(indexOf + 1, window.location.href.length);
		window.sessionStorage.setItem('beforeLoginUrl', currentUrl);
    // TODO: 路由跳转
		// router.push({name: 'Login'})
	},
  async goBeforeLoginUrl(){
		let url = window.sessionStorage.getItem('beforeLoginUrl');
		if (!url || url.indexOf('/login') != -1) {
      // TODO: 路由跳转
			// router.push('/');
		} else {
      // TODO: 路由跳转
			// router.push(url);
			window.sessionStorage.setItem('beforeLoginUrl', '');
		}
	}
}

export default userModel;