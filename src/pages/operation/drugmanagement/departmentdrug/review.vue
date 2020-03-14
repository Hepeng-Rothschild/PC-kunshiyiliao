<template>
    <div class="list">
        <!-- 头部搜索 -->
        <header>
            <div class="filter-part">
                <div class="filter-item" v-for="(item, index) in hospitalInfo">
                  <label>{{item.label}}</label>
                  <div class="content">{{item.content}}</div>
                </div>
            </div>
            <div class="result-text">
                对照结果：
            </div>
        </header>
        <!-- 列表 -->
        <div class="table">
            <Table
                border
                size="small" 
                :columns="columns" 
                :data="data"
                :loading="loading"
                no-data-text="未查询到符合条件的记录"
                stripe>

            </Table>
                
            <div class="page-wrapper">
                <div class="des">
                    显示第{{filterObj.pageSize * (filterObj.pageNo - 1) + 1}}到第{{filterObj.pageSize * filterObj.pageNo}}条记录，总共{{count}}条记录 每页显示
                    <i-select class="select" v-model.trim="filterObj.pageSize" placeholder="请输入在用状态">
                        <i-option value="10">10</i-option>
                        <i-option value="20">20</i-option>
                        <i-option value="50">50</i-option>
                    </i-select>
                    条记录
                </div>
                <Page
                    :total="count"
                    :current="filterObj.pageNo"
                    :page-size="filterObj.pageSize"
                    @on-change="changePage"
                    class="pages"
                />
            </div>
            <div class="back-wrapper" style="textAlign: center;margin: 20px">
                <Button style="width: 100px" @click="handleBackPage" type="primary">返回上一页</Button>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/api/commonApi";

export default {
  data() {
    const id = Number(this.$route.params.id);
    return {
      count: 0,
      loading: false,
      filterObj: {
        hospitalId: id,
        pageNo: 1,
        pageSize: '10',
      },
      hospitalInfo: [
          {label: '医疗机构ID：',content: id},
          {label: '医疗机构名称：',content: this.$route.query.hospitalName},
          {label: '联系电话：',content: this.$route.query.linkmanTelephone},
          {label: '地址：',content: this.$route.query.hosAddr},
      ],
      columns: [
        {type: 'index', title: '序号', width: 60, align: 'center'},
        { title: "医疗机构药品ID", key: "id", align: "center"},
        { title: "医疗机构药品编码", key: "hisCode2", align: "center"},
        { title: "标准库药品编码", key: "standardCode", align: "center"},
        { title: "医疗机构药品通用名", key: "ypmc", align: "center"},
        { title: "标准库药品通用名", key: "standardYpmc", align: "center"},
        { title: "医疗机构剂型", key: "ypjx", align: "center"},
        { title: "标准库剂型", key: "standardYpjx", align: "center"},
        { title: "医疗机构规格", key: "ypgg", align: "center"},
        { title: "标准库规格", key: "standardYpgg", align: "center"},
        { title: "医疗机构批准文号", key: "pzwh", align: "center"},
        { title: "标准库批准文号", key: "standardPzwhd", align: "center"},
        { title: "医疗机构厂家", key: "scqymc", align: "center"},
        { title: "标准库厂家", key: "standardScqymc", align: "center"},
        { title: "对照结果", key: "compareResult", align: "center"},
        // {
        //   title: "操作",
        //   key: "operate",
        //   width: 320,
        //   align: "center",
        //   render: (h, params) => {
        //       return h('div',[
        //               h('Button', {
        //                   props: {
        //                       type: 'primary',
        //                       size: 'small'
        //                   },
        //                   style: {
        //                       margin: '0px 6px'
        //                   },
        //                   on: {
        //                       click: () => {
        //                           this.handleReview(params)
        //                       }
        //                   }
        //               }, '查看对照结果'),
        //               h('Button', {
        //                   props: {
        //                       size: 'small'
        //                   },
        //                   style: {
        //                       margin: '0px 6px'
        //                   },
        //                   on: {
        //                       click: () => {
        //                           this.handleEdit(params)
        //                       }
        //                   }
        //               }, '重新对照'),
        //               h('Button', {
        //                   props: {
        //                       size: 'small'
        //                   },
        //                   style: {
        //                       margin: '0px 6px',
        //                   },
        //                   on: {
        //                       click: () => {
        //                           this.handleRemove(params)
        //                       }
        //                   }
        //               }, '删除对照结果')
        //       ]);
        //   }
        // },
      ],
      data: [],
      depInfo: {}
    }
  },
  created() {
      let breadList = [
          { path: "/index", title: "首页" },
          {
              path: "",
              title: "药品目录管理"
          },
          {
              path: "/index/operation/drugmanagement/departmentdrug/list",
              title: "医疗机构药品目录对照"
          }
      ];
      this.$emit("changeBreadList", breadList);
  },
  mounted() {
      console.log(this)
    this.findDrugContrastPage();
  },
  methods: {
      handleBackPage() {
        this.functionJS.queryNavgationTo(this, `/index/operation/drugmanagement/departmentdrug/list`, {
        });
      },
      findDrugContrastPage() {
          this.loading = true;
            console.log(this.filterObj)
          this.$axios.post(api.findDrugContrastPage, this.filterObj).then(res => {
              this.loading = false;
              if (res.data.code === 1) {
                  const ret = res.data.object.list;
                  this.data = ret || [];
                  this.count = res.data.object.count;
                  if (!ret || !ret.length) {
                      this.$Message.info('未查询到符合条件的记录')
                  }
              } else {
                  this.$Message.error('请求异常');
                  return false;
              }
          }).catch(() => {
              this.loading = false;
          });
      },
      changePage(index) {
          this.filterObj.pageNo = index;
          this.findDrugContrastPage();
      },
      deepClone(obj) {
          return JSON.parse(JSON.stringify(obj))
      }
  }
}
</script>

<style scoped lang="less">
.list {
    width: 98%;
    min-width: 1200px;
    padding: 10px;
    margin-left: 1%;
    margin: 0 auto;
    background: #fff;
    header {
        width: 100%;
        font-weight: 600;
        .filter-part {
            display: flex;
            flex-wrap: wrap;
            .filter-item {
                display: flex;
                margin: 10px 10px 10px 0;
                line-height: 32px;
                &:first-child {
                    label {
                        width: auto;
                    }
                }
                label {
                    white-space: nowrap;
                    width: 120px;
                    text-align: right;
                }
            }
            .filter-btn-group {
                margin: 10px 10px 10px 0;
                flex: 0 0 auto;
            }
        }
        .result-text {
            margin-bottom: 10px;
        }
    }
    .table {
        .page-wrapper {
            display: flex;
            margin-top: 20px;
            justify-content: space-between;
            .des {
                display: flex;
                align-items: center;
                .select {
                    width: 50px;
                }
            }
        }
    }
}
</style>