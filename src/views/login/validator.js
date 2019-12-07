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
// 暴露的 选择状态验证 逻辑
export function checkAgree(rule, value, callback) {
  // 正则验证
  if (value === false) {
    // 错误提示
    return callback(new Error("必须勾选协议"));
  }
  // 正确提示
  callback();
}

// 暴露的 邮箱验证 逻辑
export function checkEmail(rule, value, callback) {
  // 正则
  const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  // 正则验证
  if (!reg.test(value)) {
    // 错误提示
    return callback(new Error("请输入正确的邮箱"));
  }
  // 正确提示
  callback();
}
