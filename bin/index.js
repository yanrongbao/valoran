#! /usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');
const create = require('../src/lib/create');
const { version } = require('../package.json');

program.command('create <app-name>') // 配置命令
    .alias('c') // 配置命令别名
    .description('create a new project') // 配置描述
    .option('-f --force', 'overwrite target directory if it exist')
    .action((name, options) => {
        // 在 create.js 中执行创建任务
        create(name, options);
    });

// 配置 config 命令
program
    .command('config [value]')
    .description('inspect and modify the config')
    .option('-g, --get <path>', 'get value from option')
    .option('-s, --set <path> <value>')
    .option('-d, --delete <path>', 'delete option from config')
    .action((value, options) => {
        console.log(value, options);
    });

// 配置 ui 命令
program
    .command('ui')
    .description('start add open roc-cli ui')
    .option('-p, --port <port>', 'Port used for the UI Server')
    .action((option) => {
        console.log(option);
    });

program
    // 监听 --help 执行
    .on('--help', () => {
        // 使用 figlet 绘制 Logo
        console.log(`\r\n${figlet.textSync('mju', {
            font: 'Ghost',
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 80,
            whitespaceBreak: true,
        })}`);

        // 新增说明信息
        console.log(`\r\nRun ${chalk.cyan('zr <command> --help')} for detailed usage of given command\r\n`);
    });

// 配置版本号信息
program.version(`${version}`);

// 解析用户执行命令传入参数
program.parse(process.argv);
