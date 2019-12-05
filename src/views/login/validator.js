// 暴露的 手机验证 逻辑
export function checkMobile(rule, value, callback) {

  // 正则
  const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
  // 正则验证
  if (!reg.test(value)) {
    // 错误提示
    return callback(new Error("请输入正确的手机号"));
  }
  // 正确提示
  callback();
}
