import request from '@/utils/request'

const IndexRequestApi = {
  /**
   * 获取页面列表
   * @param model
   */
  getUserInfo: function(model) {
    return request({
      url: '/api/user/info',
      method: 'get',
      params: model
    })
  }
}

export default IndexRequestApi
