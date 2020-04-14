// *************************************************************
// 封装 jsonp
// const random = Math.random() // 随机函数名，避免冲突

// window[random] = (data) => {
//     console.log(data)
// }

// const script = document.createElement('script')
// script.src = `http://qq.com:8888/friends.js?functionName=${random}` // 给后台发查询参数
// script.onload = () => {
//     script.remove()  // 执行完 script 后删除。
// }
// document.body.appendChild(script)
// *************************************************************

function jsonp(url) {
  return new Promise((resolve, reject) => {
    const random = Math.random(); // 随机函数名，避免冲突
    window[random] = (data) => {
      // 声明函数
      // console.log(data)
      resolve(data); // 函数如果执行了 说明就是成功拿到数据了
    };
    const script = document.createElement("script");
    script.src = `${url}?callback=${random}`; // 给后台发查询参数
    script.onload = () => {
      script.remove(); // 执行完 script 后删除。
    };
    script.onerror = () => {
      reject();
    };
    document.body.appendChild(script);
  });
}

jsonp("http://qq.com:8888/friends.js").then((data) => {
  console.log(data);
});
