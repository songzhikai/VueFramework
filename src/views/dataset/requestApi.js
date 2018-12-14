import request from '@/utils/request'
import jquery from '@/utils/JqueryAjax'

const DatasetService = {
  /**
   * 获取所有数据
   * @param model
   */
  getDataListByAjax: function(model) {
    return jquery.ajax({
      type: 'post',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(model),
      url: process.env.BASE_API + '/api/query/data/' + model.version
    })
  },
  /**
   * 获取数据集目录列表
   * @param model
   */
  getDataList: function(model) {
    return request({
      url: '/api/dataset/getDataList',
      method: 'post',
      params: model
    })
  }
}

export default DatasetService
