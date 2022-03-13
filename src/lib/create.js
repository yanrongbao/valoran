// lib/create.js
const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const Generator = require('./Generator');

module.exports = async function (name, options) {
    // 验证是否正常取到值
    // console.log('>>> create.js', name, options)
    // 执行创建命令

    // 当前命令行选择的目录
    const cwd = process.cwd();
    // 需要创建的目录地址
    const targetDir = path.join(cwd, name);

    // 目前是否已经存在
    if (fs.existsSync(targetDir)) {
        // 是否为强制创建？
        if (options.force) {
            await fs.remove(targetDir);
        } else {
            // TODO：询问用户是否确定要覆盖
            const { action } = await inquirer.prompt([
                {
                    name: 'action',
                    type: 'list',
                    message: 'Target directory already exists Pick an action:',
                    choices: [
                        {
                            name: 'OverWirte',
                            value: 'overwrite',
                        },
                        {
                            name: 'Cancel',
                            value: false,
                        },
                    ],
                },
            ]);
            if (!action) {
                return;
            } if (action === 'overwrite') {
                // 移除已存在的目录
                console.log('\r\nRemoving...');
                await fs.remove(targetDir);
            }
        }
    }

    // 创建项目
    const generator = new Generator(name, targetDir);
    // 开始创建项目
    generator.create();
};
