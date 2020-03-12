<template>
    <div class="list">
        <!-- 头部搜索 -->
        <header>
            <Button class="chooseDep">选择医疗机构</Button>
            <div class="filter-part">
                <div class="filter-item">
                  <label>医疗机构名称：</label>
                  <div class="content">{{depInfo.name}}</div>
                </div>
            </div>
            <div class="fun-part">
                <i-button type="primary">选择药品目录</i-button>
            </div>
        </header>
        <!-- 列表 -->
        <div class="table">
            <Table
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
        </div>
    </div>
</template>

<script>
import api from "@/api/commonApi";
const filterObj = {
    pageNo: 1,
    pageSize: 10,
}
export default {
  data() {
    return {
      filterObj: this.deepClone(filterObj),
      count: 0,
      loading: false,
      columns: [
        {type: 'index', title: '序号', width: 60, align: 'center'},
        { title: "医疗机构名称", key: "hospitalName", align: "center"},
        { title: "地址", key: "hosAddr", align: "center"},
        { title: "联系电话", key: "linkmanTelephone", align: "center"},
        {
          title: "操作",
          key: "operate",
          width: 320,
          align: "center",
          render: (h, params) => {
              return h('div',[
                      h('Button', {
                          props: {
                              type: 'primary',
                              size: 'small'
                          },
                          style: {
                              margin: '0px 6px'
                          },
                          on: {
                              click: () => {
                                  this.handleReview(params)
                              }
                          }
                      }, '查看对照结果'),
                      h('Button', {
                          props: {
                              size: 'small'
                          },
                          style: {
                              margin: '0px 6px'
                          },
                          on: {
                              click: () => {
                                  this.handleEdit(params)
                              }
                          }
                      }, '重新对照'),
                      h('Button', {
                          props: {
                              size: 'small'
                          },
                          style: {
                              margin: '0px 6px',
                          },
                          on: {
                              click: () => {
                                  this.handleRemove(params)
                              }
                          }
                      }, '删除对照结果')
              ]);
          }
        },
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
    // this.findKbaoHospitalDrugDtoPage();
  },
  methods: {
      changePage(index) {
          this.filterObj.pageNo = index;
        //   this.findKbaoHospitalDrugDtoPage();
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
        .filter-part {
            display: flex;
            flex-wrap: wrap;
            .filter-item {
                display: flex;
                margin: 10px 10px 10px 0;
                label {
                    white-space: nowrap;
                    line-height: 32px;
                    width: 100px;
                    text-align: right;
                }
                .input {
                    width: 220px;
                }
                .select {
                    width: 70px;
                }
            }
            .filter-btn-group {
                margin: 10px 10px 10px 0;
                flex: 0 0 auto;
            }
        }
        .fun-part {
            margin-top: 15px;
            margin-bottom: 10px;
            a {
                vertical-align: bottom;
            }
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