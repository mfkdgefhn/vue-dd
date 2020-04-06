/*
 * @Description: 生成组件脚本
 * 共三个参数，1、生成组件名 2、生成组件所在文件夹 3、被生成的组件名
 * @Author: anan
 * @Date: 2019-11-02 08:45:50
 * @LastEditors: anan
 * @LastEditTime: 2019-11-03 09:00:02
 */
// 根目录下，terminal输入node ./src/components/example/generate.js hello hello example
// 生成列表页面模板文件 componentName 为文件名称, foldderName 为文件夹名称，等号两不能空格
const fs = require('fs')
const path = require('path')
// const componentName = 'newComponent'
// const folderName = 'folderName'

const argv = process.argv

if (argv.length <= 2) {
  console.log('请指定待处理的文件地址')
  return
}
const fileParams = argv.filter((val, index) => {
  return index >= 2
})

const folderName = fileParams[0] ? fileParams[0] : 'folderName' // 文件夹名
const componentName = fileParams[1] ? fileParams[1] : 'componentName' // 生成的文件名
const ByComponentName = fileParams[2] ? fileParams[2] : 'Example' // 被生成的组件名

const encoding = 'utf8'
// 复制一份example.vue到page文件夹的folderName文件夹下，重命名为componentName
function copyExample() {
  // 读取模板文件example.vue
  fs.readFile(`./src/components/example/${ByComponentName}.vue`, encoding,
    (err, data) => {
      if (err) {
        throw err
      } else {
        // 读取成功后，判断生成路径的文件夹是否存在
        fs.readdir(`./scr/components/example/${folderName}`, (err, folder) => {
          if (err) {
            fs.mkdir(`./src/components/example/${folderName}`, { recursive: false },
              (err) => {
                if (err) throw err
                else {
                  console.log(`无${folderName}文件夹`)
                  fs.writeFile(
                    `./src/components/example/${folderName}/${componentName}.vue`,
                    data, encoding, (error) => {
                      if (error) {
                        throw error
                      } else {
                        console.log(`-----------已生成${componentName}.vue组件文件-----------`)
                      }
                    })
                }
              })
          } else {
            console.log('文件夹已经存在')
          }
        })
      }
    })
}

// 修改util.js的路由生成函数
function fixedFormatRoutes() {
  // 读取文件
  fs.readFile('./src/util/util.js', encoding, (err, data) => {
    if (err) {
      throw err
    } else {
      const reg1 = componentName.slice(0, 3)
      const insertPoint = /\/\/new route insert here/// 查找插入点
      const insertCode = 'else if (component.startsWith(\'' + reg1 + '\')) {\n' +
        '          require([\'../components/page/' + folderName + '/\' + component + \'.vue\'], resolve)\n' +
        '        } //new route insert here'// 插入到文件中的代码
      if (!data.match(reg1)) { // 已有对应路由生成代码，则跳出，否则改写formatRoutes函数代码
        const newData = data.replace(insertPoint, insertCode)
        fs.writeFile('./src/util/util.js', newData, encoding, (error) => {
          if (error) {
            throw error
          } else {
            console.log('------------已改写util.js路由生成函数代码-------------')
          }
        })
      } else {
        console.log(`-----------formatRoutes已存在${reg1}的路由生成代码--------------`)
      }
    }
  })
}

copyExample()
// fixedFormatRoutes()
