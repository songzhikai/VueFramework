const dataset = {
  state: {
    pageState: 'new', //new 新建 、 edit编辑 、 详情
    basicId: '',
    version: 0,
    name: '',
    nameZh: '',
    datasetDescs: '',
    nodeMetaData: { node: [], link: [] },
    connectTableFields: {}, // {connectId_tableName: [{data_type: '', name: ''}]}
    realtimeQuery:false,
    onlyShowRepeatField:false,
    showHiddenField:false,
    repeatFieldCount:0,
    filterFields:[],   //表头文本框输入的字段，表名
    isRowModeDisabled:false,
    datasetQueryTime:0
  },
  mutations: {
    setEpmToken(state,token){
      state.epmToken = token;
    },
    setOnlyShowRepeatField(state,val){
      state.onlyShowRepeatField = val;
    },
    setShowHiddenField(state,val){
      state.showHiddenField = val;
    },
    setRealtimeQuery(state,val){
      state.realtimeQuery = val;
    },
    setRepeatFieldCount(state,val){
      state.repeatFieldCount = val;
    },
    editNodeMetaData(state, nodeMetaData) {
      state.nodeMetaData = nodeMetaData
    },
    setRowModeDisabled(state, val) {
      state.isRowModeDisabled = val
    },
    setDatasetQueryTime(state, time) {
      state.datasetQueryTime = time
    },
    editDatasetMetaData(state, obj) {
      state.basicId = obj.basicId
      state.version = obj.version
      state.name = obj.name
      state.nameZh = obj.nameZh
      state.datasetDescs = obj.datasetDescs
      state.nodeMetaData = obj.nodeMetaData
    },
    editConnectTableFields(state, obj) {
      state.connectTableFields[obj.key] = obj.value
    },
    storeDatasetBasicInfo(state, obj){
      state.basicId = obj.basicId
      state.version = obj.version
      state.name = obj.name
    },
    saveDatasetNameZhAndDescs(state, obj){
      state.nameZh = obj.nameZh
      state.datasetDescs = obj.datasetDescs
    },
    connectTableFieldsReback(state, obj){
      state.connectTableFields = obj
    },
    initCreateDatasetStore(state, obj){
      state.basicId = obj.basicId;
      state.version = obj.version
      state.name = obj.name
      state.nameZh = ''
      state.datasetDescs = ''
      state.nodeMetaData = { node: [], link: [] }
      state.connectTableFields = {}
    },
    updatePageState(state, obj){
      state.pageState = obj.pageState
    },
    setFilterFields(state,val){
      state.filterFields = val;
    }
  }
  ,
  // actions: {
  //   toggleSideBar({ commit }) {
  //     commit('TOGGLE_SIDEBAR')
  //   }
  // }
}

export default dataset
