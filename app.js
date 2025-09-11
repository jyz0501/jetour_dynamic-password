/**
 * 格式化时间单位（补前导零）
 * @param {number} unit 时间单位（如月份、日期、小时）
 * @returns {string} 两位字符串（如 9 → '09'）
 */
function formatTimeUnit(unit) {
    return String(unit).padStart(2, '0');
}

/**
 * 计算并更新密码
 */
function updatePasswords() {
    const now = new Date();

    // 提取月日时（忽略分钟）
    const month = formatTimeUnit(now.getMonth() + 1); // 月份（0-11 → 1-12 → 补零后01-12）
    const date = formatTimeUnit(now.getDate());       // 日期（1-31 → 补零后01-31）
    const hours = formatTimeUnit(now.getHours());     // 小时（0-23 → 补零后00-23）

    // 组合日期时间字符串（格式：MMDDHH，如090921表示9月9日21时）
    const dateTimeKey = `${month}${date}${hours}`;
    const dateTimeNum = parseInt(dateTimeKey, 10);    // 转换为数字（如090921 → 90921）

    // 计算ADB密码（20250110 × 日期时间）
    const adbFull = 20250110 * dateTimeNum;
    const adbPassword = (adbFull % 1000000).toString().padStart(6, '0'); // 取最后六位+补零

    // 计算车机动态密码（ADB密码 - 当前小时数）
    const carFull = adbFull - now.getHours();
    const carPassword = (carFull % 1000000).toString().padStart(6, '0');  // 取最后六位+补零

    // 更新页面显示
    document.getElementById('adbPassword').textContent = adbPassword;
    document.getElementById('carPassword').textContent = carPassword;
    document.getElementById('updateTime').textContent = 
        `${now.getFullYear()}-${month}-${date} ${hours}:--`; // 分钟固定显示为--
}

// 页面加载后立即计算一次
updatePasswords();

// 每分钟更新一次（60000ms）
setInterval(updatePasswords, 60000);
