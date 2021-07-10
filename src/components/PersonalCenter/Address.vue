<template>
  <div class="address">
    <div class="title"><h1>收获地址</h1></div>
    <div class="address-list">
      <div
        class="address-info"
        v-for="(item, index) in addressInfos"
        :key="index"
      >
        <div class="name">
          {{ item.name }}<span>{{ item.label }}</span>
        </div>
        <div class="phone">{{ item.phone }}</div>
        <div class="address-con">
          <!-- <span>重庆</span> -->
          <span>{{ item.address[0] }}</span>
          <span>{{ item.address[1] }}</span>
          <span>{{ item.address[2] }}</span>
          <span class="info">{{ item.street }}</span>
        </div>
        <div class="address-action">
          <!-- <span>修改</span> -->
          <span @click="deleteAddress(item.id)" >删除</span>
        </div>
      </div>

      <div class="add-address" @click="dialogFormVisible = true">
        <i class="el-icon-circle-plus"></i><span>添加新地址</span>
      </div>
    </div>

    <el-dialog
      title="添加收获地址"
      v-model="dialogFormVisible"
      width="40%"
      :before-close="handleClose"
    >
      <form class="form-box">
        <div class="name-phone-box">
          <el-input v-model="formInfo.name" placeholder="姓名"></el-input>
          <div class="mbox"></div>
          <el-input v-model="formInfo.phone" placeholder="手机号"></el-input>
        </div>
        <div class="cascade">
          <el-cascader
            placeholder="选择省/市/区/街道"
            v-model="formInfo.address"
            :options="options"
            @change="handleChange"
          ></el-cascader>
        </div>
        <div class="detailed-address">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="详细地址"
            v-model="formInfo.street"
          >
          </el-input>
        </div>
        <div class="address-label">
          <el-input v-model="formInfo.label" placeholder="地址标签"></el-input>
        </div>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="addAdress(formInfo), (dialogFormVisible = false)"
          >
            确 定
          </el-button>
        </div>
      </form>
    </el-dialog>
  </div>
</template>

<script>
import { apiIdAddress, apiAddAddress, apiDeleteAddress } from "../../utils/api";

export default {
  data() {
    return {
      addressInfos: [],
      dialogFormVisible: false,
      options: [
        {
          value: "重庆",
          label: "重庆",
          children: [
            {
              value: "涪陵区",
              label: "涪陵区",
              children: [
                {
                  value: "李渡",
                  label: "李渡",
                },
                {
                  value: "江东",
                  label: "江东",
                },
              ],
            },
            {
              value: "南岸区",
              label: "南岸区",
              children: [
                {
                  value: "茶园",
                  label: "茶园",
                },
                {
                  value: "南坪",
                  label: "南坪",
                },
              ],
            },
          ],
        },
        {
          value: "云南",
          label: "云南",
          children: [
            {
              value: "昆明",
              label: "昆明",
              children: [
                {
                  value: "西山区",
                  label: "西山区",
                },
                {
                  value: "官渡区",
                  label: "官渡区",
                },
                {
                  value: "盘龙区",
                  label: "盘龙区",
                },
              ],
            },
            {
              value: "丽江",
              label: "丽江",
              children: [
                {
                  value: "丽江古城",
                  label: "丽江古城",
                },
                {
                  value: "束河古镇",
                  label: "束河古镇",
                },
              ],
            },
          ],
        },
      ],
      formInfo: {
        name: "",
        phone: "",
        address: [],
        street: "",
        label: "",
      },
    };
  },
  mounted() {
    // 进入时请求用户地址
    apiIdAddress({ name: this.$store.state.userName }).then((res) => {
      if (res.code == 200) {
        this.addressInfos = res.data;
        // 将地址 address 格式化
        this.addressInfos.forEach((item) => {
          item.address = JSON.parse(item.address);
        });
      }
    });
  },
  components: {},
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleChange(val) {
      // console.log(val);
    },
    // 添加地址
    addAdress(val) {
      // 序列化地址
      let address = JSON.stringify(val.address);
      let obj = {
        uid: this.$store.state.userName,
        name: val.name,
        phone: val.phone,
        address: address,
        street: val.street,
        label: val.label,
      };
      // 发送添加地址请求
      apiAddAddress(obj).then((res) => {
        // 成功
        if (res.code == 200) {
          this.$message.success("添加成功！");
          // 重新请求 地址数据
          apiIdAddress({ name: this.$store.state.userName }).then((res) => {
            if (res.code == 200) {
              this.addressInfos = res.data;
              // 将地址 address 格式化
              this.addressInfos.forEach((item) => {
                item.address = JSON.parse(item.address);
              });
            }
          });
        }
      });
    },
    // 删除地址 
    deleteAddress(id) {
      apiDeleteAddress({id: id}).then(res => {
        if(res.code == 200) {
          this.$message.success('删除成功！');
          // 重新请求 地址数据
          apiIdAddress({ name: this.$store.state.userName }).then((res) => {
            if (res.code == 200) {
              this.addressInfos = res.data;
              // 将地址 address 格式化
              this.addressInfos.forEach((item) => {
                item.address = JSON.parse(item.address);
              });
            }
          });
        }
      })
    }
  },
};
</script>

<style scoped lang='scss'>
.address {
  background: white;
  padding: 50px 50px;
  width: 800px;

  .title {
    h1 {
      margin-bottom: 30px;
      font-size: 30px;
      font-weight: 400;
      line-height: 68px;
      color: #757575;
    }
  }
  .address-list {
    display: flex;
    flex-wrap: wrap;
    .address-info {
      width: 200px;
      height: 138px;
      border: 1px solid #e0e0e0;
      margin: 10px 10px;
      padding: 20px 20px;
      cursor: pointer;
      &:hover {
        border: 1px solid #b0b0b0;
        .address-action {
          opacity: 1;
        }
      }
      // color: #e0e0e0;
      .name {
        display: flex;
        justify-content: space-between;
        font-size: 18px;
        color: #333;
        line-height: 30px;
        margin-bottom: 10px;
        span {
          font-size: 14px;
          color: rgb(117, 117, 117);
        }
      }
      .phone {
        line-height: 22px;
        color: #757575;
      }
      .address-con {
        line-height: 22px;
        color: #757575;
        span {
          display: inline-block;
          margin-right: 3px;
          word-wrap: break-word;
        }
        .info {
          width: 100%;
        }
      }
      .address-action {
        margin-top: 20px;
        text-align: right;
        opacity: 0;
        span {
          color: #ff6700;
          margin-left: 10px;
        }
      }
    }
    .add-address {
      width: 200px;
      height: 138px;
      border: 1px solid #e0e0e0;
      margin: 10px 10px;
      padding: 20px 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #e0e0e0;
      cursor: pointer;
      i {
        font-size: 30px;
      }
      &:hover {
        border: 1px solid #b0b0b0;
        color: #b0b0b0;
      }
    }
  }
}
.form-box {
  .name-phone-box {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    .mbox {
      width: 30px;
    }
  }
  .cascade {
    width: 100%;
    margin-bottom: 10px;
    .el-cascader {
      width: 100%;
    }
  }
  .detailed-address {
    margin-bottom: 20px;
  }
  .address-label {
    margin-bottom: 30px;
  }
  .dialog-footer {
    text-align: center;
  }
}
</style>
