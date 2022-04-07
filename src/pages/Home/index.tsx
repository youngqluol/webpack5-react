// import { Carousel } from 'antd';
import { Button, Carousel } from '@kdcloudjs/kdesign';

export default function Home() {
  const banners = [
    {
      src: require('../../assets/home_banner_1.jpg'),
    },
    {
      src: require('../../assets/home_banner_1.jpg'),
    },
  ];
  return (
    <>
      <Button>请开始</Button>
      <Carousel autoplay>
        {banners.map(item => {
          return (
            <div style={{ backgroundColor: '#F2F2F2', height: '100vh', width: '100vw' }} key={item.src}>
              <img src={item.src} alt='banner' style={{ width: '100%', height: '100%' }} />
              {/* <h3>2</h3> */}
            </div>
          );
        })}
      </Carousel>
    </>
  );
}
