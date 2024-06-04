import React, { useEffect } from 'react';
import styles from './css/DIsqusComments.module.css';

const DisqusComments = ({ url, identifier }) => {
  useEffect(() => {
    var disqus_config = function () {
      this.page.url = url;
      this.page.identifier = identifier;
    };

    (function() {
      var d = document, s = d.createElement('script');
      s.src = 'https://semi-project-4team.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    })();
  }, [url, identifier]);

  return (
    <div className={styles.disqusContainer}>
      <div id="disqus_thread"></div>
    </div>
  );
};

export default DisqusComments;