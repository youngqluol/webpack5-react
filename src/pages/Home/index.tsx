import React, { useEffect, useState } from 'react';
import * as PDFJS from 'pdfjs-dist/build/pdf';
import PDFJSWorker from 'pdfjs-dist/build/pdf.worker.entry';

PDFJS.GlobalWorkerOptions.workerSrc = PDFJSWorker;

function Home() {
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    // createCanvas();
  }, []);

  const createCanvas = async pdfUrl => {
    const canvas = document.createElement('canvas'); // 创建canvas标签
    const loadingTask = PDFJS.getDocument({
      url: pdfUrl,
    });
    const pdfInfo = await loadingTask.promise; // 获取pdf实例
    const page = await pdfInfo.getPage(1); // 根据pdf实例和解析出pdf的页数得出一个page信息

    // console.log('page', page);

    const viewport = page.getViewport({ scale: 1 }); // 获取page视口信息

    const context = canvas.getContext('2d'); // 返回一个用于在画布上绘图的环境
    canvas.width = viewport.width; // 设置画布宽度
    canvas.height = viewport.height; // 设置画布高度

    const renderContext = {
      canvasContext: context,
      viewport,
    };

    const renderTask = page.render(renderContext);
    renderTask.promise.then(() => {
      const imgUrl = canvas.toDataURL('image/jpeg');
      // console.log(imgUrl);
      setImgUrl(imgUrl);
    });
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const fileReader = new FileReader();
    fileReader.onload = e => {
      const { result } = e.target;
      // console.log(result);
      createCanvas(result);
    };
    fileReader.readAsDataURL(files[0]);
  };

  return (
    <div>
      <input type='file' accept='application/pdf' onChange={onFileChange} />
      <span>{imgUrl}</span>
    </div>
  );
}

export default Home;
