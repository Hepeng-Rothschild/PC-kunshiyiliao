<template>
    <div class="dictionary">
        <Tree :data="dictionaryList" :load-data="loadData" :render="renderContent"></Tree>
        <Modal
            :title="'修改“'+oldVal+'”:'"
            @on-ok="renameSure"
            :loading="loading"
            @on-cancel="renameNotSure"
            v-model="renameFlag"
            class-name="vertical-center-modal"
        >
            <p>
                <Input v-model="renameVal" placeholder="请输入..." style="width: 300px"/>
            </p>
        </Modal>
        <Modal
            :title="'新增“'+oldVal+'”的下级:'"
            @on-ok="sure"
            :loading="loading"
            @on-cancel="notSure"
            v-model="newFlag"
            class-name="vertical-center-modal"
        >
            <p>
                <Input v-model="newVal" placeholder="请输入..." style="width: 300px"/>
            </p>
        </Modal>
    </div>
</template>
<script>
import { Tree } from "iview";
import api from "@/api/commonApi";
export default {
    data() {
        return {
            tmpRoot: null,
            tmpNode: null,
            tmpData: null,

            renameFlag: false,
            renameVal: "",
            oldVal: "",

            newFlag: false,
            newVal: "",

            loading: true,
            dictionaryList: [
                {
                    title: "字典",
                    expand: true,
                    loading: false,
                    top: true,
                    render: (h, { root, node, data }) => {
                        return h(
                            "span",
                            {
                                style: {
                                    display: "inline-block",
                                    width: "100%"
                                }
                            },
                            [
                                h("span", [
                                    h("Icon", {
                                        props: {
                                            type: "ios-folder-outline"
                                        },
                                        style: {
                                            marginRight: "8px"
                                        }
                                    }),
                                    h("span", data.title)
                                ]),
                                h(
                                    "span",
                                    {
                                        style: {
                                            display: "inline-block",
                                            marginLeft: "32px"
                                        }
                                    },
                                    [
                                        // h(
                                        //     "Button",
                                        //     {
                                        //         props: Object.assign(
                                        //             {
                                        //             },
                                        //             this.buttonProps,
                                        //             {
                                        //                 type: "primary",
                                        //                 title:"新增"
                                        //             }
                                        //         ),
                                        //         style: {
                                        //             width: "48px",
                                        //         },
                                        //         on: {
                                        //             click: () => {
                                        //                 this.append(data);
                                        //             }
                                        //         }
                                        //     },
                                        //     "新增"
                                        // )
                                    ]
                                )
                            ]
                        );
                    },
                    children: []
                }
            ],
            buttonProps: {
                type: "default",
                size: "small"
            }
        };
    },
    methods: {
        renderContent(h, { root, node, data }) {
            let addBtn = h(
                "Button",
                {
                    props: Object.assign({}, this.buttonProps, {
                        type: "default"
                    }),
                    style: {
                        marginRight: "8px"
                    },
                    on: {
                        click: () => {
                            this.append(data);
                        }
                    }
                },
                "新增"
            );
            if (
                (data.parentType == "ZDGK_HOSPITAL_LEVEL" && data.dictLevel == 1) ||
                (data.parentType == "ZDGK_DICT_TITLE" && data.dictLevel == 1) ||
                data.dictLevel == 2
            ) {
                addBtn = null;
            }
            return h(
                "span",
                {
                    style: {
                        display: "inline-block",
                        width: "100%"
                    }
                },
                [
                    h("span", [
                        h("Icon", {
                            props: {
                                type: "ios-paper-outline"
                            },
                            style: {
                                marginRight: "8px"
                            }
                        }),
                        h("span", data.title)
                    ]),
                    h(
                        "span",
                        {
                            style: {
                                display: "inline-block",
                                marginLeft: "16px"
                            }
                        },
                        [
                            addBtn,
                            // h("Button", {
                            //     props: Object.assign({}, this.buttonProps, {
                            //                         type: "default"
                            //                     }),
                            //     on: {
                            //         click: () => {
                            //             this.remove(root, node, data);
                            //         }
                            //     }
                            // },"-"),
                            h(
                                "Button",
                                {
                                    props: Object.assign({}, this.buttonProps, {
                                        type: "default"
                                    }),
                                    on: {
                                        click: () => {
                                            this.rename(root, node, data);
                                        }
                                    }
                                },
                                "更名"
                            )
                        ]
                    )
                ]
            );
        },
        append(data) {
            this.tmpData = data;
            this.oldVal = data.title;
            this.newFlag = true;
        },
        remove(root, node, data) {
            const parentKey = root.find(el => el === node).parent;
            const parent = root.find(el => el.nodeKey === parentKey).node;
            const index = parent.children.indexOf(data);
            parent.children.splice(index, 1);
        },
        rename(root, node, data) {
            this.tmpRoot = root;
            this.tmpNode = node;
            this.tmpData = data;
            this.oldVal = data.title;
            this.renameFlag = true;
        },
        renameSure() {
            if (this.renameVal == "") {
                this.$Message.error("输入不能为空");
                this.loading = false;
                setTimeout(() => {
                    this.$nextTick(() => {
                        this.loading = true;
                    });
                }, 1000);
                return;
            }
            let param = {};
            param.dictLevel = this.tmpData.dictLevel;
            param.dictName = this.renameVal;
            param.dictSource = this.tmpData.dictSource;
            param.dictType = this.tmpData.dictType;
            param.id = this.tmpData.id;
            param.parentType = this.tmpData.parentType;
            this.$axios
                .post(api.dictionaryUpdate, param)
                .then(resp => {
                    if (resp.data.success) {
                        const parentKey = this.tmpRoot.find(
                            el => el === this.tmpNode
                        ).parent;
                        const parent = this.tmpRoot.find(
                            el => el.nodeKey === parentKey
                        ).node;
                        const index = parent.children.indexOf(this.tmpData);
                        parent.children[index].title = this.renameVal;
                        this.loading = false;
                        this.renameFlag = false;
                    } else {
                        this.$Message.info("修改失败，请重试");
                        this.loading = false;
                        setTimeout(() => {
                            this.$nextTick(() => {
                                this.loading = true;
                            });
                        }, 1000);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        renameNotSure() {},
        sure() {
            if (this.newVal == "") {
                this.$Message.error("输入不能为空");
                this.loading = false;
                setTimeout(() => {
                    this.$nextTick(() => {
                        this.loading = true;
                    });
                }, 1000);
                return;
            }
            let top = this.tmpData.top;
            let param = {};
            param.dictLevel = this.tmpData.dictLevel + 1;
            param.dictName = this.newVal;
            param.dictSource = this.tmpData.dictSource;
            param.dictType = "";
            param.id = null;
            param.parentType = this.tmpData.dictType;
            this.$axios
                .post(api.dictionaryInsert, param)
                .then(resp => {
                    if (resp.data.success) {
                        let tmpObj = resp.data.object;
                        const children = this.tmpData.children || [];
                        children.push({
                            dictLevel: tmpObj.dictLevel,
                            dictName: tmpObj.dictName,
                            dictSource: tmpObj.dictSource,
                            dictType: tmpObj.dictType,
                            id: tmpObj.id,
                            parentType: tmpObj.parentType,
                            title: this.newVal,
                            expand: true
                        });
                        this.$set(this.tmpData, "children", children);
                        this.loading = false;
                        this.newFlag = false;
                    } else {
                        this.$Message.info("添加失败，请重试");
                        this.loading = false;
                        setTimeout(() => {
                            this.$nextTick(() => {
                                this.loading = true;
                            });
                        }, 1000);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        notSure() {},
        loadData(item, callback) {
            let param = { parentType: item.dictType };
            this.$axios
                .post(api.dictionaryList, param)
                .then(resp => {
                    let tmpData = resp.data.object;
                    let tmpArr = [];
                    if (tmpData.length > 0) {
                        tmpData.forEach((el, i) => {
                            let tmpObj = {};
                            tmpObj.title = el.dictName;
                            tmpObj.id = el.id;
                            tmpObj.dictType = el.dictType;
                            tmpObj.dictLevel = el.dictLevel;
                            tmpObj.dictSource = el.dictSource;
                            tmpObj.parentType = el.parentType;
                            if (el.num == 1) {
                                tmpObj.children = [];
                                tmpObj.loading = false;
                                tmpObj.expand = false;
                            }
                            tmpArr.push(tmpObj);
                        });
                        callback(tmpArr);
                    } else {
                        item.expand = "";
                        item.loading = "";
                        callback(tmpArr);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    components: { Tree },
    created() {
        let param = { dictLevel: 0 };
        this.$axios
            .post(api.dictionaryList, param)
            .then(resp => {
                let tmpData = resp.data.object;
                tmpData.forEach((el, i) => {
                    let tmpObj = {};
                    tmpObj.title = el.dictName;
                    tmpObj.id = el.id;
                    tmpObj.dictType = el.dictType;
                    tmpObj.dictLevel = el.dictLevel;
                    tmpObj.dictSource = el.dictSource;
                    tmpObj.parentType = el.parentType;
                    if (el.num == 1) {
                        tmpObj.children = [];
                        tmpObj.loading = false;
                        tmpObj.expand = false;
                    }
                    this.dictionaryList[0].children.push(tmpObj);
                });
            })
            .catch(error => {
                console.log(error);
            });

        let breadList = [
            { path: "/index", title: "首页" },
            {
                path: "/index/maintain/configurationWarehouse/index",
                title: "配置仓"
            },
            {
                path: "/index/maintain/dictionary/tree",
                title: "基础字典"
            }
        ];
        this.$emit("changeBreadList", breadList);
    }
};
</script>
<style lang="less" scoped>
.dictionary {
    margin-left: 1%;
    padding: 10px;
    width: 98%;
    background: #ffffff;
    box-sizing: border-box;
}
</style>