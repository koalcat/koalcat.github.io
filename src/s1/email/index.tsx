import React from 'react';
import styles from './index.module.less';
//import { useFetch } from '../../base/loading';
//import { subscribeEmail } from '../../base/api';

//const EmailReg = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;

interface EmailProps {}

const CollectionEmail: React.FC = (props: EmailProps) => {
  // const [email, setEmail] = useState('');
  // const [loading, subscribe] = useFetch((_email: string) => subscribeEmail(_email));
  // const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (ref.current) {
  //     ref.current = undefined;
  //     clearTimeout(ref.current);
  //   }
  //   setEmail(event.target.value);
  // }, []);

  // const ref = useRef<NodeJS.Timeout>();

  // useEffect(() => {
  //   return () => {
  //     if (ref.current) {
  //       ref.current = undefined;
  //       clearTimeout(ref.current);
  //     }
  //   };
  // }, []);

  // const showTips = useCallback(
  //   (info: string) => {
  //     setEmail(info);
  //     if (ref.current) {
  //       ref.current = undefined;
  //       clearTimeout(ref.current);
  //     }
  //     ref.current = setTimeout(() => {
  //       ref.current = undefined;
  //       setEmail('');
  //     }, 1000);
  //   },
  //   [setEmail],
  // );

  // const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const _email = email;
  //   if (EmailReg.test(_email)) {
  //     try {
  //       showTips('loading');
  //       let flag = localStorage.getItem('flag');
  //       let count = flag ? parseInt(flag) : 0;
  //       if (isNaN(count)) {
  //         count = 0;
  //       }
  //       if (count < 10) {
  //         await subscribe(_email);
  //       }
  //       showTips('🎉 订阅成功 🎉');
  //       localStorage.setItem('flag', `${++count}`);
  //     } catch (error) {
  //       showTips('出错了😭');
  //       console.error(error);
  //     }
  //   }
  // };
  return (
    <div className={styles.root}>
      <span role="img" aria-label="">
        欢迎反馈👏，你可以在 <a style={{color: 'white'}} href="https://bbs.saraba1st.com/2b/thread-1965537-1-1.html" rel="noopener noreferrer" target="_blank">bbs.saraba1st.com</a> 回帖
      </span>
      {/* <div className={styles.box}>
        <form onSubmit={onSubmit}>
          <input
            disabled={loading}
            type="text"
            name="email"
            placeholder="输入Email"
            value={email}
            onChange={onChange}
          />
          <button disabled={loading} className={styles.submit} type="submit" value="Submit">
            👌
          </button>
        </form>
      </div> */}
    </div>
  );
};

export default CollectionEmail;
