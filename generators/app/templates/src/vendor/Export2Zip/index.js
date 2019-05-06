/* eslint-disable */
require('script-loader!file-saver');
import JSZip from 'jszip'
/* 
import('@/vendor/Export2Zip').then(zip => {
    const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date'];
    const data = [ // 格式错误会报错
        [1, 'title title title', 'author author author', 'ReadingsReadingsReadings', 'date'],
        [1, 'title title title', 'author author author', 'ReadingsReadingsReadings', 'date'],
        [1, 'title title title', 'author author author', 'ReadingsReadingsReadings', 'date']
    ];
    zip.export_txt_to_zip(tHeader, data, 'filename', 'filename');
});
*/
export function export_txt_to_zip(th, jsonData, txtName, zipName) {
    const zip = new JSZip()
    const txt_name = txtName || 'file'
    const zip_name = zipName || 'file'
    const data = jsonData
    let txtData = `${th}\r\n`
    data.forEach((row) => {
        let tempStr = ''
        tempStr = row.toString()
        txtData += `${tempStr}\r\n`
    })
    zip.file(`${txt_name}.txt`, txtData)
    zip.generateAsync({
        type: "blob"
    }).then((blob) => {
        saveAs(blob, `${zip_name}.zip`)
    }, (err) => {
        alert('导出失败')
    })
}
