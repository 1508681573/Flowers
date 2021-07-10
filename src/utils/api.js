/**   
 * api接口统一管理
 */
import { get, post } from './request'

export const apiGoodsData = p => get('goods', p);   //获取所有商品

export const apiIdGoods = p => post('idgood', p);    //根据 id 查商品

export const apicgGoods = p => post('cggood', p);    //根据 品类 查商品

export const apiAllUsersInfo = p => post('users/allusersinfo', p);    //查询所有用户信息

export const apiUserInfo = p => post('users/info', p);    //根据username查询用户

export const apiUserLogin = p => post('users/login', p);    //用户登录

export const apiUserRegister = p => post('users/register', p);  //用户注册

export const apiChangeInfo = p => post('users/changeInfo', p)  //修改用户信息

export const apiChangePass = p => post('users/changePass', p)  //修改用户密码

export const apiIdCart = p => post('cart/idcart', p) //根据 id 获取购物车信息

export const apiAddCart = p => post('cart/addcart', p)  //加入购物车

export const apiDropCart = p => post('cart/removecart', p)  //删除购物车商品

export const apiIdAddress = p => post('address/idAddress', p)  //根据 id 查询收获地址

export const apiAddAddress = p => post('address/addAddress', p)  //添加收获地址

export const apiDeleteAddress = p => post('address/deAddress', p)  //删除地址

export const apiAddOrder = p => post('order/addOrder', p)  // 添加订单

export const apiAddOrderGoods = p => post('order/addOrderGoods', p)  // 添加订单商品信息

export const apiIdOrder = p => post('order/idOrder', p)  // 根据 uid 查订单

export const apiOrderGoods = p => post('order/OrderGoods', p)  // 根据 订单号 查订单

export const apiChangeOrderShip = p => post('order/changeOrderShip', p)  // 修改是否收货

export const apiChangeOrderPay = p => post('order/changeOrderPay', p)  // 修改是否付款
