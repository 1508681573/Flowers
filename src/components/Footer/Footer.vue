<template>
  <div class="footer">
    <div class="footer-icon">
      <div class="w">
        <a rel="nofollow" class="icon-map">
          <p class="icon-bg i1"></p>
          <p class="icon-title">优先配送</p> </a
        ><a rel="nofollow" class="icon-map">
          <p class="icon-bg i3"></p>
          <p class="icon-title">万千口碑</p> </a
        ><a rel="nofollow" class="icon-map">
          <p class="icon-bg i4"></p>
          <p class="icon-title">支付安全</p> </a
        ><a rel="nofollow" class="icon-map">
          <p class="icon-bg i5"></p>
          <p class="icon-title">低价保障</p> </a
        ><a rel="nofollow" class="icon-map">
          <p class="icon-bg i6"></p>
          <p class="icon-title">品牌保证</p> </a
        ><a rel="nofollow" class="icon-map">
          <p class="icon-bg i7"></p>
          <p class="icon-title">金牌商家</p>
        </a>
      </div>
    </div>
    <div class="main">
      <div class="ft_intr">
        <div class="ft_intr_l">
          <dl>
            <dt>购物指南</dt>
            <dd><a href="#" title="购买指南">购买指南</a></dd>
            <dd><a href="#" title="常见问题">常见问题</a></dd>
            <dd><a href="#" title="交易条款">交易条款</a></dd>
          </dl>
          <dl>
            <dt>支付方式</dt>
            <dd><a href="#" title="货到付款">货到付款</a></dd>
            <dd><a href="#" title="门店支付">门店支付</a></dd>
            <dd><a href="#" title="在线支付">在线支付</a></dd>
          </dl>
        </div>
        <div class="ft_intr_m">
          <div class="mt10">24小时在线 随时为您服务</div>
          <div>
            <img
              src="../../../public/img/qrcode.png"
              width="100"
              height="100"
              alt=""
            />
          </div>
        </div>
        <div class="ft_intr_r">
          <dl>
            <dt>配送方式</dt>
            <dd><a href="#" title="千城当日达">千城当日达</a></dd>
            <dd><a href="#" title="门店自提">门店自提</a></dd>
            <dd><a href="#" title="第三方配送">第三方配送</a></dd>
            <dd><a href="#" title="1小时加急送">1小时加急送</a></dd>
          </dl>
          <dl>
            <dt>售后服务</dt>
            <dd><a href="#" title="服务理念">服务理念</a></dd>
            <dd><a href="#" title="退换政策">退换政策</a></dd>
            <dd><a href="#" title="联系客服">联系客服</a></dd>
          </dl>
        </div>
      </div>
      <div class="ft_addr">
        <div class="g9">
          Copyright © 2020-2022 中国鲜花网 版权所有 备案号：123456XXX号
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {};
  },
  components: {},
};
</script>

<style scoped lang='scss'>
$bg: 0px;
.footer {
  background-color: #fafafa;
  border-top: #e6e6e6 solid 1px;
  padding-bottom: 20px;
  .footer-icon {
    width: 100%;
    padding: 35px 0;
    height: 80px;
    text-align: center;
    .w {
      height: 80px;
      margin: 0 auto;
      width: 1210px;
      .icon-map {
        display: inline-block;
        width: 170px;
        color: #666;
        text-decoration: none;
        .icon-bg {
          width: 50px;
          height: 50px;
          margin: 0 auto;
        }
        .icon-title {
          font-size: 14px;
          color: #000;
          text-align: center;
          margin-top: 10px;
        }
      }
      @for $i from 1 through 7 {
        .i#{$i} {
          background: url(../../assets/site.png) no-repeat;
          background-position: 0 $bg - (50 * ($i - 1));
        }
      }
    }
  }
  .main {
    border-top: #e6e6e6 solid 1px;
    width: 1210px;
    margin: auto;
    .ft_intr {
      height: 190px;
      padding: 10px 0;
      margin-top: 30px;
      max-width: 1241px;
      margin-left: auto;
      margin-right: auto;
      .ft_intr_l {
        width: 360px;
        float: left;
        line-height: 34px;
        padding-left: 130px;
        dl {
          width: 42%;
          float: left;
          dt {
            font-size: 16px;
            margin-bottom: 10px;
          }
          dd {
            font-size: 14px;
            a {
              color: #666;
              text-decoration: none;
              transition: color 1s;
              &:hover {
                color: #ff6980;
              }
            }
          }
        }
      }
      .ft_intr_m {
        float: left;
        width: 200px;
        text-align: center;
        .mt10 {
          margin-top: 10px;
          font-size: 16px;
        }
        img {
          border: 0;
          margin: 0;
          overflow: hidden;
          vertical-align: top;
        }
      }
      .ft_intr_r {
        width: 300px;
        float: left;
        padding-left: 130px;
        dl {
          width: 42%;
          float: left;
          line-height: 34px;
          dt {
            font-size: 16px;
            margin-bottom: 10px;
          }
          dd {
            font-size: 14px;
            a {
              color: #666;
              text-decoration: none;
              transition: color 1s;
              &:hover {
                color: #ff6980;
              }
            }
          }
        }
      }
    }
  }
  .ft_addr {
    width: auto;
    text-align: center;
    line-height: 26px;
  }
}
</style>
