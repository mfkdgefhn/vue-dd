/*
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-11-02 08:45:50
 * @LastEditors: anan
 * @LastEditTime: 2019-11-02 10:26:31
 */
// 根目录下，terminal输入node ./src/components/./src/components/example/ generatePage.js componentName=hello folderName=hello
// 生成列表页面模板文件 componentName 为文件名称, foldderName 为文件夹名称，等号两不能空格
const fs = require('fs')
const path = require('path')
const componentName = 'newComponent'
const folderName = 'folderName'
// 复制一份example.vue到page文件夹的folderName文件夹下，重命名为componentName
function copyExample() {
  // 读取模板文件example.vue
  fs.readFile('./src/components/example/Example.vue', encoding = 'utf8',
    (err, data) => {
      if (err) {
        throw err
      } else {
        // 读取成功后，判断生成路径的文件夹是否存在
        fs.readder(`./scr/components/${folderName}`, (err, folder) => {
          if (err) { // 无此文件夹，则生成该文件夹，再生成component.vue
            fs.mkdir(`./src/components/${folderName}`, { recursive: false },
              (err) => {
                if (err) { throw err } else {
                  console.log(`无${folderName}文件夹`)
                  fs.writeFile(
                    `./src/components/${folderName}/${componentName}.vue`,
                    data, encoding = 'utf8', (error) => {
                      if (error) {
                        throw error
                      } else {
                        console.log(`------------已生成${componentName}.vue组件文件------------`)
                      }
                    })
                }
              })
          } else { // 有此文件夹，则直接生成component.vue
            console.log(`有${folderName}文件夹`)
            fs.writeFile(
              `./src/components/${folderName}/${componentName}.vue`, data,
              encoding = 'utf8', (error) => {
                if (error) {
                  throw error
                } else {
                  console.log(`-----------已生成${componentName}.vue组件文件`)
                }
              }
            )
          }
        })
      }
    })
}

// 修改util.js的路由生成函数
function fixedFormatRoutes() {
  fs.readFile('./src/util/util.js', encoding = 'utf8', function(err, data) {
    if (err) {
      throw err
    } else {
      const reg1 = componentName.slice(0, 3)
      const insertPoint = /\/\/new route insert here/// 查找插入点
      const insertCode = 'else if (component.startsWith(\'' + reg1 + '\')) {\n' +
        '          require([\'../components/' + folderName + '/\' + component + \'.vue\'], resolve)\n' +
        '        } //new route insert here'// 插入到文件中的代码
      if (!data.match(reg1)) { // 已有对应路由生成代码，则跳出，否则改写formatRoutes函数代码
        const newData = data.replace(insertPoint, insertCode)
        fs.writeFile('./src/util/util.js', newData, encoding = 'utf8', function(error) {
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
