// 导出页面为PDF格式
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default {
  install(Vue, options) {
    Vue.prototype.getPdf = (val) => {
      html2Canvas(document.querySelector('#pdfDom'), {
        allowTaint: true,
        taintTest: false,
        scale: '2',
        dpi: '192'
      }).then((canvas) => {
        const contentWidth = canvas.width
        const contentHeight = canvas.height
        const pageHeight = contentWidth / 592.28 * 841.89
        let leftHeight = contentHeight
        let position = 0
        // 竖排  -20的原因是为了设置页边距
        // const imgWidth = 595.28 -20
        // const imgHeight = 592.28 / contentWidth * contentHeight - 20
        // 横排
        const imgWidth = 841.89 - 20
        const imgHeight = 841.89 / contentWidth * contentHeight - 20
        const pageData = canvas.toDataURL('image/jpeg', 1.0)
        // const PDF = new JsPDF('', 'pt', 'a4') // 竖排
        const PDF = new JsPDF('landscape', 'pt', 'a4') // 横排

        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 10, 10, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 10, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }
        PDF.save(val + '.pdf')
      }
      )
    }
  }
}
