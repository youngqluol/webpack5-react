import * as React from 'react';
import { Button } from '@kdcloudjs/kdesign';
import axios from 'axios';
// import { downloadFile } from '@src/service';

interface DownloadProps {
  text: string;
}

const Download = (props: DownloadProps) => {
  const { text } = props;
  const [loading, setLoading] = React.useState<boolean>(false);
  const [processText, setProcessText] = React.useState<string>('');

  const triggerDownload = () => {
    setLoading(true);
    axios({
      method: 'get',
      url: '/api/file/download',
      responseType: 'blob', // arraybuffer是js中提供处理二进制的接口
      onDownloadProgress: (e: ProgressEvent) => {
        if (e.lengthComputable) {
          const textContent = `${Math.round((e.loaded * 100) / e.total)}%`;
          setProcessText(textContent);
          if (e.loaded === e.total) {
            setProcessText(`用时：${e.timeStamp.toFixed(0)}ms`);
          }
        }
      },
    })
      .then(res => {
        setLoading(false);
        const blob = new Blob([res.data]); // { type: 'application/xsxl' } application/zip
        const fileName = '测试表格123.zip';
        if ('download' in document.createElement('a')) {
          // 非IE下载
          const elink = document.createElement('a');
          elink.download = fileName;
          elink.style.display = 'none';
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // window.navigator.msSaveBlob(blob, fileName);
        }
      })
      .catch(e => {
        setLoading(false);
        console.log(e);
      });
  };

  return (
    <div>
      <Button type='primary' loading={loading} onClick={triggerDownload}>
        {text}
      </Button>
      <span>{processText}</span>
    </div>
  );
};

export default Download;
