import ReactFullpage from '@fullpage/react-fullpage';
import { useEffect } from 'react';

const Fullpage = () => {
  useEffect(() => {
    const elToDelete = document.querySelector('.fp-watermark');
    if (elToDelete) {
      elToDelete.remove();
    }
  }, []);
  return (
    <ReactFullpage
      // fullpage options
      licenseKey='3610FF95-DC7C42A1-9B38D9B6-3F53F5A5'
      scrollingSpeed={1000} /* Options here */
      render={({ state, fullpageApi }) => {
        return (
          <ReactFullpage.Wrapper>
            <div className='section'>
              <p>Section 1 (welcome to fullpage.js)</p>
              <button type='button' onClick={() => fullpageApi.moveSectionDown()}>
                Click me to move down
              </button>
            </div>
            <div className='section'>
              <p>Section 2</p>
              <p>{JSON.stringify(state)}</p>
            </div>
            <div className='section'>
              <p>Section 3</p>
            </div>
            <div className='section'>
              <p>Section 4</p>
            </div>
          </ReactFullpage.Wrapper>
        );
      }}
    />
  );
};

export default Fullpage;
