// utils/helpers.js

// 这里可以添加一些通用的工具函数

/**
 * 示例工具函数：计算两个数的和
 * @param {number} a - 第一个数字
 * @param {number} b - 第二个数字
 * @returns {number} - 两个数字的和
 */
export function sum(a, b) {
    return a + b;
}

/**
 * 示例工具函数：格式化日期
 * @param {Date} date - 要格式化的日期
 * @returns {string} - 格式化后的日期字符串
 */
export function formatDate(date) {
    return date.toISOString().split('T')[0];
}