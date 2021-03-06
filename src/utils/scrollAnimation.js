export default function scrollAnimation(currentY, targetY, domref) {
    // 获取当前位置方法
    // const currentY = document.documentElement.scrollTop || document.body.scrollTop

    // 计算需要移动的距离
    let needScrollTop = targetY - currentY
    let _currentY = currentY
    setTimeout(() => {
        // 一次调用滑动帧数，每次调用会不一样
        const dist = Math.ceil(needScrollTop / 5)
        _currentY += dist
        domref.scrollTo(_currentY, currentY)
        // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
        if (needScrollTop > 5 || needScrollTop < -5) {
            scrollAnimation(_currentY, targetY, domref)
        } else {
            domref.scrollTo(_currentY, targetY)
        }
    }, 8)
}