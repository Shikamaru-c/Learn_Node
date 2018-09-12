// 登录注册组件
function popupLogAndSign () {
  let logLayer = document.querySelector('.login')
  let signLayer = document.querySelector('.signin')

  let mask = document.querySelector('.mask')
  let popupLayer = document.querySelector('.popup-layer')

  // header的逻辑
  ;(function () {
    // 切换登录注册按钮
    let btnLog = document.querySelector('.btn-login')
    let btnSign = document.querySelector('.btn-signin')

    let checkSign = document.querySelector('.check-signin')
    let checkLog = document.querySelector('.check-login')

    // 初始化 popupLayer 设置为不可见
    popupLayer.style.display = 'none'

    btnLog && btnLog.addEventListener('click', popupLog)
    btnSign && btnSign.addEventListener('click', popupSign)
    mask.addEventListener('click', maskHandle)

    checkSign && checkSign.addEventListener('click', popupSign)
    checkLog && checkLog.addEventListener('click', popupLog)
  })()

  // 评论组件中 [ 登录后评论逻辑 ]
  ;(function () {
    let btnCommentLogins = document.querySelectorAll('.btn-comment-login')
    btnCommentLogins.forEach(function (btn) {
      btn && btn.addEventListener('click', popupLog)
    })
  })()

  // 打开登录弹窗
  function popupLog () {
    popupLayer.style.display = ''
    mask.style.display = 'block'
    logLayer.style.display = 'block'
    signLayer.style.display = ''
  }

  // 打开注册弹窗
  function popupSign () {
    popupLayer.style.display = ''
    mask.style.display = 'block'
    signLayer.style.display = 'block'
    logLayer.style.display = ''
  }

  // 点击 mask 关闭登录 / 注册弹窗
  function maskHandle () {
    popupLayer.style.display = 'none'
    this.style.display = ''
    logLayer.style.display = ''
    signLayer.style.display = ''
  }
}

// 评论文章弹出层组件
function popupComment () {
  let btnComment = document.querySelector('.btn-comment')
  let commentLayer = document.querySelector('.comment-layer')
  let btnCancel = document.querySelector('.cancel')

  btnComment && btnComment.addEventListener('click', popupCom)
  btnCancel && btnCancel.addEventListener('click', cancelHandle)

  function popupCom () {
    commentLayer.style.display = 'flex'
  }

  function cancelHandle () {
    commentLayer.style.display = ''
  }
}

// 回复评论组件
function replyComment () {
  let btnReplys = document.querySelectorAll('.btn-reply')

  btnReplys.forEach(function (btnReply) {
    btnReply.addEventListener('click', reply)
  })

  function reply () {

    // 每次点击时候先把之前的回复评论表单全部删除
    let oldReplyDiv = document.querySelector('.reply-box')
    if (oldReplyDiv) {
      let oldBtnReply = oldReplyDiv.previousElementSibling.querySelector('.btn-reply')
      cancelReply(oldReplyDiv, oldBtnReply)()
    }

    // 创建 form 表单
    let replyDiv = document.createElement('form')
    let commentId = this.dataset.commentId
    replyDiv.setAttribute('method', 'post')
    replyDiv.setAttribute('action', '/comments/sub/' + commentId)
    replyDiv.className = 'reply-box'

    // 创建文本域
    let replyTextarea = document.createElement('textarea')
    replyTextarea.setAttribute('name', 'content')
    replyTextarea.className = 'replyContent'
    replyDiv.appendChild(replyTextarea)

    // 创建提交按钮
    let btnCommit = document.createElement('button')
    btnCommit.setAttribute('type', 'submit')
    btnCommit.className = 'reply-commit'
    btnCommit.innerHTML = '回复'
    replyDiv.appendChild(btnCommit)

    // 创建取消按钮
    let btnCancel = document.createElement('button')
    // 为了传入btnCancel
    let btnReply = this
    btnCancel.className = 'reply-cancel'
    btnCancel.innerHTML = '取消'
    btnCancel.addEventListener('click', cancelReply(replyDiv, btnReply))
    replyDiv.appendChild(btnCancel)

    // 找到这个要回复的这个评论
    let subComment = this.parentElement
                         .parentElement
                         .nextElementSibling

    // 二级回复框
    if (!subComment) {
      let hiddenInput = document.createElement('input')
      let to = this.dataset.to
      hiddenInput.setAttribute('type', 'hidden')
      hiddenInput.setAttribute('name', 'to')
      hiddenInput.setAttribute('value', to)
      replyDiv.appendChild(hiddenInput)

      subComment = this.parentElement
                       .parentElement
                       .parentElement
      this.style.display = 'none'
      return subComment.appendChild(replyDiv)
    }
    // 一级回复框
    subComment.parentElement.insertBefore(replyDiv, subComment)


    // 将评论按钮设置为 none
    this.style.display = 'none'
  }

  // 取消评论事件
  function cancelReply (replyDiv, btnReply) {
    return function () {
      replyDiv.parentElement.removeChild(replyDiv)
      btnReply.style.display = ''
    }
  }
}

// error-message 渐隐动画
function fade (element) {
  let opacity = 0
  let timer

  if (element) {
    element.style.opacity = 0
    fadeIn(element, fadeOut(element))
    element.addEventListener('click', function () {
      removeBox(this)
    })
  }

  function fadeIn(box, cb) {
    clearInterval(timer)
    timer = setInterval(function () {
      opacity += .05
      box.style.opacity = opacity
      if (opacity >= 1) {
        clearInterval(timer)
        cb()
      }
    }, 100)
  }

  function fadeOut(box) {
    clearInterval(timer)    
    return function () {
      timer = setInterval(function () {
        opacity -= .05
        box.style.opacity = opacity
        if (opacity <= 0) {
          clearInterval(timer)
          removeBox(box)
        }
      }, 100)
    }
  }

  function removeBox (box) {
    box.parentElement && box.parentElement.removeChild(box)
  }
}

// 注册表单验证
function verify () {
  let btnSigninCommit = document.querySelector('.btn-signin-commit')
  btnSigninCommit.addEventListener('click', signinVerify)

  function signinVerify (e) {
    let signinError = document.querySelector('.signin-error')

    let id = document.querySelector('#id').value
    let password = document.querySelector('#password').value
    let repassword = document.querySelector('#repassword').value
    
    const idReg = /^[a-zA-Z\-\_0-9]{6,12}$/
    const pw1 = /[a-zA-Z\-\_]/
    const pw2 = /\d/
    const pw3 = /^.{6,12}$/

    if (!idReg.test(id)) {
      signinError.innerHTML = '帐号不符合规则'
      fade(signinError)
      e.preventDefault()
    } else if (!pw1.test(password) || !pw2.test(password) || !pw3.test(password)) {
      fade(signinError)      
      signinError.innerHTML = '密码不符合规则'
      e.preventDefault()
    } else if (password !== repassword) {
      fade(signinError)
      signinError.innerHTML = '两次密码不同'
      e.preventDefault()      
    }
  }
}

window.onload = function () {
  let errorBox = document.querySelector('.error-message')
  fade(errorBox)
  popupLogAndSign()
  popupComment()
  replyComment()
  verify()
}